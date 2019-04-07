import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, List } from 'ionic-angular';
import { Map, latLng, tileLayer, Layer, Marker, Icon, Circle, Polygon, LatLng } from 'leaflet';
import { ResourcesProvider } from '../../providers/resources/resources';
import { HttpClient } from '@angular/common/http';

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
  places: JSON;
  medMarkers: Array<Marker>;
  bedMarkers: Array<Marker>;

  public form = [
    { val: 'Med. Versorgung', isChecked: false },
    { val: 'Notunterkünfte', isChecked: false }
  ];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public httpClient: HttpClient,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KartePage');
    this.initializeMap(); 
    this.medMarkers = [];
    this.bedMarkers = [];

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

    var lat = this.map.getCenter().lat;
    var lng = this.map.getCenter().lng;
    //console.log(proj4('EPSG:25832', 'GOOGLE', [lat, lng]));

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

    if(type == "med") {
      this.medMarkers.push(marker);
    }
    if(type == "bed") {
      this.bedMarkers.push(marker)
    }

    if (popup) {
      marker.openPopup();  
    }
  }

  selectChange() {
    console.log("Geklickt")
    var resources = new ResourcesProvider(this.httpClient);
    if (this.form[0].isChecked) {
      resources.getMapContent("hospital").subscribe(response => {
            
        for (let place of response) {
          console.log(place.name);
          console.log(place.geom.point.coordinates.latitude);

          let popupText = place.name + '<br>' + 
                          "Notfallhilfe: " + place.extra1 + '<br>' +
                          "Geburtsklinik: " + place.extra2 + '<br>' +
                          place.web;

          this.setMarker("med", new LatLng(place.geom.point.coordinates.longitude, 
                                           place.geom.point.coordinates.latitude), false, popupText);
      
          
        }
        
      })
    }
    if (!this.form[0].isChecked) {
      this.medMarkers.forEach(element => {
        this.map.removeLayer(element);
      });
      this.medMarkers = [];
    }

    if (this.form[1].isChecked) {
      resources.getMapContent("shelter").subscribe(response => {
            
        for (let place of response) {
          console.log(place.name);
          console.log(place.geom.point.coordinates.latitude);

          let popupText = place.name + '<br>' + 
                          "Organisation: " + place.extra1 + '<br>' +
                          "Ansprechpartner: " + place.extra2 + '<br>' +
                          place.web;

          this.setMarker("bed", new LatLng(place.geom.point.coordinates.longitude, 
                                           place.geom.point.coordinates.latitude), false, popupText);
      
          
        }
        
      })
    }
    if (!this.form[0].isChecked) {
      this.bedMarkers.forEach(element => {
        this.map.removeLayer(element);
      });
      this.bedMarkers = [];
    }

  }

}
