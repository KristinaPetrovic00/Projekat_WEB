export class Saveti{

    constructor(id,naslov,tekst,slika){
        this.id=id;
        this.naslov=naslov;
        this.tekst=tekst;
        this.slika=slika;
        this.Kontejner=null;
    }

    crtajPredlogSavet(kuvarId,roditeljhosta,host){
        if(!roditeljhosta || !host){
            throw new Error("Host ne postoji!");
        }
        var divPredlog=document.createElement("div");
        divPredlog.className="DivPredlog";
        host.appendChild(divPredlog);

        var divPredlogSlika=document.createElement("div");
        divPredlogSlika.className="DivPredlogSlika";
        divPredlog.appendChild(divPredlogSlika);

        var divPredlogOpis=document.createElement("div");
        divPredlogOpis.className="DivPredlogOpis";
        divPredlog.appendChild(divPredlogOpis);

        var slika=document.createElement("img");
        slika.src="./Slike/"+ this.slika;
        slika.alt=this.slika;
        slika.className="SlikaPredlog";
        slika.onclick=(ev)=>this.crtajSavet(kuvarId,roditeljhosta);
        divPredlogSlika.appendChild(slika);

        var lblNazivPredlog=document.createElement("label");
        lblNazivPredlog.className="LblNazivPredlogSavet";
        lblNazivPredlog.innerHTML=this.naslov;
        lblNazivPredlog.onclick=(ev)=>this.crtajSavet(kuvarId,roditeljhosta);
        divPredlogOpis.appendChild(lblNazivPredlog);
    }

    crtajSavet(kuvarId,roditeljhost){
        if(!roditeljhost){
            throw new Exception("Nije dodeljen host!");
        }

        var par=roditeljhost.parentNode;
        par.removeChild(roditeljhost);
        var divSavet=document.createElement("div");
        divSavet.className="DivSavet";
        par.appendChild(divSavet);

        var divLevoSavet=document.createElement("div");
        divLevoSavet.className="DivLevoSavet";
        divSavet.appendChild(divLevoSavet);

        var divDesnoSavet=document.createElement("div");
        divDesnoSavet.className="DivDesnoSavet";
        divSavet.appendChild(divDesnoSavet);
        //levi deo
        var divSlikaSaveta=document.createElement("div");
        divSlikaSaveta.className="DivSlikaSaveta";
        divLevoSavet.appendChild(divSlikaSaveta);

        var slika=document.createElement("img");
        slika.src="./Slike/"+this.slika;
        slika.alt=this.slika;
        slika.className="SlikaSavet";
        divSlikaSaveta.appendChild(slika);

        //desni deo
        var divDugmici=document.createElement("div");
        divDugmici.className="DivDugmici";
        divDesnoSavet.appendChild(divDugmici);
        
        var btnObrisiSavet=document.createElement("button");
        btnObrisiSavet.className="BtnObrisiSavet";
        btnObrisiSavet.innerHTML="✂ Obrisi";
        btnObrisiSavet.onclick=(ev)=>this.ObrisiSavet(kuvarId,this.naslov,divSavet);
        divDugmici.appendChild(btnObrisiSavet);

        var btnIzmeniSavet=document.createElement("button");
        btnIzmeniSavet.className="BtnIzmeniSavet";
        btnIzmeniSavet.innerHTML="✑ Izmeni";
        btnIzmeniSavet.onclick=(ev)=>this.IzmeniSavet(kuvarId,this.id,divSavet);
        divDugmici.appendChild(btnIzmeniSavet);

        var divNaslovSaveta=document.createElement("div");
        divNaslovSaveta.className="DivNaslovS";
        divDesnoSavet.appendChild(divNaslovSaveta);

        var lblNaslovSaveta=document.createElement("label");
        lblNaslovSaveta.innerHTML=this.naslov;
        lblNaslovSaveta.className="LblNaslovS";
        divNaslovSaveta.appendChild(lblNaslovSaveta);

        var divTekstSavet=document.createElement("div");
        divTekstSavet.className="DivTekstSavet";
        divDesnoSavet.appendChild(divTekstSavet); 

        var lblTekstSavet=document.createElement("label");
        lblTekstSavet.className="LblTekstSavet";
        lblTekstSavet.innerHTML=this.tekst;
        divTekstSavet.appendChild(lblTekstSavet);
    }
    
    ObrisiSavet(kuvarid,naslov,host){
        if(!host){
            throw new Exception("Nije dodeljen host!");
        }
        if(confirm("Da li ste sigurni da zelite da obrisete savet?")){
        fetch("https://localhost:5001/Saveti/ObrisiSavet/"+kuvarid+"/"+naslov,
        {
            method:"DELETE"
        });
        var par=host.parentNode;
        par.removeChild(host);

        var divDete=document.createElement("div");
        divDete.className="DivDete";
        par.appendChild(divDete);

        var lblObavestenje=document.createElement("label");
        lblObavestenje.innerHTML="Sadrzaj je obrisan...";
        lblObavestenje.className="LblObavestenje";
        divDete.appendChild(lblObavestenje);
        }

    }

    IzmeniSavet(kuvarId,savetID,divSavet){
        if(confirm("Da li ste sigurni da zelite da izmenite savet?")){
        if(!divSavet){
            throw new Exception("Nedodeljen host!");
        }
        var divSavet;

        var roditelj=divSavet.parentNode;
        roditelj.removeChild(divSavet);

        divSavet=document.createElement("div");
        roditelj.appendChild(divSavet);
        divSavet.className="DivSavetIzmena";

        var divNaslovSaveta=document.createElement("div");
        divNaslovSaveta.className="DivNaslovSaveta";
        divSavet.appendChild(divNaslovSaveta);

        var lblNaslovSaveta=document.createElement("label");
        lblNaslovSaveta.className="LblNaslovSaveta";
        lblNaslovSaveta.innerText="Naslov saveta:";
        divNaslovSaveta.appendChild(lblNaslovSaveta);

        var txbNaslovSaveta=document.createElement("input");
        txbNaslovSaveta.type="text";
        txbNaslovSaveta.value=this.naslov;
        txbNaslovSaveta.className="TbxNaslovSaveta";
        divNaslovSaveta.appendChild(txbNaslovSaveta);

        var divTekstSaveta=document.createElement("div");
        divTekstSaveta.className="DivTekstSaveta";
        divSavet.appendChild(divTekstSaveta);

        var lblTekstSaveta=document.createElement("label");
        lblTekstSaveta.className="LblTekstSaveta";
        lblTekstSaveta.innerHTML="Tekst";
        divTekstSaveta.appendChild(lblTekstSaveta);

        var tarTekstSaveta=document.createElement("textarea");
        tarTekstSaveta.className="TraTekstSaveta";
        tarTekstSaveta.name="post";
        tarTekstSaveta.innerHTML=this.tekst;
        tarTekstSaveta.maxLength="8000";
        tarTekstSaveta.cols="100";
        tarTekstSaveta.rows="40";
        divTekstSaveta.appendChild(tarTekstSaveta);

        var divSlikaSaveta=document.createElement("div");
        divSlikaSaveta.className="DivSilkaSaveta";
        divSavet.appendChild(divSlikaSaveta);

        var lblSlikaSaveta=document.createElement("label");
        lblSlikaSaveta.className="LblSlikaSaveta";
        lblSlikaSaveta.innerHTML="Slika:";
        divSlikaSaveta.appendChild(lblSlikaSaveta);

        var txbSlikaSaveta=document.createElement("input");
        txbSlikaSaveta.type="text";
        //txbSlikaSaveta.innerHTML=this.slika;
        txbSlikaSaveta.value=this.slika;
        txbSlikaSaveta.className="TbxSlikaSaveta";
        divSlikaSaveta.appendChild(txbSlikaSaveta);

        var divDugmeDodajSavet=document.createElement("div");
        divDugmeDodajSavet.className="divDugmeDodajSavet";
        divSavet.appendChild(divDugmeDodajSavet);

        var dugmeDodajSavet=document.createElement("button");
        dugmeDodajSavet.className="DugmeDodajSavet";
        dugmeDodajSavet.innerHTML="IZMENI";
        dugmeDodajSavet.onclick=(ev)=>this.preuzmiIzmeneSavet(kuvarId,savetID,divSavet,txbNaslovSaveta.value,tarTekstSaveta.value,txbSlikaSaveta.value);
        divDugmeDodajSavet.appendChild(dugmeDodajSavet);
    }
    }

    preuzmiIzmeneSavet(kuvarId,savetID,divSavet,naslov,tekst,slika){
        if(naslov===null || naslov===undefined || naslov===""){
            alert("Naslov nije unet!");
        }
        if(tekst===null || tekst===undefined || tekst===""){
            alert("Tekst saveta nije unet!");
        }
        if(slika===null || slika===undefined || slika===""){
            alert("Slika nije uneta!");
        }
        fetch("https://localhost:5001/Saveti/IzmeniSavet/"+kuvarId+"/"+savetID+"/"+naslov+"/"+tekst+"/"+slika,{
            method:"PUT"
        })
        .then(p=>{
            if(p.ok){
                alert("Uspesno je azuriran sadrzaj prethodnog saveta");
                var par=divSavet.parentNode;
                 par.removeChild(divSavet);

                var divDete=document.createElement("div");
                divDete.className="DivDete";
                par.appendChild(divDete);

                var lblObavestenje=document.createElement("label");
                lblObavestenje.innerHTML="Sadrzaj je izmenjen...";
                lblObavestenje.className="LblObavestenje";
                divDete.appendChild(lblObavestenje);
            }
            /*else{
                p.text().then(greske=>{
                    alert(greske);
                    console.log(greske);
                })
            }*/
        })
        
    }
}