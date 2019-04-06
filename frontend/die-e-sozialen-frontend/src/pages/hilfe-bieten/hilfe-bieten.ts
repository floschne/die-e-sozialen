import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
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
              public httpClient: HttpClient,) {
    this.success = false;
    this.offerID = "not yet set";
  }

  offerHelp(value: any) {
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
}
