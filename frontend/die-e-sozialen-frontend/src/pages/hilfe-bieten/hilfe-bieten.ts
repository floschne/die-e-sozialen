import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ViewController, ModalController} from 'ionic-angular';
import {ResourcesProvider} from "../../providers/resources/resources";

/**
 * Generated class for the HilfeBietenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hilfe-bieten',
  templateUrl: 'hilfe-bieten.html',
})
export class HilfeBietenPage {

  offers: JSON;
  isCollapsed: Array<any> = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public resources: ResourcesProvider,
              public modalCtr: ModalController) {
  }

  fetchOffers() {
    this.resources.getHelp().subscribe((res) => {
      this.offers = res;
      for (let i = 0; i < res.length; i++) {
        this.isCollapsed[i] = true;
      }
    });
  }

  ionViewDidLoad() {
    this.fetchOffers();
  }

  openHilfeAnbietenModal() {
    let modal = this.modalCtr.create(HilfeAnbietenModal);
    modal.present();
    modal.onDidDismiss(() => {
      this.fetchOffers();
    });
  }

  openHilfeLoeschenModal() {
    let modal = this.modalCtr.create(HilfeLoeschenModal);
    modal.present();
    modal.onDidDismiss(() => {
      this.fetchOffers();
    });
  }
}

@Component({
  templateUrl: 'hilfe-anbieten-modal.html'
})
export class HilfeAnbietenModal {
  offerID: JSON;
  success: boolean = false;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public resources: ResourcesProvider) { }

  processForm(value: any) {
    let offer = {
      "title": value.title,
      "description": value.description,
      "offerer": {
        "address": {
          "city": value.city,
          "mail": value.mail,
          "phoneNumber": value.phoneNumber,
          "street": value.street,
          "zip": value.zip,
        },
        "age": value.age,
        "forename": value.forename,
        "surname": value.surname,
      },
      "period": value.period,
    };

    this.resources.postOffer(offer).subscribe(res => {
      this.offerID = res;
      this.success = true;
    });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}

@Component({
  templateUrl: 'hilfe-loeschen-modal.html'
})
export class HilfeLoeschenModal {
  success: boolean = false;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public resources: ResourcesProvider) { }

  processForm(value: any) {
    let id = value.offerID;

    this.resources.deleteOffer(id).subscribe(() => {
      this.success = true;
    });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
