import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Map, latLng, tileLayer, Layer, Marker, Icon, Circle, Polygon } from 'leaflet';

/**
 * Generated class for the KartePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-karte',
  templateUrl: 'karte.html',
})
export class KartePage {

  map: Map;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KartePage');

    this.initializeMap(); 

  }

  initializeMap() {
    this.map = new Map('mapid').setView([51.505, -0.09], 13);
    this.map.locate({
      setView: true,
      maxZoom: 15
    }).on('locationfound', (e) => {
      console.log("Hab Dich!");
      console.log(this.map.getCenter());
      this.setMarker(this.map.getCenter())
    })  

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      // tslint:disable-next-line
    maxZoom: 15
    }).addTo(this.map);
  }

  setMarker( coords) {
    var markerIcon = new Icon({
      iconUrl: '../assets/imgs/marker.png',
      iconSize: [40, 40], // size of the icon
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });

    var marker = new Marker(coords, {icon: markerIcon}).addTo(this.map);
    marker.bindPopup('Your location').openPopup();
  }

}
