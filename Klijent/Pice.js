export class Pice{

    constructor(naziv,slika_pica)
    {
        this.naziv=naziv;
        this.slika_pica=slika_pica;
        this.Kontejner=null;
    }

    nacrtajPice(divSlikaPice,divNazivPice){
        if(!divSlikaPice || !divNazivPice){
            throw new Error("Host ne postoji!");
        }
        var slikapica=document.createElement("img");
        slikapica.src="./Slike/"+ this.slika_pica;
        slikapica.alt=this.slika_pica;
        slikapica.className="SlikaPica";
        divSlikaPice.appendChild(slikapica);

        var lblNazivPica=document.createElement("label");
        lblNazivPica.className="LblNazivPica";
        lblNazivPica.innerHTML=this.naziv;
        divNazivPice.appendChild(lblNazivPica);

    }
}