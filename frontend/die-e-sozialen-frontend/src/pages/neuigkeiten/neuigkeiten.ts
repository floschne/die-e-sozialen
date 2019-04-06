import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResourcesProvider } from '../../providers/resources/resources';
import { HttpClient } from '@angular/common/http';
import { FileEncryption } from '@ionic-native/file-encryption/ngx';

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

  constructor(private fileEncryption: FileEncryption, public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) {
    this.fileEncryption.encrypt('assets/json/topSecret.json', 'secretKey').then((res) => {
      console.log(res);
    });
  }

  ionViewDidLoad() {
    var resources = new ResourcesProvider(this.httpClient);
    resources.getHelloWorld().subscribe(data => console.log(data));

  }
}
