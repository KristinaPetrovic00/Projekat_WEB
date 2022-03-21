import { NutritivneVrednosti } from "./NutritivneVrednosti.js";
import { Pice } from "./Pice.js";
import { Slozenost } from "./Slozenost.js";
export class Jelo{

    constructor(index,naziv,opis,vreme,broj_porcija,porcija_gram,postupak,
        serviranje,slozenost_jela,bez_glutena,foreignKeyNV,savet,video,slika,sastojci_svi)
    {
        this.index=index;
        this.naziv=naziv;
        //this.TipJela=TipJela;
        //this.PodtipJela=PodTipJela;
        this.opis=opis;
        this.vreme=vreme;
        this.broj_porcija=broj_porcija;
        this.porcija_gram=porcija_gram;
        this.postupak=postupak;
        this.serviranje=serviranje;
        this.slozenost_jela=slozenost_jela;
        this.bez_glutena=bez_glutena;
        //this.PreporucenoPice=PreporucenoPice;
        //this.NutritivneVrednosti=NutritivneVrednosti;
        this.foreignKeyNV=foreignKeyNV;
        this.savet=savet;
        this.video=video;
        this.slika=slika;
        //this.ListaSastojaka=ListaSastojaka;  //ne znam sta je sa ovim
        //this.Kontejner=null;
        this.sastojci_svi=sastojci_svi;
    }

    CrtajPreuzmi1(host){
        if(!host){
            throw new Error("Host ne postoji!");
        }
        var divTip1=host.createElement("div");
        divTip1.className=".DivTip1";
        host.appendChild(divTip1);

        var lblTip=document.createElement("label");
        lblTip.className="LblTip";
        lblTip.innerHTML="Tip: ";
        divTip1.appendChild(lblTip);
    }

    crtajPredlogRecept(idkuvar,roditeljhosta,host,kontejner){
        if(!roditeljhosta){
            throw new Exception("Nije dodeljen roditelj hosta!");
        }
        if(!host){
            throw new Exception("Nije dodeljen host!");
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
        slika.onclick=(ev)=>this.crtajRecept(idkuvar,roditeljhosta,kontejner);
        divPredlogSlika.appendChild(slika);

        var lblNazivPredlog=document.createElement("label");
        lblNazivPredlog.className="LblNazivPredlog";
        lblNazivPredlog.innerHTML=this.naziv;
        lblNazivPredlog.onclick=(ev)=>this.crtajRecept(idkuvar,roditeljhosta,kontejner);
        divPredlogOpis.appendChild(lblNazivPredlog);

        var lblVremePredlog=document.createElement("label");
        lblVremePredlog.className="LblVremePredlog";
        lblVremePredlog.innerHTML="vreme: "+this.vreme+" min";
        divPredlogOpis.appendChild(lblVremePredlog);

        var lblBrojPorcijaPredlog=document.createElement("label");
        lblBrojPorcijaPredlog.className="LblBrojPorcijaPredlog";
        lblBrojPorcijaPredlog.innerHTML="broj porcija: "+this.broj_porcija;
        divPredlogOpis.appendChild(lblBrojPorcijaPredlog);
            
    }

    crtajRecept(idkuvar,roditeljhost,kontejner){
        if(!roditeljhost){
            throw new Exception("Nije dodeljen host!");
        }

        var par=roditeljhost.parentNode;
        par.removeChild(roditeljhost);

        var divhost=document.createElement("div");
        divhost.className="DivHost";
        par.appendChild(divhost);

        var divRecept=document.createElement("div");
        divRecept.className="DivRecept";
        divhost.appendChild(divRecept);

        var divNaslovNVObjasnjenje=document.createElement("div");
        divNaslovNVObjasnjenje.className="DivNaslovObjasnjenje";
        divhost.appendChild(divNaslovNVObjasnjenje); 

        var lblNaslovNVObjasnjenje=document.createElement("label");
        lblNaslovNVObjasnjenje.className="LblNaslovNVObjasnjenje";
        lblNaslovNVObjasnjenje.innerHTML="Dodatne informacije za znatizeljne o nutritivnim vrednostima";
        divhost.appendChild(lblNaslovNVObjasnjenje);

        var divNVObjasnjenje=document.createElement("div");
        divNVObjasnjenje.className="DivNVObjasnjenje";
        divhost.appendChild(divNVObjasnjenje);

        var divLevoRecept=document.createElement("div");
        divLevoRecept.className="DivLevoRecept";
        divRecept.appendChild(divLevoRecept);

        var divDesnoRecept=document.createElement("div");
        divDesnoRecept.className="DivDesnoRecept";
        divRecept.appendChild(divDesnoRecept);
        //levi deo
        var divSlikaRecepta=document.createElement("div");
        divSlikaRecepta.className="DivSlikaRecepta";
        divLevoRecept.appendChild(divSlikaRecepta);

        var slika=document.createElement("img");
        slika.src="./Slike/"+this.slika;
        slika.alt=this.slika;
        slika.className="SlikaRecept";
        divSlikaRecepta.appendChild(slika);

        var divSastojci=document.createElement("div");
        divSastojci.className="DivSastojci";
        divLevoRecept.appendChild(divSastojci); 

        var lblSastojci=document.createElement("label");
        lblSastojci.className="LblSastojciNaslov";
        lblSastojci.innerHTML="Sastojci:";
        divSastojci.appendChild(lblSastojci);

        //var divLS=document.createElement("div");
        
        
        this.sastojci_svi.forEach(p=>
            {
            var divS=document.createElement("div");
            divS.className="DivS";
            divSastojci.appendChild(divS);
            var lblS=document.createElement("label");
            lblS.className="LblS";
            console.log(p.kolicina);
            lblS.innerHTML=p.kolicina_sastojka+" "+p.kolicina_jedinica+" "+p.sastojak_naziv; 
            divS.appendChild(lblS);
                }
            )
       
        var divVideo=document.createElement("div");
        divVideo.className="DivVideo";
        divLevoRecept.appendChild(divVideo);

        var btnvideo=document.createElement("button");
        btnvideo.innerHTML="Video recept";
        btnvideo.className="BtnVideo";
        btnvideo.onclick=(ev)=>this.PrikaziVideo(this.video);
        divVideo.appendChild(btnvideo);

        var divSavetZaJelo=document.createElement("div");
        divSavetZaJelo.className="DivSavetZaJelo";
        divLevoRecept.appendChild(divSavetZaJelo);

        var lblSavetZaJeloNaslov=document.createElement("label");
        lblSavetZaJeloNaslov.className="LblSavetZaJeloNaslov";
        lblSavetZaJeloNaslov.innerHTML="Savet:";
        divSavetZaJelo.appendChild(lblSavetZaJeloNaslov);

        var lblSavetZaJelo=document.createElement("label");
        lblSavetZaJelo.className="LblSavetZaJelo";
        lblSavetZaJelo.innerHTML=this.savet;
        divSavetZaJelo.appendChild(lblSavetZaJelo);

        var divServiranje=document.createElement("div");
        divServiranje.className="DivSavetZaJelo";
        divLevoRecept.appendChild(divServiranje);

        var lblServiranjeNaslov=document.createElement("label");
        lblServiranjeNaslov.className="LblSavetZaJeloNaslov";
        lblServiranjeNaslov.innerHTML="Serviranje:";
        divServiranje.appendChild(lblServiranjeNaslov);

        var lblServiranje=document.createElement("label");
        lblServiranje.className="LblSavetZaJelo";
        lblServiranje.innerHTML=this.serviranje;
        divServiranje.appendChild(lblServiranje);

        //desni deo
        var divDugmici=document.createElement("div");
        divDugmici.className="DivDugmici";
        divDesnoRecept.appendChild(divDugmici);
        
        var btnObrisiRecept=document.createElement("button");
        btnObrisiRecept.className="BtnObrisiRecept";
        btnObrisiRecept.innerHTML="✂ Obrisi";
        btnObrisiRecept.onclick=(ev)=>this.ObrisiRecept(idkuvar,this.naziv,divhost);
        divDugmici.appendChild(btnObrisiRecept);

        var btnIzmeniRecept=document.createElement("button");
        btnIzmeniRecept.className="BtnIzmeniRecept";
        btnIzmeniRecept.innerHTML="✑ Izmeni";
        btnIzmeniRecept.onclick=(ev)=>this.IzmeniRecept(idkuvar,this.naziv,divhost,kontejner);
        divDugmici.appendChild(btnIzmeniRecept);

        var divNaslovRecepta=document.createElement("div");
        divNaslovRecepta.className="DivNaslovRecepta";
        divDesnoRecept.appendChild(divNaslovRecepta);

        var lblNaslovRecepta=document.createElement("label");
        lblNaslovRecepta.innerHTML=this.naziv;
        lblNaslovRecepta.className="LblNaslovRecepta";
        divNaslovRecepta.appendChild(lblNaslovRecepta);

        var divGluten=document.createElement("div");
        divGluten.className="DivGluten";
        divDesnoRecept.appendChild(divGluten);
        
        var lblGluten=document.createElement("label");
        if(this.bez_glutena==1){
            lblGluten.innerHTML="• bez glutena •";
        }
        else{
            lblGluten.innerHTML="• sadrzi gluten •";
        }
        lblGluten.className="LblGluten";
        divGluten.appendChild(lblGluten);

        var divOpis=document.createElement("div");
        divOpis.className="DivOpisJelo";
        divDesnoRecept.appendChild(divOpis);

        var lblOpis=document.createElement("label");
        lblOpis.innerHTML=this.opis;
        lblOpis.className="LblOpis";
        divOpis.appendChild(lblOpis);

        var divPojedinosti=document.createElement("div");
        divPojedinosti.className="DivPojedinosti";
        divDesnoRecept.appendChild(divPojedinosti);

        var lblVreme=document.createElement("label");
        lblVreme.innerHTML="vreme pripreme: "+this.vreme+ " min";
        lblVreme.className="LblVreme";
        divPojedinosti.appendChild(lblVreme);

        var lblBrPorcija=document.createElement("label");
        lblBrPorcija.innerHTML="broj porcija: "+this.broj_porcija;
        lblBrPorcija.className="LblBrojPorcija";
        divPojedinosti.appendChild(lblBrPorcija);
        //???????????????????????????
        /*var lblSlozenost=document.createElement("label");
        lblSlozenost.innerHTML="slozenost: "+this.slozenost_jela;
        lblSlozenost.className="LblSlozenost";
        divPojedinosti.appendChild(lblSlozenost);
        console.log(this.slozenost_jela);*/
        //this.slozenost_jela.crtajSlozenost(divPojedinosti);

        var lblGramazaPorcije=document.createElement("label");
        lblGramazaPorcije.innerHTML="gramaza porcije: "+this.porcija_gram+" g";
        lblGramazaPorcije.className="LblGramazaPorcije";
        divPojedinosti.appendChild(lblGramazaPorcije);

        var divNutrVrPodnaslov=document.createElement("div");
        divDesnoRecept.appendChild(divNutrVrPodnaslov);

        var lblNutrVrPodnaslov=document.createElement("label");
        lblNutrVrPodnaslov.className="LblNutrVrPodnaslov";
        lblNutrVrPodnaslov.innerHTML="Pregled nutritivnih vrednosti:";
        divNutrVrPodnaslov.appendChild(lblNutrVrPodnaslov);

        var divNutritivneVrednosti=document.createElement("div");
        divNutritivneVrednosti.className="DivNutritivneVrednosti";
        divDesnoRecept.appendChild(divNutritivneVrednosti);

        var divNutritivneVrednostiObjasnjenje=document.createElement("div");
        divNutritivneVrednostiObjasnjenje.className="DivNutritivneVrednosti";
        divDesnoRecept.appendChild( divNutritivneVrednostiObjasnjenje);

        var divNutVrGrafik=document.createElement("div");
        divNutVrGrafik.className="DivNutVrGrafik";
        divDesnoRecept.appendChild(divNutVrGrafik);

        var nutvr;
        fetch("https://localhost:5001/NutritivneVrednosti/PredajNutritivneVrednosti/"+this.foreignKeyNV)
        .then(p=>{
            p.json().then(n=>{
                    nutvr=new NutritivneVrednosti(n.index,n.kalorije,n.kalorije_procenti,n.kalorije_objasnjenje,n.masti,n.masti_procenti,n.masti_objasnjenje,n.zasicenje,n.zasicenje_procenti,n.zasicenje_objasnjenje,n.seceri,n.seceri_procenti,
                    n.seceri_objasnjenje,n.soli,n.soli_procenti,n.soli_objasnjenje,n.proteini,n.proteini_procenti,n.proteini_objasnjenje,n.ugljeniHidrati,n.ughljeniHidrati_procenti,n.ugljeniHidrati_objasnjenje,n.vlakna,n.vlakna_objasnjenje);
                    console.log(nutvr);
                    nutvr.crtajNutritivneVrednostistatistika(divNutritivneVrednosti, divNutVrGrafik);
                    nutvr.crtajNutritivneVrednostiObjasnjenje(divNVObjasnjenje);
                });
        })

        var divPostupak=document.createElement("div");
        divPostupak.className="DivPostupak";
        divDesnoRecept.appendChild(divPostupak); 

        var lblPostupakNaslov=document.createElement("label");
        lblPostupakNaslov.className="LblPostupakNaslov";
        lblPostupakNaslov.innerHTML="Postupak:";
        divPostupak.appendChild(lblPostupakNaslov);

        var lblPostupak=document.createElement("label");
        lblPostupak.className="LblPostupakRecept";
        lblPostupak.innerHTML=this.postupak;
        divPostupak.appendChild(lblPostupak);

        var divPreporucenoPice=document.createElement("div");
        divPreporucenoPice.className="DivPreporucenoPice";
        divDesnoRecept.appendChild(divPreporucenoPice); 

        var lblPreporucenoPice=document.createElement("label");
        lblPreporucenoPice.className="LblPiceRecept";
        lblPreporucenoPice.innerHTML="Preporuceno pice:";
        divPreporucenoPice.appendChild(lblPreporucenoPice);

        var divPice=document.createElement("div");
        divPice.className="DivPice";
        divPreporucenoPice.appendChild(divPice);

        var divSlikaPice=document.createElement("div");
        divSlikaPice.className="DivSlikaPice";
        divPice.appendChild(divSlikaPice);

        var divNazivPice=document.createElement("div");
        divNazivPice.className="DivNazivPice";
        divPice.appendChild(divNazivPice);

        fetch("https://localhost:5001/Pice/PreuzmiPice/"+idkuvar+"/"+this.index)
        .then(p=>{
            p.json().then(p=>{
                var pice=new Pice(p.naziv,p.slika_pica);
                console.log(pice);
                pice.nacrtajPice(divSlikaPice,divNazivPice);
            })
        })

    }
    PrikaziVideo(video){
        window.open(video, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=700,height=600");
    }
    ObrisiRecept(idkuvar,naziv,host){

        if(confirm("Da li ste sigurni da zelite da obrisete ovaj recept?")){
        fetch("https://localhost:5001/Jelo/IzbrisatiJelo/"+idkuvar+"/"+naziv,
        {
            method:"DELETE"
        })
        
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

    IzmeniRecept(idkuvar,naziv,divhost,kontejner){
        if(!divhost){
            throw new Exception("Nije dodeljen host!");
        }

        var par=divhost.parentNode;
        par.removeChild(divhost);

        var divPromena=document.createElement("div");
        par.appendChild(divPromena);
        divPromena.className="DivPromena";

        var podloga0=document.createElement("div");
        podloga0.className="Podloga0";
        divPromena.appendChild(podloga0);

        var podloga1=document.createElement("div");
        podloga1.className="Podloga1";
        podloga0.appendChild(podloga1);

        var levoDiv=document.createElement("div");
        levoDiv.className="LevoDiv";
        podloga1.appendChild(levoDiv);

        var desnoDiv=document.createElement("div");
        desnoDiv.className="DesnoDiv";
        podloga1.appendChild(desnoDiv);

        //LEVI DEO
        var divNazivJela=document.createElement("div");
        divNazivJela.className="DivNazivJela";
        levoDiv.appendChild(divNazivJela);

        var lblNazivJela=document.createElement("label");
        lblNazivJela.className="LblNazivJela";
        lblNazivJela.innerHTML="Naziv:";
        divNazivJela.appendChild(lblNazivJela);

        var tbxNazivJela=document.createElement("input");
        tbxNazivJela.className="TbxNazivJela";
        tbxNazivJela.type="text";
        //tbxNazivJela.innerText=this.naziv;
        divNazivJela.appendChild(tbxNazivJela);

        var divTipJela=document.createElement("div");
        divTipJela.className="DivTipJela";
        levoDiv.appendChild(divTipJela);

        var lblTipJela=document.createElement("label");
        lblTipJela.className="LblTipJela";
        lblTipJela.innerHTML="Tip:";
        divTipJela.appendChild(lblTipJela);

        this.fetchZaTip(divTipJela,"SelectLevoIzmeni");

        var btnPotvrdi=document.createElement("button");
       btnPotvrdi.innerHTML="POTVRDI!";
       btnPotvrdi.className="DugmePotvrdiIzmena";
       btnPotvrdi.onclick=(ev)=>this.potvrdi(divPromena);
       divTipJela.appendChild(btnPotvrdi);

        var divPodTipJela=document.createElement("div");
        divPodTipJela.className="DivPodTipJela";
        levoDiv.appendChild(divPodTipJela);

        var lblPodTipJela=document.createElement("label");
        lblPodTipJela.className="LblPodTipJela";
        lblPodTipJela.innerHTML="Podtip:";
        divPodTipJela.appendChild(lblPodTipJela);

       var divOpis=document.createElement("div");
       divOpis.className="DivOpis";
       levoDiv.appendChild(divOpis);

       var lblOpisDodaj=document.createElement("label");
       lblOpisDodaj.className="LblOpisDodaj";
       lblOpisDodaj.innerHTML="Kratak opis jela:";
       divOpis.appendChild(lblOpisDodaj);

        var tarOpis=document.createElement("textarea");
        tarOpis.className="TarOpis";
        tarOpis.name="post";
        tarOpis.maxLength="200";
        tarOpis.rows="10";
        tarOpis.cols="22";
        tarOpis.innerHTML=this.opis;
        divOpis.appendChild(tarOpis);

        var divSlozenost=document.createElement("div");
        divSlozenost.className="DivSlozenost";
       levoDiv.appendChild(divSlozenost);

       var lblSlozenost=document.createElement("label");
       lblSlozenost.className="LblSlozenostPripreme";
       lblSlozenost.innerHTML="Slozenost pripreme:";
       divSlozenost.appendChild(lblSlozenost);

       var selectSlozenost=document.createElement("select");
       selectSlozenost.className="SelectSlozenost";
       divSlozenost.appendChild(selectSlozenost);

       var option;
       fetch("https://localhost:5001/Slozenost/PreuzmiSlozenost")
       .then(p=>{
           p.json().then(slozenosti=>{
               slozenosti.forEach(slozenost=>{
               option=document.createElement("option");
               option.innerHTML=slozenost.naziv;
               option.value=slozenost.id;
               selectSlozenost.appendChild(option);       
               })
           })
       });
/////
        var divVremeIzrade=document.createElement("div");
        divVremeIzrade.className="DivVremeIzrade";
        levoDiv.appendChild(divVremeIzrade); 

       var lblVremeIzrade=document.createElement("label");
       lblVremeIzrade.className="LblVremeIzrade";
       lblVremeIzrade.innerHTML="Vreme izrade (min):";
       divVremeIzrade.appendChild(lblVremeIzrade);

       var tbxVremeIzrade=document.createElement("input");
       tbxVremeIzrade.className="TbxVremeIzrade";
       tbxVremeIzrade.type="number";
       tbxVremeIzrade.min="0";
       tbxVremeIzrade.max="120";
       divVremeIzrade.appendChild(tbxVremeIzrade);

       var divBrPorcija=document.createElement("div");
       divBrPorcija.className="DivBrPorcija";
       levoDiv.appendChild(divBrPorcija); 

       var lblBrPorcija=document.createElement("label");
       lblBrPorcija.className="LblBrPorcija";
       lblBrPorcija.innerHTML="Broj porcija (1-16):";
       divBrPorcija.appendChild(lblBrPorcija);

       var tbxBrPorcija=document.createElement("input");
       tbxBrPorcija.className="TbxBrPorcija";
       tbxBrPorcija.type="number";
       tbxBrPorcija.min="1";
       tbxBrPorcija.max="16";
       divBrPorcija.appendChild(tbxBrPorcija);

       var divGrPorcije=document.createElement("div");
       divGrPorcije.className="DivGrPorcije";
       levoDiv.appendChild(divGrPorcije); 

       var lblGrPorcije=document.createElement("label");
       lblGrPorcije.className="LblGrPorcije";
       lblGrPorcije.innerHTML="Gramaža porcije (gr):";
       divGrPorcije.appendChild(lblGrPorcije);

       var tbxGrPorcije=document.createElement("input");
       tbxGrPorcije.className="TbxGrPorcije";
       tbxGrPorcije.type="number";
       tbxGrPorcije.min="1";
       divGrPorcije.appendChild(tbxGrPorcije);

       var divGluten=document.createElement("div");
       divGluten.className="DivGlutenN";
       levoDiv.appendChild(divGluten); 

       var lblGluten=document.createElement("label");
       lblGluten.className="LblGluten";
       lblGluten.innerHTML="Da li je jelo BEZ glutena?";
       divGluten.appendChild(lblGluten);

       var divRbtGluten=document.createElement("div");
       divRbtGluten.className="DivRbtGluten";
       divGluten.appendChild(divRbtGluten);

       var rbtDa=document.createElement("input");
       rbtDa.type="radio";
       rbtDa.name="rbt";
       rbtDa.value="da";
       rbtDa.className="RbtDa";
       divRbtGluten.appendChild(rbtDa);

       var lblDa=document.createElement("label");
       lblDa.className="LblDa";
       lblDa.innerHTML="Da";
       divRbtGluten.appendChild(lblDa);

       var rbtNe=document.createElement("input");
       rbtNe.type="radio";
       rbtNe.name="rbt";
       rbtNe.value="ne";
       rbtNe.className="RbtNe";
       divRbtGluten.appendChild(rbtNe);

       var lblNe=document.createElement("label");
       lblNe.className="LblNe";
       lblNe.innerHTML="Ne";
       divRbtGluten.appendChild(lblNe);

       var divPreporucenoPice=document.createElement("div");
       divPreporucenoPice.className="DivPreporucenoPice";
       levoDiv.appendChild(divPreporucenoPice);

       var lblPreporucenoPice=document.createElement("label");
       lblPreporucenoPice.className="LblPreporucenoPice";
       lblPreporucenoPice.innerHTML="Preporučeno piće:";
       divPreporucenoPice.appendChild(lblPreporucenoPice);

       var selectPreporucenoPice=document.createElement("select");
       selectPreporucenoPice.className="SelectPreporucenoPice";
       divPreporucenoPice.appendChild(selectPreporucenoPice);

       var op;
       fetch("https://localhost:5001/Pice/PreuzmiPica/"+idkuvar)
       .then(p=>{
           p.json().then(pica=>{
               pica.forEach(pice=>{
                   op=document.createElement("option");
                   op.innerHTML=pice.naziv;
                   op.value=pice.index;
                   selectPreporucenoPice.appendChild(op);
               })
           })
       });

       var divSavet=document.createElement("div");
       divSavet.className="DivSavet";
       levoDiv.appendChild(divSavet);

       var lblSavet=document.createElement("label");
       lblSavet.className="LblSavet";
       lblSavet.innerHTML="Savet:";
       divSavet.appendChild(lblSavet);

       var tarSavet=document.createElement("textarea");
       tarSavet.name="post";
       tarSavet.className="TarSavet";
       tarSavet.maxLength="200";
       tarSavet.rows="10";
       tarSavet.cols="20";
       tarSavet.innerHTML=this.savet;
       divSavet.appendChild(tarSavet);

       var divVideo=document.createElement("div");
       divVideo.className="DivVideo";
       levoDiv.appendChild(divVideo);

       var lblVideo=document.createElement("label");
       lblVideo.className="LblVideo";
       lblVideo.innerHTML="Video:";
       divVideo.appendChild(lblVideo);

       var tbxVideo=document.createElement("input");
       tbxVideo.type="text";
       tbxVideo.className="TbxVideo";
       divVideo.appendChild(tbxVideo);

       var divSlika=document.createElement("div");
       divSlika.className="DivSlika";
       levoDiv.appendChild(divSlika);

       var lblSlika=document.createElement("label");
       lblSlika.className="LblSlika";
       lblSlika.innerHTML="Slika:";
       divSlika.appendChild(lblSlika);

       var tbxSlika=document.createElement("input");
       tbxSlika.type="text";
       tbxSlika.className="TbxSlika";
       divSlika.appendChild(tbxSlika);

       var divServiranje=document.createElement("div");
       divServiranje.className="DivServiranje";
       levoDiv.appendChild(divServiranje);

       var lblServiranje=document.createElement("label");
       lblServiranje.className="LblServiranje";
       lblServiranje.innerHTML="Serviranje:";
       divServiranje.appendChild(lblServiranje);

       var txtServiranje=document.createElement("input");
       txtServiranje.type="text";
       txtServiranje.className="TxtServiranje";
       divServiranje.appendChild(txtServiranje);

        //DESNI DEO
        var divSastojci=document.createElement("div");
        divSastojci.className="DivSastojci";
        desnoDiv.appendChild(divSastojci);
 
        var divSastojciIzbor0=document.createElement("div");
        divSastojciIzbor0.className="DivSastojciIzbor0";
        desnoDiv.appendChild(divSastojciIzbor0);
 
        var divSastojciIzbor=document.createElement("div");
        divSastojciIzbor.className="DivSastojciIzbor";
        divSastojciIzbor0.appendChild(divSastojciIzbor);

        var btnSastojciOpsirnije=document.createElement("button");
       btnSastojciOpsirnije.className="BtnSastojciOpsirnije";
       btnSastojciOpsirnije.innerHTML="KLIKNI DA UNESEŠ SASTOJKE";
       btnSastojciOpsirnije.onclick=(ev)=>{
           const divSaSastojcima=document.createElement("div");
           divSaSastojcima.className="DivSaSastojcima";
           kontejner.appendChild(divSaSastojcima);
           this.crtajIzborSastojaka(divSaSastojcima,divSastojciIzbor);
       }

       divSastojci.appendChild(btnSastojciOpsirnije);

       var divPostupak=document.createElement("div");
       divPostupak.className="DivPostupak";
       desnoDiv.appendChild(divPostupak);

       var lblPostupak=document.createElement("label");
       lblPostupak.className="LblPostupak";
       lblPostupak.innerHTML="Postupak:";
       divPostupak.appendChild(lblPostupak);

       var txtareaPostupak=document.createElement("textarea");
       txtareaPostupak.name="post";
       txtareaPostupak.className="TxtAreaPostupak";
       txtareaPostupak.cols="60";
       txtareaPostupak.rows="35";
       txtareaPostupak.innerHTML=this.postupak;
       divPostupak.appendChild(txtareaPostupak);

       /////////////////////////////////////////

       var divNutrVr=document.createElement("div");
       divNutrVr.className="DivNutrVr";
       podloga0.appendChild(divNutrVr);

       var levoNutrVr=document.createElement("div");
       levoNutrVr.className="LevoNutrVr";
       divNutrVr.appendChild(levoNutrVr);

       var desnoNutrVr=document.createElement("div");
       desnoNutrVr.className="DesnoNutrVr";
       divNutrVr.appendChild(desnoNutrVr);

       this.crtajNutrVr(podloga0,levoNutrVr,desnoNutrVr);

       var divDugmeDodaj=document.createElement("div");
       divDugmeDodaj.className="DivDugmeDodaj";
       podloga0.appendChild(divDugmeDodaj);

       var btnDodaj=document.createElement("button");
       btnDodaj.innerHTML="IZMENI";
       btnDodaj.className="DugmeIzmeni";
       btnDodaj.onclick=(ev)=>this.pokupiVrednostiIzmena(divPromena,idkuvar,kontejner);
       divDugmeDodaj.appendChild(btnDodaj);
 
    }
    potvrdi(divPromena){
        var idtip=divPromena.querySelector(".SelectLevoIzmeni");
        var opt=idtip.options[idtip.selectedIndex].value;
        console.log(opt);
        this.fetchZaPodTip(divPromena.querySelector(".DivPodTipJela"),divPromena,"SelectPodTipLevoIzmeni",opt);
    }
    pokupiVrednostiIzmena(divhost,idkuvar,kontejner){
        var nazivJela=divhost.querySelector(".TbxNazivJela").value;
        var tipJela=divhost.querySelector(".SelectLevoIzmeni");
        var tip=tipJela.options[tipJela.selectedIndex].value;
        var podtipJela=divhost.querySelector(".SelectPodTipLevoIzmeni");
        var podtip=podtipJela.options[podtipJela.selectedIndex].value;
        var opis=divhost.querySelector(".TarOpis").value;
        var slozenost=divhost.querySelector(".SelectSlozenost");
        var s=slozenost.options[slozenost.selectedIndex].value;
        var vreme=divhost.querySelector(".TbxVremeIzrade").value;
        var brporcija=divhost.querySelector(".TbxBrPorcija").value;
        var gramaza=divhost.querySelector(".TbxGrPorcije").value;
        var gluten=divhost.querySelector('input[name="rbt"]:checked');
        var g;
        if(gluten.value==="da"){
            g=true;
        }
        else{
            g=false;
        }
        var piceJelo=divhost.querySelector(".SelectPreporucenoPice");
        console.log(piceJelo);
        var pice=piceJelo.options[piceJelo.selectedIndex].value;
        var savet=divhost.querySelector(".TarSavet").value;
        var video=divhost.querySelector(".TbxVideo").value;
        var slika=divhost.querySelector(".TbxSlika").value;
        var serviranje=divhost.querySelector(".TxtServiranje").value;
        var postupak=divhost.querySelector(".TxtAreaPostupak").value;

        if(nazivJela===null || nazivJela===undefined || nazivJela===""){
            alert("Nedostaje naziv jela!");
        }
        if(opis===null || opis==undefined || opis===""){
            alert("Nedostaje opis jela!");
        }
        if(video===null || video==undefined || video===""){
            alert("Nedostaje savet!");
        }
        if(slika===null || slika==undefined || slika===""){
            alert("Nedostaje savet!");
        }
        if(serviranje===null || serviranje==undefined || serviranje===""){
            alert("Nedostaje savet!");
        }
        if(postupak===null || postupak===undefined || postupak===""){
            alert("Nedostaje savet!");
        }

        var listaSas=[];
        var listaKol=[];
        var listaJed=[];

        var Sastojci;
        var Kolicina;
        var Jedinica;
    
        //izvlacenje sastojaka
        var sastojci=divhost.querySelectorAll(".lblsas");
        sastojci.forEach(s=>{
            listaSas.push(s.innerHTML);
        })
        //priprema sastojaka za fetch
        for(var i=0;i<listaSas.length;i++){
            if(i===0){
                Sastojci=listaSas[i]+"{";
            }
            else{
            if(i===listaSas.length-1){
                Sastojci+=listaSas[i];
            }
            else{
                Sastojci+=listaSas[i]+"{";
            }
            }
        }
        console.log(Sastojci);
        //izvlacenje kolicine
        var kol=divhost.querySelectorAll(".TbxS");
        kol.forEach(k=>{
            listaKol.push(k.value);
        })
        //priprema kolicine za fetch
        for(var i=0;i<listaKol.length;i++){
            if(i===0){
                Kolicina=listaKol[i]+"{";
            }
            else{
            if(i===listaKol.length-1){
                Kolicina+=listaKol[i];
            }
            else{
                Kolicina+=listaKol[i]+"{";
            }
            }
        }
        console.log(Kolicina);
        //izvlacenje jedinica
        var jedinica=divhost.querySelectorAll(".selsas");
        jedinica.forEach(j=>{
            var jj=j.options[j.selectedIndex].value;
            listaJed.push(jj);
        })
        //priprema jedinica za fetch
        for(var i=0;i<listaJed.length;i++){
            if(i===0){
                Jedinica=listaJed[i]+"{";
            }
            else{
            if(i===listaJed.length-1){
                Jedinica+=listaJed[i];
            }
            else{
                Jedinica+=listaJed[i]+"{";
            }
            }
        }
        var listaVr=[];

        var NutrVr;
        var NutrProc;
        var NutrObj;

        var vrednosti=divhost.querySelectorAll(".TbxVr");
        vrednosti.forEach(v=>{
            listaVr.push(v.value);
        })

        for(var i=0;i<listaVr.length;i++){
            if(i===0){
                NutrVr=listaVr[i]+"{";
            }
            else{
            if(i===listaVr.length-1){
                NutrVr+=listaVr[i];
            }
            else{
                NutrVr+=listaVr[i]+"{";
            }
            }
        }

        var listaProc=[];
        var procenti=divhost.querySelectorAll(".TbxP");
        procenti.forEach(p=>{
            listaProc.push(p.value);
        })
        console.log(listaProc);

        for(var i=0;i<listaProc.length;i++){
            if(i===0){
                NutrProc=listaProc[i]+"{";
            }
            else{
            if(i===listaProc.length-1){
                NutrProc+=listaProc[i];
            }
            else{
                NutrProc+=listaProc[i]+"{";
            }
            }
        }

        var listaO=[];
        var objasnjenja=divhost.querySelectorAll(".TbxO");
        objasnjenja.forEach(o=>{
            listaO.push(o.value);
        })

        for(var i=0;i<listaO.length;i++){
            if(i===0){
                NutrObj=listaO[i]+"{";
            }
            else{
            if(i===listaO.length-1){
                NutrObj+=listaO[i];
            }
            else{
                NutrObj+=listaO[i]+"{";
            }
            }
        }

        var ulaznistr=nazivJela+"{"+opis+"{"+vreme+"{"+brporcija+"{"+gramaza+"{"+g+"{"+savet+"{"
        +video+"{"+slika+"{"+serviranje+"{"+postupak; 
        console.log(ulaznistr);
        fetch("https://localhost:5001/Jelo/IzmeniRecept/"+idkuvar+"/"+this.index+"/"+ulaznistr+"/"+podtip+"/"+s+"/"+pice+"/"+NutrVr+"/"+NutrProc+"/"+NutrObj+"/"+Sastojci+"/"+Kolicina+"/"+Jedinica,
        {method:"PUT"})
        .then(j=>{
            if(j.ok){
                alert("Recept je uspesno azurian!");
                //this.crtajRecept(idkuvar,divhost,kontejner);
                var par=divhost.parentNode;
                par.removeChild(divhost);

                var divDete=document.createElement("div");
                divDete.className="DivDete";
                par.appendChild(divDete);

                var lblObavestenje=document.createElement("label");
                lblObavestenje.innerHTML="Sadrzaj je izmenjen...";
                lblObavestenje.className="LblObavestenje";
                divDete.appendChild(lblObavestenje);

            }
        })

    }
    fetchZaTip(host,klasa){
        var selectTip=document.createElement("select");
        selectTip.className=klasa;
        host.appendChild(selectTip);

        var op;
       fetch("https://localhost:5001/Tip/PreuzmiTip")
       .then(p=>{
           p.json().then(tipovi=>
            tipovi.forEach(tip=>{
                op=document.createElement("option");
                op.innerHTML=tip.naziv;
                op.value=tip.id;
                console.log(klasa);
                console.log(op.value);
                selectTip.appendChild(op);
            }))
       });
    }
    crtajIzborSastojaka(divSaSastojcima,divSastojciIzbor){

        var divdugme=document.createElement("div");
        divdugme.className="DivDugme";
        divSaSastojcima.appendChild(divdugme);

        var btnDugmeDodaj=document.createElement("button");
        btnDugmeDodaj.className="BtnDugmeDodaj";
        btnDugmeDodaj.innerHTML="Dodaj sastojke";
        divdugme.appendChild(btnDugmeDodaj);

        var divS=document.createElement("div");
        divS.className="DivS";
        divSaSastojcima.appendChild(divS);

        var k=0;
        var div;
        var listaBtn=[];
        fetch("https://localhost:5001/Sastojak/Preuzmi",
        {method:"GET"})
        .then(s=>{
            s.json().then(sastojci=>{
                sastojci.forEach(sastojak=>{
                    var btn=document.createElement("button");
                    btn.classList.add("btnSastojak");
                    btn.innerHTML=sastojak.naziv;
                    btn.value="notSelected";

                    if(k%8===0){
                        div=document.createElement("div");
                        div.className="DivSastojciDodaj";
                        divS.appendChild(div);
                        div.appendChild(btn);
                    }
                    else{
                    div.appendChild(btn);
                    }
                    k++;
                    btn.onclick=(ev)=>{
                        if(btn.value==="notSelected"){
                            btn.classList.add("btnSastojakSelected");
                            btn.value="Selected";
                            listaBtn.push(btn.innerHTML);
                            console.log(btn.innerHTML);
                            console.log(listaBtn);
                        }
                        else if(btn.value==="Selected"){
                            btn.classList.remove("btnSastojakSelected");
                            btn.value="notSelected";
                            listaBtn=listaBtn.filter(function(value){
                                return value!=btn.innerHTML;
                            });
                        }
                    }
                })
            })
        })
        var i=0;
        btnDugmeDodaj.onclick=(ev)=>{

            var par=divSaSastojcima.parentNode;
            par.removeChild(divSaSastojcima);

            if(divSastojciIzbor.hasChildNodes()){
                while(divSastojciIzbor.firstChild){
                    divSastojciIzbor.removeChild(divSastojciIzbor.firstChild);
                }
            }

            listaBtn.forEach(b=>{
                var divsas=document.createElement("div");
                divsas.className="divsas";
                divSastojciIzbor.appendChild(divsas);

                var lblsas=document.createElement("label");
                lblsas.className="lblsas";
                lblsas.innerHTML=b;
                divsas.appendChild(lblsas);

                var tbxsas=document.createElement("input");
                tbxsas.className="TbxS";
                tbxsas.type="number";
                tbxsas.min="1";
                divsas.appendChild(tbxsas);

                var selsas=document.createElement("select");
                selsas.className="selsas";
                divsas.appendChild(selsas);

                fetch("https://localhost:5001/Jedinica/PreuzmiJedinice")
                .then(p=>{
                    p.json().then(jedinice=>{
                        jedinice.forEach(j=>{
                            var option=document.createElement("option");
                            option.value=j.id;
                            console.log(j.id);
                            option.innerHTML=j.naziv;
                            selsas.appendChild(option);
                        })
                    })
                })

            })
        }

    }

    crtajNutrVr(host,levohost,desnohost)
    {
        if(!host || !levohost || !desnohost){
            throw new Exception("Hostovi nisu dodeljeni!");
        }

        var listaNutrVr=["Kalorije","Masti","Zasicenje","Seceri","Soli","Proteini","Ugljeni hidrati","Vlakna"];

        var divNV;
        var lblNV;
        var divVP;
        var tbxVr;
        var tbxP;
        var lblVrednost;
        var lblProcenat;
        var lblObjasnjenje;
        var tbxO;
        var k=0;
        listaNutrVr.forEach(p=>{
            divNV=document.createElement("div");
            divNV.className="DivNV";
            if(k<4){
            levohost.appendChild(divNV);
            }
            else{
            desnohost.appendChild(divNV);
            }
            k++;
            lblNV=document.createElement("label");
            lblNV.className="LblNV";
            lblNV.innerHTML=p;
            divNV.appendChild(lblNV);

            divVP=document.createElement("div");
            divVP.className="DivVP";
            divNV.appendChild(divVP);

            lblVrednost=document.createElement("label");
            lblVrednost.className="LblVrednost";
            lblVrednost.innerHTML="vrednost:";
            divVP.appendChild(lblVrednost);

            tbxVr=document.createElement("input");
            tbxVr.className="TbxVr";
            tbxVr.type="number";
            tbxVr.min="0";
            divVP.appendChild(tbxVr);
            if(p!="Vlakna"){
            lblProcenat=document.createElement("label");
            lblProcenat.className="LblProcenat";
            lblProcenat.innerHTML="procenti:";
            divVP.appendChild(lblProcenat);

            tbxP=document.createElement("input");
            tbxP.className="TbxP";
            tbxP.type="number";
            tbxP.min="0";
            tbxP.max="100";
            divVP.appendChild(tbxP);
            }

            lblObjasnjenje=document.createElement("label");
            lblObjasnjenje.className="LblObjasnjenje";
            lblObjasnjenje.innerHTML="objasnjenje:";
            divNV.appendChild(lblObjasnjenje);

            tbxO=document.createElement("input");
            tbxO.className="TbxO";
            tbxO.type="text";
            divNV.appendChild(tbxO);

        })

    }
    fetchZaPodTip(host,divPromena,klasa,idtip)
    {
        var stariSelect=divPromena.querySelector(".SelectPodTipLevoIzmeni");
        var stariSelect1=divPromena.querySelector(".SelectPodTipFilter");
        if(stariSelect!=null){
            var roditelj=stariSelect.parentNode;
            roditelj.removeChild(stariSelect);
        }
        if(stariSelect1!=null){
            var roditelj=stariSelect1.parentNode;
            roditelj.removeChild(stariSelect1);
        }
        var selectPodTip=document.createElement("select");
        selectPodTip.className=klasa;
        host.appendChild(selectPodTip);

        var op;
        fetch("https://localhost:5001/Podtip/PreuzmiPodtipove/"+idtip)
        .then(p=>{
            p.json().then(podtipovi=>{
                podtipovi.forEach(podtip=>{
                    op=document.createElement("option");
                    op.innerHTML=podtip.naziv;
                    op.value=podtip.id;
                    selectPodTip.appendChild(op);
                })
            })
        })
    }
}
