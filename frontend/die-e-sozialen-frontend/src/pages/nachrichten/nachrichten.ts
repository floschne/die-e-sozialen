<<<<<<< HEAD
=======

>>>>>>> interactivemap
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController, Loading, Modal, Form } from 'ionic-angular';
import { ResourcesProvider } from '../../providers/resources/resources';
import { HttpClient } from '@angular/common/http';
import { FileEncryption } from '@ionic-native/file-encryption/ngx';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { AuthProvider } from '../../providers/auth/auth';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

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
  decryptMessage: string = 'Deine Nachrichten werden entschlüsselt';

  messages: JSON;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public httpClient: HttpClient,
    public modalCtrl: ModalController,
    public authProvider: AuthProvider) {

  }

  ionViewDidLoad() {
    var resources = new ResourcesProvider(this.httpClient);
    resources.getMessages().subscribe(response => {
      this.messages = response;
      console.log(response);
    })
  }

  openModal(message) {

    console.log(message);
    let modal = this.modalCtrl.create(ModalContentPage, {message: message});
    modal.present();
  }

  login(form: Form) {

    console.log(form);
    this.loginInProcess = true;

    setTimeout( () => {
      this.loginInProcess = false;
      this.authProvider.login('testUser');
    }, 5000);
  }

  ngDoCheck() {
    this.loggedIn = this.authProvider.loggedIn ? true : false;
  }
}

@Component({
  templateUrl: 'modal-content.html'
})
export class ModalContentPage {
  message = {};
  messages: JSON;
  loading: boolean = false;

  constructor(
    private fileEncryption: FileEncryption,
    public platform: Platform,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public httpClient: HttpClient
  ) 
  {}

  

  ionViewDidLoad() {
    this.message = this.navParams.get('message');
}

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

