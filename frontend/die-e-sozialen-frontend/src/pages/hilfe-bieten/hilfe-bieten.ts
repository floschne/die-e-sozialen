import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ViewController, ModalController, Form} from 'ionic-angular';
import {ResourcesProvider} from "../../providers/resources/resources";
import {HttpClient} from "@angular/common/http";

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

  offerID: any;
  success: Boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public httpClient: HttpClient,
              public modalCtr: ModalController) {
    this.success = false;
    this.offerID = "not yet set";
  }

  openHilfeAnbietenModal() {
    let modal = this.modalCtr.create(HilfeAnbietenModal);
    modal.present();
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
  public httpClient: HttpClient) {

  }

  ionViewDidLoad() {
  }

  processForm(value: any) {
    let offer = {
      "description": value.description,
      "offerer": {
        "address": {
          "city": value.description,
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

    let resources = new ResourcesProvider(this.httpClient);
    resources.postOffer(offer).subscribe(response => {
      this.offerID = response;
      this.success = true;
    });
  }
  // modal has to be closed after the job is done
  // this.viewCtrl.dismiss();
}
