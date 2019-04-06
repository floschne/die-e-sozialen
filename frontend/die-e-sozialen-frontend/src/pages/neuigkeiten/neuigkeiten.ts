import { IonicPage, Content } from "ionic-angular";
import { Component } from '@angular/core';
import { ModalController, NavController, Platform, NavParams, ViewController } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, 
        public navParams: NavParams, 
        public modalCtrl: ModalController) {
      }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NeuigkeitenPage');
  }

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
    public viewCtrl: ViewController
  ) {
  
    var mails = [
    {
      title: 'Test Mail0',
      content: 'i hope this works'
    }, 
    {
      title: 'Test Mail1',
      content: 'trolololo'
    },
    {
      title: 'Test Mail2',
      content: 'kek'
    }
  ]
    this.mail = mails[this.params.get('charNum')];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
