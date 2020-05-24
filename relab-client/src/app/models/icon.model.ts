export class Icon { //La classe che ci consente di creare un icona con una dimensione specifica
    public scaledSize:ScaledSize;
    constructor(public url: string, size: number){
        this.scaledSize = new ScaledSize(size,size);
    }

    setSize(size: number) { //Usato per assegnare una dimensione al icona
        this.scaledSize = new ScaledSize(size,size);
    }
}

export class ScaledSize { // serve ad assegnare le dimensioni
    constructor(
    public width:  number,
    public height: number){}
}
