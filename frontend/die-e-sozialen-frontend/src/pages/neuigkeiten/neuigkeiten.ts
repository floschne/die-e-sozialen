import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController } from 'ionic-angular';
import { ResourcesProvider } from '../../providers/resources/resources';
import { HttpClient } from '@angular/common/http';
import { FileEncryption } from '@ionic-native/file-encryption/ngx';

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
<<<<<<< HEAD

  constructor(private fileEncryption: FileEncryption, public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) {
    this.fileEncryption.encrypt('assets/json/topSecret.json', 'secretKey').then((res) => {
      console.log(res);
    });
  }
=======
  constructor(public navCtrl: NavController, 
        public navParams: NavParams, 
        public modalCtrl: ModalController, 
        public HttpClient: HttpClient) {
      }
>>>>>>> e6b7c65fe962c360fb74920c340321912833a0c3

  ionViewDidLoad() {
    var resources = new ResourcesProvider(this.HttpClient);
    resources.getHelloWorld().subscribe(data => console.log(data));

<<<<<<< HEAD
=======
  openModal(characterNum) {

    let modal = this.modalCtrl.create(ModalContentPage, characterNum);
    modal.present();
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
    public HttpClient: HttpClient
  ) {
    var resources = new ResourcesProvider(this.HttpClient)
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
>>>>>>> e6b7c65fe962c360fb74920c340321912833a0c3
  }
}
