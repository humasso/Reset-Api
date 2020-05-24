import { Icon } from './icon.model';

export class Marker {
    icon = {}
    constructor(public lat: number, public lng: number, public label?: string)
    {
        if (this.label.includes("Gas"))
        {
            this.icon = new Icon ( './assets/img/gas.ico', 24 );
            this.label = "";
            return;
        }
        if(this.label.includes("elettrica"))
        {
            this.icon = new Icon ( './assets/img/eletrica.ico', 24 );
            this.label = "";
            return;
        }
        if(this.label.includes("Gasolio"))
        {
            this.icon = new Icon ( './assets/img/Gasolio.ico', 24 );
            this.label = "";
            return;
        }
        if(this.label.includes("Teleriscaldamento"))
        {
            this.icon = new Icon ( './assets/img/Telerisccaldamento.ico', 24 );
            this.label = "";
            return;
        }
        if(this.label.includes("GPL"))
        {
            this.icon = new Icon ( './assets/img/GPL.ico', 24 );
            this.label = "";
            return;
        }
        if(this.label.includes("NULL"))
        {
            this.icon = new Icon ( './assets/img/NULL.ico', 24 );
            this.label = "";
            return;
        }
        if(this.label.includes("solide"))
        {
            this.icon = new Icon ( './assets/img/biomass.ico', 24 );
            this.label = "";
            return;
        }
        if(this.label.includes("RSU"))
        {
            this.icon = new Icon ( './assets/img/RSU.ico', 24 );
            this.label = "";
            return;
        }
        if(this.label.includes("liquide"))
        {
            this.icon = new Icon ( './assets/img/biomassal.ico', 24 );
            this.label = "";
            return;
        }
        if(this.label.includes("Olio"))
        {
            this.icon = new Icon ( './assets/img/olio.ico', 24 );
            this.label = "";
            return;
        }
    }
}
