import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Form, Platform, ViewController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AuthProvider } from '../../providers/auth/auth';
import { ResourcesProvider } from '../../providers/resources/resources';

/**
 * Generated class for the neuigkeitenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-neuigkeiten',
  templateUrl: 'neuigkeiten.html',
})
export class NeuigkeitenPage {

  loggedIn: boolean = false;
  messages: JSON;

  constructor(
    //private fileEncryption: FileEncryption, 
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
    })
  }

  openModal(message) {
    let modal = this.modalCtrl.create(ModalContentPage, { message: message });
    modal.present();
  }

  login(form: Form) {
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
}