import { Component } from '@angular/core';
import { NavController, Platform, Events } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, Geolocation } from 'ionic-native';
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class Home {
 
    map: GoogleMap;
 
    constructor(public navCtrl: NavController, public platform: Platform, public events : Events) {
        platform.ready().then(() => {
            this.loadMap();
        });
    }
 
    loadMap(){
       Geolocation.getCurrentPosition().then((position)=>{
        this.createMap(position.coords.latitude,position.coords.longitude);
       }).catch((error)=>{
         console.log('Could not get position ',error.code,error.message);
         this.createMap(37.5650172,126.8494637);
       });
    }

    createMap(lat : number, lng : number) : void{

       let location = new GoogleMapsLatLng(lat,lng);

       this.map = new GoogleMap('map', {
          'backgroundColor': 'white',
          'controls': {
            'compass': true,
            'indoorPicker': true,
            'myLocationButton' : true,
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'latLng': location,
            'tilt': 10,
            'zoom': 15,
            'bearing': 50
          }
        });
 
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
        });

        this.events.subscribe('MenuOpen',()=>{
          console.log('Sub to ev open');
          this.map.setClickable(false);
        });

        this.events.subscribe('MenuClose',()=>{
          console.log('Sub to ev close');
          this.map.setClickable(true);
        });
    }
}