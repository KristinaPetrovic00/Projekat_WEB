export class Slozenost{
    constructor(id,naziv){
        this.id=id;
        this.naziv=naziv;
    }

    crtajSlozenost(host){
        if(!host){
            throw new Exception("Nije dodeljen host!");
        }
        var lblSlozenost=document.createElement("label");
        lblSlozenost.innerHTML="slozenost: "+this.naziv;
        lblSlozenost.className="LblSlozenost";
        host.appendChild(lblSlozenost);
        console.log(this.slozenost_jela);
    }
}