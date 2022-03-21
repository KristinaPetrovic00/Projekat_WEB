export class Sastojak{

    constructor(id,naziv)
    {
        this.id=id;
        this.naziv=naziv;
        this.Kontejner=null;
    }

    Crtaj(host){
        if(!host){
            throw new Error("Host ne postoji!");
        }
    }
}