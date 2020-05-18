export class Marker {
    icon = {}

    constructor(public lat: number, public lng: number, public label?: string)
    {
        if (this.label.includes("Gas"))
        {
            this.icon = { url: './assets/img/gas.ico' };
            this.label = "";
        }
        if(this.label.includes("elettrica"))
        {
            this.icon = { url: './assets/img/eletrica.ico' };
            this.label = "";
        }
        if(this.label.includes("Gasolio"))
        {
            this.icon = { url: './assets/img/Gasolio.ico' };
            this.label = "";
        }
        if(this.label.includes("Teleriscaldamento"))
        {
            this.icon = { url: './assets/img/Telerisccaldamento.ico' };
            this.label = "";
        }
        if(this.label.includes("GPL"))
        {
            this.icon = { url: './assets/img/GPL.ico' };
            this.label = "";
        }
        if(this.label.includes("NULL"))
        {
            this.icon = { url: './assets/img/NULL.ico' };
            this.label = "";
        }
        if(this.label.includes("solide"))
        {
            this.icon = { url: './assets/img/biomass.ico' };
            this.label = "";
        }
        if(this.label.includes("RSU"))
        {
            this.icon = { url: './assets/img/RSU.ico' };
            this.label = "";
        }
        if(this.label.includes("liquide"))
        {
            this.icon = { url: './assets/img/biomassal.ico' };
            this.label = "";
        }
        if(this.label.includes("Olio"))
        {
            this.icon = { url: './assets/img/olio.ico' };
            this.label = "";
        }
    }
}
