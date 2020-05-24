import { Component, OnInit } from '@angular/core';
import { GeoFeatureCollection } from './models/geojson.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ci_vettore } from './models/ci_vett.models';
import { Marker } from './models/marker.model';
import { MouseEvent } from '@agm/core';

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
  circleLat : number = 0;
  circleLng: number = 0;
  maxRadius: number = 400;
  radius : number = this.maxRadius;


  constructor(public http: HttpClient) {
  }

  prepareData = (data: GeoFeatureCollection) => {
    this.geoJsonObject = data
    console.log(this.geoJsonObject)
  }

  prepareCiVettData = (data: Ci_vettore[]) =>
  {
    let latTot = 0; //Uso queste due variabili per calcolare latitudine e longitudine media
    let lngTot = 0; //E centrare la mappa

    console.log(data);
    this.markers = [];

    for (const iterator of data) {
      let m = new Marker(iterator.WGS84_X,iterator.WGS84_Y,iterator.CI_VETTORE);
      latTot += m.lat; //Sommo tutte le latitutidini e longitudini
      lngTot += m.lng;
      this.markers.push(m);
    }
    this.lng = lngTot/data.length; //assegnamo alle cordinate il volore medio di tutte le latitutidini e longitudini dei marker
    this.lat = latTot/data.length;
    this.zoom = 16;
  }


  ngOnInit() {
    this.obsGeoData = this.http.get<GeoFeatureCollection>("https://3000-d612bb3c-da59-4978-90bf-c5b77d1b4039.ws-eu01.gitpod.io/");
    this.obsGeoData.subscribe(this.prepareData);
  }


  //Questo metodo richiama la route sul server che recupera il foglio specificato nella casella di testo
  cambiaFoglio(foglio) : boolean
  {
    let val = foglio.value; //il "Val" contiene il foglio su cui fare ricerca
    this.obsCiVett = this.http.get<Ci_vettore[]>(`https://3000-d612bb3c-da59-4978-90bf-c5b77d1b4039.ws-eu01.gitpod.io//ci_vettore/${val}`);  //Fa una get per ricavare dati da una pagina specifiacata
    this.obsCiVett.subscribe(this.prepareCiVettData); //una volta ottenuti i dati vengono asseganti alla funzione di callback (prepareCiVettData)
    console.log(val);
    return false;
  }

  styleFunc = (feature) => {
    return ({
      clickable: false,
      fillColor: this.fillColor,
      strokeWeight: 1
    });
  }

  mapClicked($event: MouseEvent) {
    this.circleLat = $event.coords.lat; //Queste sono le coordinate cliccate
    this.circleLng = $event.coords.lng; //Sposto il centro del cerchio qui
    this.lat = this.circleLat; //Sposto il centro della mappa qui
    this.lng = this.circleLng;
    this.zoom = 15;  //Zoom sul cerchio
  }

  circleRedim(newRadius : number){
    console.log(newRadius) //posso leggere sulla console il nuovo raggio
    this.radius = newRadius;  //Ogni volta che modifico il cerchio, ne salvo il raggio
  }

  circleDoubleClicked(circleCenter)
  {
    console.log(circleCenter); //Voglio ottenere solo i valori entro questo cerchio
    console.log(this.radius);

    this.circleLat = circleCenter.coords.lat; //Aggiorno le coordinate del cerchio
    this.circleLng = circleCenter.coords.lng; //Aggiorno le coordinate del cerchio

    //Non conosco ancora le prestazioni del DB, non voglio fare ricerche troppo onerose
    if(this.radius > this.maxRadius)
    {
      console.log("area selezionata troppo vasta sarà reimpostata a maxRadius");
       this.radius = this.maxRadius;
    }
    console.log ("raggio in gradi " + (this.radius * 0.00001)/1.1132)



    let raggioInGradi = (this.radius * 0.00001)/1.1132;
      this.obsCiVett = this.http.get<Ci_vettore[]>(`https://3000-d612bb3c-da59-4978-90bf-c5b77d1b4039.ws-eu01.gitpod.io/ci_geovettore/
      ${this.circleLat}/
      ${this.circleLng}/
      ${raggioInGradi}`);
      this.obsCiVett.subscribe(this.prepareCiVettData);
  }
}
