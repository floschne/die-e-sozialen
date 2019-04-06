import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController, Modal, Form } from 'ionic-angular';
import { ResourcesProvider } from '../../providers/resources/resources';
import { HttpClient } from '@angular/common/http';
import { FileEncryption } from '@ionic-native/file-encryption/ngx';
import { AuthProvider } from '../../providers/auth/auth';

// /**
//  * Generated class for the NeuigkeitenPage page.
//  *
//  * See https://ionicframework.com/docs/components/#navigation for more info on
//  * Ionic pages and navigation.
//  */

@IonicPage()
@Component({
  selector: 'page-neuigkeiten',
  templateUrl: 'neuigkeiten.html'
})
export class NeuigkeitenPage {
  loggedIn: boolean = this.authProvider.loggedIn;

  constructor(private fileEncryption: FileEncryption, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public httpClient: HttpClient,
    public modalCtrl: ModalController,
    public authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    var resources = new ResourcesProvider(this.httpClient);
    resources.getHelloWorld().subscribe(data => console.log(data));
    //resources.getMessages().subscribe(data => console.log(data));
  }

  openModal(characterNum) {
    let modal = this.modalCtrl.create(ModalContentPage, characterNum);
    modal.present();
  }

  login(form: Form) {
    console.log(form);
    this.authProvider.login('testUser');
  }

  ngDoCheck() {
    this.loggedIn = this.authProvider.loggedIn ? true : false;
  }
}

@Component({
  templateUrl: 'modal-content.html'
})
export class ModalContentPage {
  character;
  mail;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public httpClient: HttpClient
  ) {
    var resources = new ResourcesProvider(this.httpClient)
    var mails = resources.getMessages()
    // var mails = [
    // {
    //   title: 'Test Mail0',
    //   content: 'i hope this works'
    // }, 
    // {
    //   title: 'Test Mail1',
    //   content: 'trolololo'
    // },
    // {
    //   title: 'Test Mail2',
    //   content: 'kek'
    // }
    //]
    this.mail = mails[this.params.get('charNum')];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
