import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResourcesProvider } from '../../providers/resources/resources';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the NeuigkeitenPage page.
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) {
  }

  ionViewDidLoad() {
    var resources = new ResourcesProvider(this.httpClient);
    resources.getHelloWorld().subscribe(data => console.log(data));
  }

}
