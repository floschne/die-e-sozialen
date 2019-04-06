import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController, Loading } from 'ionic-angular';
import { ResourcesProvider } from '../../providers/resources/resources';
import { HttpClient } from '@angular/common/http';
import { FileEncryption } from '@ionic-native/file-encryption/ngx';
import { PARAMETERS } from '@angular/core/src/util/decorators';

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

  messages: JSON;
  constructor(
    //private fileEncryption: FileEncryption, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public httpClient: HttpClient,
    public modalCtrl: ModalController) {
    // this.fileEncryption.encrypt('assets/json/topSecret.json', 'secretKey').then((res) => {
    //   console.log(res);
    // });
  }

  ionViewDidLoad() {
    var resources = new ResourcesProvider(this.httpClient);
    resources.getMessages().subscribe(response => {
      console.log(response)
      this.messages = response;
    })
  }

  openModal(message) {

    console.log(message);
    let modal = this.modalCtrl.create(ModalContentPage, {message: message});
    modal.present();
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
  ) {
  }

  ionViewDidLoad() {
    this.message = this.navParams.get('message')
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
