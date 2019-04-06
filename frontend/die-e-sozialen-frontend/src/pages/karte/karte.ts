import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
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
  maxzoom: 18;

  public form = [
    { val: 'Medizinische Versorgung', isChecked: false },
    { val: 'Notunterkünfte', isChecked: false }
  ];

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
      maxZoom: this.maxzoom
    }).on('locationfound', (e) => {
      console.log("Hab Dich!");
      console.log(this.map.getCenter());
      this.setMarker('loc', this.map.getCenter(), true, 'Ihr Standort')
    })  

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      // tslint:disable-next-line
    maxZoom: this.maxzoom
    }).addTo(this.map);
  }

  setMarker( type, coords, popup, popuptext) {

    const iconDict: {[icon: string]: string} = {
      loc: '../assets/imgs/marker.png',
      med: '../assets/imgs/hospital.png',
      bed: '../assets/imgs/shelter.png'
    }

    var markerIcon = new Icon({
      iconUrl: iconDict[type],
      iconSize: [45, 45],
      iconAnchor: [22, 45],
      popupAnchor: [0, -45]
    });

    var marker = new Marker(coords, {icon: markerIcon}).addTo(this.map);
    marker.bindPopup(popuptext);

    if (popup) {
      marker.openPopup();  
    }
  }

  selectChange() {
    console.log("Geklickt")
  }

}
