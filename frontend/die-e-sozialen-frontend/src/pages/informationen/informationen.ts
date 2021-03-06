import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResourcesProvider } from '../../providers/resources/resources';

/**
 * Generated class for the InformationenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-informationen',
  templateUrl: 'informationen.html',
})
export class InformationenPage {

  isCollapsed: Array<any> = new Array();
  authorities: JSON;

  constructor(public resources: ResourcesProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.resources.getAuthorities().subscribe((res) => {
      for(var i = 0; i < res.length; i++) {
        this.isCollapsed[i] = true;
      }
      this.authorities = res;
    });
  }

}
