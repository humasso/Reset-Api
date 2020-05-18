import { Component, OnInit } from '@angular/core';
import { GeoFeatureCollection } from './models/geojson.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ci_vettore } from './models/ci_vett.models';
import { Marker } from './models/marker.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ang-maps';
  zoom: number = 12;
  geoJsonObject: GeoFeatureCollection;
  fillColor: string = "#FF0000";
  obsGeoData: Observable<GeoFeatureCollection>;
  lng: number = 9.205331366401035;
  lat: number = 45.45227445505016;
  obsCiVett : Observable<Ci_vettore[]>;
  markers : Marker[]
  l="https://3000-d612bb3c-da59-4978-90bf-c5b77d1b4039.ws-eu01.gitpod.io/ci_vettore/"

  constructor(public http: HttpClient) {
  }

  prepareData = (data: GeoFeatureCollection) => {
    this.geoJsonObject = data
    console.log(this.geoJsonObject)
  }

  prepareCiVettData = (data: Ci_vettore[]) =>
  {
    console.log(data); //Verifica di ricevere i vettori energetici
    this.markers = []; //NB: markers va dichiarata tra le proprietà markers : Marker[]
    for (const iterator of data) { //Per ogni oggetto del vettore creoa un Marker
      let m = new Marker(iterator.WGS84_X,iterator.WGS84_Y,iterator.CI_VETTORE);
      this.markers.push(m);
    }
  }

  calNum(n: HTMLInputElement): boolean {
    let t=n.value
    this.l=this.l+t
    console.log(this.l)
    return false;
  }

  ngOnInit() {
    this.obsGeoData = this.http.get<GeoFeatureCollection>("https://3000-d612bb3c-da59-4978-90bf-c5b77d1b4039.ws-eu01.gitpod.io/");
    this.obsGeoData.subscribe(this.prepareData);

    this.obsCiVett = this.http.get<Ci_vettore[]>("https://3000-d612bb3c-da59-4978-90bf-c5b77d1b4039.ws-eu01.gitpod.io/ci_vettore/123");
    this.obsCiVett.subscribe(this.prepareCiVettData);

    console.log(this.markers)

  }


  styleFunc = (feature) => {
    return ({
      clickable: false,
      fillColor: this.fillColor,
      strokeWeight: 1
    });
  }
}
