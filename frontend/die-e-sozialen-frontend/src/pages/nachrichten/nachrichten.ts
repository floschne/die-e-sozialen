import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController, Form } from 'ionic-angular';
import { ResourcesProvider } from '../../providers/resources/resources';
import { HttpClient } from '@angular/common/http';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';
import * as openpgp from 'openpgp'

// /**
//  * Generated class for the NeuigkeitenPage page.
//  *
//  * See https://ionicframework.com/docs/components/#navigation for more info on
//  * Ionic pages and navigation.
//  */

@IonicPage()
@Component({
  selector: 'page-nachrichten',
  templateUrl: 'nachrichten.html'
})
export class NachrichtenPage {
  loggedIn: boolean = this.authProvider.loggedIn;
  loginInProcess: boolean = false;
  decryptMessage: string = 'Deine Nachrichten werden entschlüsselt.';

  messages: JSON;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient,
    public modalCtrl: ModalController,
    public authProvider: AuthProvider,
    private storage: Storage) {

  }

  async ionViewDidLoad() {
    
    var pubkey: string;
    var privkey: string;
    var pass: string;

    pubkey = await this.storage.get('pupkey').then((val) => {return val});
    privkey = await this.storage.get('privkey').then((val) => {return val});
    pass = await this.storage.get('password').then((val) => {return val});

    console.log(pubkey);

    if (!pubkey || !privkey || !pass){
      console.log('no credentials found -> generating new ones!')

      var keys = await this.generateKeys('hackathon', 'floschne92@gmail.com', 'code19');

      pubkey = keys.pub;
      privkey = keys.priv;
      pass = 'code19';

      this.storage.set('pupkey', keys.pub);
      this.storage.set('privkey', keys.priv);
      this.storage.set('password', 'code19');
    }

    // encrypting then decyrpting a message example
    var privkeyObj = (await openpgp.key.readArmored(privkey)).keys[0];
    await privkeyObj.decrypt(pass);
    var em = await this.encryptMessage(privkey, pubkey, 'geheim', pass) as string;
    console.log(em);
    var plaintext = await this.decryptFunction(privkey, pubkey, em, pass);
    console.log(plaintext); 

    var resources = new ResourcesProvider(this.httpClient);
    resources.getMessages().subscribe(async response => {

      console.log(response);

      for (var element of response) {

        var newContent = await this.decryptFunction(privkey, pubkey, element.content, pass);
        element.content = newContent;
      }

      this.messages = response;
    })
  }

  openModal(message) {
    let modal = this.modalCtrl.create(ModalContentPage, { message: message });
    modal.present();
  }

  openQRModal() {
    let modal = this.modalCtrl.create(ModalContentQRPage, { });
    modal.present();
  }

  login(form: Form) {
    this.loginInProcess = true;

    setTimeout(() => {
      this.loginInProcess = false;
      this.authProvider.login('testUser');
    }, 5000);
  }

  ngDoCheck() {
    this.loggedIn = this.authProvider.loggedIn ? true : false;
  }

  // openpgp stuff
  async generateKeys(userName: string, email: string, passphrase: string)  {
    var options = {
      userIds: [{ name: userName, email: email }], 
      rsaBits: 4096,                                            
      passphrase: passphrase     
    };

    return await openpgp.generateKey(options).then(function(key) { 
      //var revocationCertificate = key.revocationCertificate; 
      return {priv: key.privateKeyArmored, pub: key.publicKeyArmored};
    });
  };

  async decryptFunction(privKey: string, pubKey: string, encryptedMessage: string, pass: string) {

    var privkeyObj = (await openpgp.key.readArmored(privKey)).keys[0];
    await privkeyObj.decrypt(pass);

    try {

      console.log(await openpgp.message.readArmored(encryptedMessage));
      var options = {
        message: await openpgp.message.readArmored(encryptedMessage),
        publicKeys: (await openpgp.key.readArmored(pubKey)).keys,
        privateKeys: [privkeyObj]
      }

      return openpgp.decrypt(options).then(plaintext => {
        return plaintext.data;
      }).catch((err) => { 
        console.log(err);
        return encryptedMessage;
      });
    }
    catch (error){
      console.log(error);
    }
    
    return encryptedMessage;
  }; 
  
  async encryptMessage(privKey: string, pubKey: string, message: string, pass: string) {

    var privkeyObj = (await openpgp.key.readArmored(privKey)).keys[0];
    await privkeyObj.decrypt(pass);

    var options = {
      message: openpgp.message.fromText(message),       
      publicKeys: (await openpgp.key.readArmored(pubKey)).keys,
      privateKeys: [privkeyObj]
    } 

    return openpgp.encrypt(options).then(ciphertext => {
      return ciphertext.data;
    }).catch(err => console.log(err));

    /* const options = {
      message: openpgp.message.fromText(message), 
      publicKeys: (await openpgp.key.readArmored(pubKey)).keys,
    }
    return openpgp.encrypt(options).then(ciphertext => {
      console.log(ciphertext.data);
      return ciphertext.data;
    }) */
  }

  async encryptDecryptFunction(privKey: string, pubKey: string, passphrase: string){
    const privKeyObj = (await openpgp.key.readArmored(privKey)).keys[0]
    await privKeyObj.decrypt(passphrase)

    const options = {
        message: openpgp.message.fromText('Hello, World!'),       // input as Message object
        publicKeys: (await openpgp.key.readArmored(pubKey)).keys, // for encryption
        privateKeys: [privKeyObj]                                 // for signing (optional)
    }

    openpgp.encrypt(options).then(ciphertext => {
        var encrypted = ciphertext.data // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
        return encrypted
    })
    .then(async encrypted => {
        const options = {
            message: await openpgp.message.readArmored(encrypted),    // parse armored message
            publicKeys: (await openpgp.key.readArmored(pubKey)).keys, // for verification (optional)
            privateKeys: [privKeyObj]                                 // for decryption
        }

        openpgp.decrypt(options).then(plaintext => {
            console.log(plaintext.data)
            return plaintext.data // 'Hello, World!'
        })

    })
  }; 
}

@Component({
  templateUrl: 'modal-content.html'
})
export class ModalContentPage {
  message = {};
  messages: JSON;
  loading: boolean = false;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public httpClient: HttpClient
  ) { }

  ionViewDidLoad() {

    this.message = this.navParams.get('message');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

@Component({
  templateUrl: 'modal-contentQR.html'
})
export class ModalContentQRPage {
  createdQRCode: string;
  loading: boolean = true;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public httpClient: HttpClient,
    private storage: Storage
  ) { }

  async ionViewDidLoad() {
    this.createdQRCode = await this.storage.get('pupkey').then((val) => {return val});
    this.loading = false;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

