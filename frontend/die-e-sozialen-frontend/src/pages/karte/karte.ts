import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Map, tileLayer, Marker, Icon, LatLng } from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
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
  location: boolean;
  medMarkers: Array<Marker>;
  bedMarkers: Array<Marker>;
  helpMarkers: Array<Marker>;
  provider = new OpenStreetMapProvider();

  public form = [
    { val: 'Med. Versorgung', isChecked: false },
    { val: 'Notunterkünfte', isChecked: false },
    { val: 'Hilfestellung', isChecked: false }
  ];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public httpClient: HttpClient,) {
  }

  ionViewDidLoad() {
    this.initializeMap();
    this.medMarkers = [];
    this.bedMarkers = [];
    this.helpMarkers = [];
    this.location = false;

  }

  initializeMap() {
    this.map = new Map('mapid').setView([53.599482, 9.93353435970931], 13);

    this.map.locate({
      setView: true,
      maxZoom: this.maxzoom
    }).on('locationfound', (e) => {
      this.setMarker('loc', this.map.getCenter(), true, 'Ihr Standort')
      this.location = true;
    })  
    if (!location) {
      this.setMarker('loc', this.map.getCenter(), true, 'Ihr Standort')
    }
    // var lat = this.map.getCenter().lat;
    // var lng = this.map.getCenter().lng;

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      // tslint:disable-next-line
    maxZoom: this.maxzoom
    }).addTo(this.map);
  }

  setMarker( type, coords, popup, popuptext) {

    const iconDict: {[icon: string]: string} = {
      loc: '../assets/imgs/marker.png',
      med: '../assets/imgs/hospital.png',
      bed: '../assets/imgs/shelter.png',
      help: '../assets/imgs/help.png'
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
    if(type == "help") {
      this.helpMarkers.push(marker)
    }


    if (popup) {
      marker.openPopup();  
    }
  }

  async geoCodeAddress(street, zip, city, popupText) {

    var queryaddress = street + " " + zip + " " + city;
    const results = await this.provider.search({ query: queryaddress }); 
    console.debug(+results[0].y);
    console.debug(+results[0].x);
    var tup = [+results[0].y, +results[0].x];

    this.setMarker("help", new LatLng(tup[0], tup[1]), false, popupText);    
  }

  selectChange() {
    var resources = new ResourcesProvider(this.httpClient);
    if (this.form[0].isChecked) {
      resources.getMapContent("hospital").subscribe(response => {
            
        for (let place of response) {
          // console.log(place.name);
          // console.log(place.geom.point.coordinates.latitude);

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
          // console.log(place.name);
          // console.log(place.geom.point.coordinates.latitude);

          let popupText = place.name + '<br>' + 
                          "Organisation: " + place.extra1 + '<br>' +
                          "Ansprechpartner: " + place.extra2 + '<br>' +
                          place.web;

          this.setMarker("bed", new LatLng(place.geom.point.coordinates.longitude, 
                                           place.geom.point.coordinates.latitude), false, popupText);
      
          
        }
        
      })
    }
    if (!this.form[1].isChecked) {
      this.bedMarkers.forEach(element => {
        this.map.removeLayer(element);
      });
      this.bedMarkers = [];
    }

    if (this.form[2].isChecked) {
      resources.getMapContent("help").subscribe(response => {
            
        for (let place of response) {
          // console.log(place.name);
          // console.log(place.geom.point.coordinates.latitude);

          let popupText = place.titel + '<br>' + 
                          "Name: " + place.offerer + '<br>' +
                          "Beschreibung: " + place.description + '<br>' +
                          "Verfügbarkeit" + place.period;

          this.geoCodeAddress(place.strasse, place.plz, place.ort, popupText);         

        }
        
      })
    }
    if (!this.form[2].isChecked) {
      this.helpMarkers.forEach(element => {
        this.map.removeLayer(element);
      });
      this.helpMarkers = [];
    }

  }

}
