export class JeloSastojak{

    constructor(ID, Jelo, Sastojak,Kolicina,KolicinaJedinica)
    {
        this.ID=ID;
        this.Jelo=Jelo;
        this.Sastojak=Sastojak;
        this.Kolicina=Kolicina;
        this.KolicinaJedinica=KolicinaJedinica;
        this.Kontejner=null;
    }

    Crtaj(host) {
        if(!host) {
            throw new Error("Host ne postoji!");
        }
    }
}