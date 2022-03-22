import { Jelo } from "./Jelo.js";
import { Tip } from "./Tip.js";
import {Saveti} from "./Saveti.js";
export class Kuvar{

    constructor(id,nazivKuvara,citat,logo) {
        this.id=id;
        this.nazivKuvara=nazivKuvara;
        this.citat=citat;
        this.logo=logo;
        this.Kontejner=null;
    }

    CrtajKuvara(host){
        if(!host){
            throw new Error("Host ne postoji!");
        }
        this.Kontejner=document.createElement("div");
        this.Kontejner.className="VelikiDiv";
        host.appendChild(this.Kontejner);

        let levidiv=document.createElement("div");
        levidiv.className="LeviDiv";
        this.Kontejner.appendChild(levidiv);

        let centardiv=document.createElement("div");
        centardiv.className="CentarDiv";
        this.Kontejner.appendChild(centardiv);

        let desnidiv=document.createElement("div");
        desnidiv.className="DesniDiv";
        this.Kontejner.appendChild(desnidiv);

        let levoslika=document.createElement("div");
        levoslika.className="LevoSlika";
        levidiv.appendChild(levoslika);

        var slika=document.createElement("img");
        slika.src="./Slike/"+this.logo;
        slika.alt=this.logo;
        slika.className="SlikaLogo";
        levoslika.appendChild(slika);

        var divBtnPocetna=document.createElement("div");
        divBtnPocetna.className="DivBtnPocetna";
        levidiv.appendChild(divBtnPocetna);

        var btnPocetna=document.createElement("button");
        btnPocetna.className="BtnPocetna";
        btnPocetna.innerHTML="⇦  Pocetna";
        btnPocetna.onclick=(ev)=>this.crtajInicijalniCentar(divRoditeljPromena,divRoditeljPromena.firstChild);
        divBtnPocetna.appendChild(btnPocetna);

        var leviodeljak=document.createElement("div");
        leviodeljak.className="LeviOdeljak";
        levidiv.appendChild(leviodeljak);


        //sadrzaj levog odeljka
        var lblT;
        fetch("https://localhost:5001/Tip/PreuzmiTip")
        .then(p=>{
            p.json().then(tipovi=>{
                tipovi.forEach(tip=>{
                    var t=new Tip(tip.id,tip.naziv);
                    lblT=document.createElement("label");
                    lblT.innerHTML=t.naziv;
                    lblT.className="LblT";
                    lblT.onclick=(ev)=>this.crtajRecepteTip(divRoditeljPromena,tip.id);
                    leviodeljak.appendChild(lblT);
                    var divP=document.createElement("div");
                    divP.className="DivP";
                    leviodeljak.appendChild(divP);

                   fetch("https://localhost:5001/Podtip/PreuzmiPodtipove/"+tip.id)
                    .then(p=>{
                        p.json().then(Podtipovi=>{
                            Podtipovi.forEach(podtip=>{
                                var lblP=document.createElement("label");
                                lblP.innerHTML="•"+podtip.naziv;
                                lblP.className="LblP";
                                lblP.onclick=(ev)=>this.crtajReceptePodTip(divRoditeljPromena,podtip.id);
                                divP.appendChild(lblP);
        
                            })
                        })
                    })
                });
            });
        });

        //centralni deo-head
        var divCitat=document.createElement("div");
        divCitat.className="DivCitat";
        centardiv.appendChild(divCitat);

        var lblCitat=document.createElement("label");
        lblCitat.className="LabelCitat";
        lblCitat.innerHTML="\""+this.citat+"\"";
        console.log(this.citat);
        divCitat.appendChild(lblCitat);
        
        var divPredloga=document.createElement("div");
        divPredloga.className="DivPredloga0";
        centardiv.appendChild(divPredloga);

        var divPredloga1=document.createElement("div");
        divPredloga1.className="DivPredloga1";
        divPredloga.appendChild(divPredloga1);

        var divPredloga2=document.createElement("div");
        divPredloga2.className="DivPredloga2";
        divPredloga.appendChild(divPredloga2);

        var divRoditeljPromena=document.createElement("div");
        divRoditeljPromena.className="DivRoditeljPromena";
        centardiv.appendChild(divRoditeljPromena);

        var divPromena=document.createElement("div");
        divPromena.className="DivPromena";
        divRoditeljPromena.appendChild(divPromena);

        var lblTip;
        fetch("https://localhost:5001/Tip/PreuzmiTip")
        .then(p=>{
            p.json().then(tipovi=>{
                tipovi.forEach(tip=>{
                    var t=new Tip(tip.id,tip.naziv);
                    lblTip=document.createElement("label");
                    lblTip.innerHTML=t.naziv;
                    lblTip.className="LblTip";
                    lblTip.onclick=(ev)=>this.crtajRecepteTip(divRoditeljPromena,tip.id);
                    divPredloga1.appendChild(lblTip);
                });
            });
        });

        var lblSaveti=document.createElement("label");
        lblSaveti.className="LblSaveti";
        lblSaveti.innerHTML="Saveti";
        lblSaveti.onclick=(ev)=>this.crtajSavete(divRoditeljPromena);
        divPredloga2.appendChild(lblSaveti);

        this.crtajInicijalniCentar(divRoditeljPromena,divPromena);

        //desni deo
        this.crtajDugmiceDodavanja(desnidiv,divRoditeljPromena);

        this.crtajDugmiceFiltriranja(desnidiv,divRoditeljPromena);

        var divBrzaPretraga=document.createElement("div");
        divBrzaPretraga.className="DivBrzaPretraga";
        desnidiv.appendChild(divBrzaPretraga);

        var divLinija0=document.createElement("div");
        divLinija0.className="DivLinija0";
        divBrzaPretraga.appendChild(divLinija0);

        var divPreuzmi1=document.createElement("div");
        divPreuzmi1.className="DivPreuzmi1";
        divBrzaPretraga.appendChild(divPreuzmi1);

        var divLinija1=document.createElement("div");
        divLinija1.className="DivLinija1";
        divBrzaPretraga.appendChild(divLinija1);

        this.crtajPreuzmi1(divPreuzmi1,divRoditeljPromena);

       var divPreuzmi2=document.createElement("div");
       divPreuzmi2.className="DivPreuzmi2";
       divBrzaPretraga.appendChild(divPreuzmi2);

       this.crtajPreuzmi2(divPreuzmi2,divRoditeljPromena);

       var divReklama=document.createElement("div");
       divReklama.className="DivReklama";
       desnidiv.appendChild(divReklama);

       this.crtajReklamu(divReklama);

    }
    crtajInicijalniCentar(host,hostdete){
        if(!host || !hostdete){
            throw new Exception("Nije dodeljen host!");
        }
        host.removeChild(hostdete);
        var divPromena=document.createElement("div");
        divPromena.className="DivPromena";
        host.appendChild(divPromena);

        var t;
        var lblTipPocetna;
        
    fetch("https://localhost:5001/Tip/PreuzmiTip")
    .then(p=>{
        p.json().then(tipovi=>{
            tipovi.forEach(tip=>{

               t=new Tip(tip.id,tip.naziv);
               lblTipPocetna=document.createElement("label");
               lblTipPocetna.innerHTML=t.naziv+"...";
               lblTipPocetna.className="LblTipPocetna";
               divPromena.appendChild(lblTipPocetna);

               var divRed=document.createElement("div");
               divRed.className="DivRed";
               divPromena.appendChild(divRed);

                    var k=0;
                    fetch("https://localhost:5001/Jelo/PreuzmiTipJela/"+this.id+"/"+tip.id)
                        .then(p=>{
                             p.json().then(jela=>{
                         jela.forEach(jelo=>{
                             console.log(jelo.sastojci_svi);
                        var obj=new Jelo(jelo.index,jelo.naziv,jelo.opis,jelo.vreme,jelo.broj_porcija,jelo.porcija_gram,jelo.postupak,
                        jelo.serviranje,jelo.slozenost_jela,jelo.bez_glutena,jelo.foreignKeyNV,jelo.savet,jelo.video,jelo.slika,jelo.sastojci_svi);
                        if(k<4){
                        obj.crtajPredlogRecept(this.id,divPromena,divRed,this.Kontejner);
                        }
                        k++;
                            })
                         })
                    })

                })
            })
        })
}
    crtajReklamu(host){
        if(!host){
            throw new Exception("Nije dodeljen host!");
        }
        var divReklama=document.createElement("div");
        divReklama.className="DivReklama";
        host.appendChild(divReklama);

        var lblReklama=document.createElement("label");
        lblReklama.innerHTML="💡 Svoj primerak kuvara mozete naruciti na adresi:";
        lblReklama.className="LblReklama";
        divReklama.appendChild(lblReklama);

        var divSlikaReklama=document.createElement("div");
        divSlikaReklama.className="DivSlikaReklama";
        divReklama.appendChild(divSlikaReklama);

        var slikaReklama=document.createElement("img");
        slikaReklama.src="./Slike/cookbook.png";
        slikaReklama.alt=this.slikaReklama;
        slikaReklama.className="SlikaReklama";
        divSlikaReklama.appendChild(slikaReklama);

        var lblReklamaKontakt=document.createElement("label");
        lblReklamaKontakt.className="LblReklamaKontakt";
        lblReklamaKontakt.innerHTML="narucikuvar@gmail.com";
        divReklama.appendChild(lblReklamaKontakt);
    }
    crtajDugmiceFiltriranja(host,divRoditeljPromena){
        if(!host){
            throw new Exception("Nije dodeljen host!");
        }
        var divNaprednaPretraga=document.createElement("div");
        divNaprednaPretraga.className="DivNaprednaPretraga";
        host.appendChild(divNaprednaPretraga);

        var lblNaprednaPretraga=document.createElement("label");
        lblNaprednaPretraga.className="LblNaprednaPretraga";
        lblNaprednaPretraga.innerHTML="• Napredna pretraga"
        divNaprednaPretraga.appendChild(lblNaprednaPretraga);

        var btnJelaBezGlutena=document.createElement("button");
        btnJelaBezGlutena.className="BtnJelaBezGlutena";
        btnJelaBezGlutena.innerHTML="🔍 Jela bez glutena";
        btnJelaBezGlutena.onclick=(ev)=>this.crtajJelaBezGlutena(divRoditeljPromena);
        divNaprednaPretraga.appendChild(btnJelaBezGlutena);

        var btnJelaSastojci=document.createElement("button");
        btnJelaSastojci.className="BtnJelaSastojci";
        btnJelaSastojci.innerHTML="Recepti sa sastojcima koje trenutno posedujete";
        btnJelaSastojci.onclick=(ev)=>this.crtajJelaSastojci(divRoditeljPromena);
        divNaprednaPretraga.appendChild(btnJelaSastojci);

        var btnDetaljnoFiltriranje=document.createElement("button");
        btnDetaljnoFiltriranje.className="BtnDetaljnoFiltriranje";
        btnDetaljnoFiltriranje.innerHTML="📎 Detaljno filtriranje";
        btnDetaljnoFiltriranje.onclick=(ev)=>this.crtajDetaljnoFiltriranje(divRoditeljPromena);
        divNaprednaPretraga.appendChild(btnDetaljnoFiltriranje);
    }
    crtajDugmiceDodavanja(host,divRoditeljPromena){
        if(!host){
            throw new Exception("Nije dodeljen host");
        }
        var divbtnDodaj=document.createElement("div");
        divbtnDodaj.className="DivBtnDodaj";
        host.appendChild(divbtnDodaj);

        var lblDodaj=document.createElement("label");
        lblDodaj.className="LblDodaj";
        lblDodaj.innerHTML="• Dodaj";
        divbtnDodaj.appendChild(lblDodaj);

        var btnDodajRecept=document.createElement("button");
        btnDodajRecept.className="BtnDodajRecept";
        btnDodajRecept.innerHTML="📄  Dodaj recept";
        btnDodajRecept.onclick=(ev)=>this.crtajCentarDodaj(divRoditeljPromena);
        divbtnDodaj.appendChild(btnDodajRecept);

        var btnDodajSavet=document.createElement("button");
        btnDodajSavet.className="BtnDodajSavet";
        btnDodajSavet.innerHTML="📝 Dodaj savet";
        btnDodajSavet.onclick=(ev)=>this.crtajCentarDodajSavet(divRoditeljPromena);
        divbtnDodaj.appendChild(btnDodajSavet);

    }
    crtajPreuzmi1(host,divRoditeljPromena){
        if(!host){
            throw new Exception("Nije dodeljen host!");
        }

        var lblPreuzmi1=document.createElement("label");
        lblPreuzmi1.className="LblPreuzmi1";
        lblPreuzmi1.innerHTML="Preuzmi recepte odredjenog tipa, vremena i slozenosti";
        host.appendChild(lblPreuzmi1);

        var divTip1=document.createElement("div");
        divTip1.className="DivTip1";
        host.appendChild(divTip1);

        var lblTip1=document.createElement("label");
        lblTip1.className="LblTip1";
        lblTip1.innerHTML="Tip:";
        divTip1.appendChild(lblTip1);

        this.fetchZaTip(divTip1,"SelectTip1");

       var divVreme1=document.createElement("div");
       divVreme1.className="DivVreme1";
       host.appendChild(divVreme1);

       var lblVreme1=document.createElement("label");
       lblVreme1.className="lblVreme1";
       lblVreme1.innerHTML="Vreme (min):";
       divVreme1.appendChild(lblVreme1);

       var txbVreme1=document.createElement("input");
       txbVreme1.type="number";
       txbVreme1.min="0";
       txbVreme1.max="120";
       txbVreme1.className="TxbVreme1";
       divVreme1.appendChild(txbVreme1);

       var divSlozenost1=document.createElement("div");
       divSlozenost1.className="DivSlozenost1";
       host.appendChild(divSlozenost1);

       var lblSlozenost1=document.createElement("label");
       lblSlozenost1.className="LblSlozenost1";
       lblSlozenost1.innerHTML="Slozenost:";
       divSlozenost1.appendChild(lblSlozenost1);

       var selectSlozenost1=document.createElement("select");
       selectSlozenost1.className="SelectSlozenost1";
       divSlozenost1.appendChild(selectSlozenost1);

       var option;
       fetch("https://localhost:5001/Slozenost/PreuzmiSlozenost")
       .then(p=>{
           p.json().then(slozenosti=>{
               slozenosti.forEach(slozenost=>{
               option=document.createElement("option");
               option.innerHTML=slozenost.naziv;
               option.value=slozenost.id;
               selectSlozenost1.appendChild(option);       
               })
           })
       });

       var divBtnP1=document.createElement("div");
       divBtnP1.className="DivBtnP1";
       host.appendChild(divBtnP1);

       var btnPretrazi1=document.createElement("button");
       btnPretrazi1.className="BtnPretrazi1";
       btnPretrazi1.innerHTML="Pretrazi";
       btnPretrazi1.onclick=(ev)=>this.crtajPretrazi1(divRoditeljPromena);
       divBtnP1.appendChild(btnPretrazi1);
    }
    crtajPreuzmi2(host,divRoditeljPromena){
        if(!host){
            throw new Exception("Nije dodeljen host!");
        }
        var divNaslov2=document.createElement("div");
       divNaslov2.className="DivNaslov2";
       host.appendChild(divNaslov2);

       var lblPreuzmi2=document.createElement("label");
       lblPreuzmi2.className="LblPreuzmi2";
       lblPreuzmi2.innerHTML="Preuzmi jela odredjenog tipa i broja porcija";
       divNaslov2.appendChild(lblPreuzmi2);

       var divTip2=document.createElement("div");
       divTip2.className="DivTip2";
       host.appendChild(divTip2);

       var lblTip2=document.createElement("label");
       lblTip2.className="LblTip2";
       lblTip2.innerHTML="Tip:"
       divTip2.appendChild(lblTip2);

       this.fetchZaTip(divTip2,"SelectTip2");

       var divBrPorcija2=document.createElement("div");
       divBrPorcija2.className="DivBrPorcija2";
       host.appendChild(divBrPorcija2);

       var lblBrPorcija2=document.createElement("label");
       lblBrPorcija2.className="LblBrProcija2";
       lblBrPorcija2.innerHTML="Broj procija (1-16):";
       divBrPorcija2.appendChild(lblBrPorcija2);

       var txbBrPorcija2=document.createElement("input");
       txbBrPorcija2.type="number";
       txbBrPorcija2.min="1";
       txbBrPorcija2.max="16";
       txbBrPorcija2.className="TxbBrPorcija2";
       divBrPorcija2.appendChild(txbBrPorcija2);

       var divBtnP2=document.createElement("div");
       divBtnP2.className="DivBtnP2";
       host.appendChild(divBtnP2);

       var btnPretrazi2=document.createElement("button");
       btnPretrazi2.className="BtnPretrazi2";
       btnPretrazi2.innerHTML="Pretrazi";
       btnPretrazi2.onclick=(ev)=>this.crtajPretrazi2(divRoditeljPromena);
       divBtnP2.appendChild(btnPretrazi2);

       var divLinija2=document.createElement("div");
       divLinija2.className="DivLinija2";
       host.appendChild(divLinija2);
    }

    //DORADA
    crtajCentarDodaj(host)
    {
        if(!host){
            throw new Exception("Nema dodeljenu povrsinu!"); 
        }
        var divPromena
        var p=host.querySelector(".DivPromena");
        if(p!==null)
        {
            var roditelj=p.parentNode;
            roditelj.removeChild(p);
            divPromena=document.createElement("div");
            host.appendChild(divPromena);
            divPromena.className="DivPromena";
        }

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
        divNazivJela.appendChild(tbxNazivJela);

        var divTipJela=document.createElement("div");
        divTipJela.className="DivTipJela";
        levoDiv.appendChild(divTipJela);

        var lblTipJela=document.createElement("label");
        lblTipJela.className="LblTipJela";
        lblTipJela.innerHTML="Tip:";
        divTipJela.appendChild(lblTipJela);

        this.fetchZaTip(divTipJela,"SelectLevoDodaj");

       var btnPotvrdi=document.createElement("button");
       btnPotvrdi.innerHTML="POTVRDI!";
       btnPotvrdi.className="DugmePotvrdi";
       btnPotvrdi.onclick=(ev)=>this.potvrdi();
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
        divOpis.appendChild(tarOpis);
//////
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
       fetch("https://localhost:5001/Pice/PreuzmiPica/"+this.id)
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

       //var listaBtn=[];
       var btnSastojciOpsirnije=document.createElement("button");
       btnSastojciOpsirnije.className="BtnSastojciOpsirnije";
       btnSastojciOpsirnije.innerHTML="KLIKNI DA UNESEŠ SASTOJKE";
       btnSastojciOpsirnije.onclick=(ev)=>{
           const divSaSastojcima=document.createElement("div");
           divSaSastojcima.className="DivSaSastojcima";
           this.Kontejner.appendChild(divSaSastojcima);
           this.crtajIzborSastojaka(divSaSastojcima,divSastojciIzbor);
       }
       //console.log(listaBtn);
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
       btnDodaj.innerHTML="DODAJ";
       btnDodaj.className="DugmeDodaj";
       btnDodaj.onclick=(ev)=>this.pokupiVrednostiDodaj(host);
       divDugmeDodaj.appendChild(btnDodaj);

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
        //var listared=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"];
        var i=0;
        btnDugmeDodaj.onclick=(ev)=>{

            var par=divSaSastojcima.parentNode;
            par.removeChild(divSaSastojcima);

            
            if(divSastojciIzbor.hasChildNodes()){
                while(divSastojciIzbor.firstChild){
                    divSastojciIzbor.removeChild(divSastojciIzbor.firstChild);
                }
            }
             
            /*var roditelj=divSastojciIzbor.parentNode;
            roditelj.removeChild(divSastojciIzbor);
            var divSastojciIzbor=document.createElement("div");
            divSastojciIzbor.className="DivSastojciIzbor";
            roditelj.appendChild(divSastojciIzbor);*/

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
    potvrdi(){
        var idtip=this.Kontejner.querySelector(".SelectLevoDodaj");
        var opt=idtip.options[idtip.selectedIndex].value;
        this.fetchZaPodTip(this.Kontejner.querySelector(".DivPodTipJela"),"SelectPodTipLevo",opt);
    }
    potvrdiFilter(){
        var idtip=this.Kontejner.querySelector(".SelectTipFilter");
        var opt=idtip.options[idtip.selectedIndex].value;
        this.fetchZaPodTip(this.Kontejner.querySelector(".DivPodTipFilter"),"SelectPodTipFilter",opt);
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
    pokupiVrednostiDodaj(host){
        var nazivJela=this.Kontejner.querySelector(".TbxNazivJela").value;
        var tipJela=this.Kontejner.querySelector(".SelectLevoDodaj");
        var tip=tipJela.options[tipJela.selectedIndex].value;
        var podtipJela=this.Kontejner.querySelector(".SelectPodTipLevo");
        var podtip=podtipJela.options[podtipJela.selectedIndex].value;
        var opis=this.Kontejner.querySelector(".TarOpis").value;
        var slozenost=this.Kontejner.querySelector(".SelectSlozenost");
        var s=slozenost.options[slozenost.selectedIndex].value;
        var vreme=this.Kontejner.querySelector(".TbxVremeIzrade").value;
        var brporcija=this.Kontejner.querySelector(".TbxBrPorcija").value;
        var gramaza=this.Kontejner.querySelector(".TbxGrPorcije").value;
        var gluten=this.Kontejner.querySelector('input[name="rbt"]:checked');
        var g;
        if(gluten.value==="da"){
            g=true;
        }
        else{
            g=false;
        }
        var piceJelo=this.Kontejner.querySelector(".SelectPreporucenoPice");
        console.log(piceJelo);
        var pice=piceJelo.options[piceJelo.selectedIndex].value;
        var savet=this.Kontejner.querySelector(".TarSavet").value;
        var video=this.Kontejner.querySelector(".TbxVideo").value;
        var slika=this.Kontejner.querySelector(".TbxSlika").value;
        var serviranje=this.Kontejner.querySelector(".TxtServiranje").value;
        var postupak=this.Kontejner.querySelector(".TxtAreaPostupak").value;

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
        var sastojci=this.Kontejner.querySelectorAll(".lblsas");
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
        var kol=this.Kontejner.querySelectorAll(".TbxS");
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
        var jedinica=this.Kontejner.querySelectorAll(".selsas");
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

        var vrednosti=this.Kontejner.querySelectorAll(".TbxVr");
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
        var procenti=this.Kontejner.querySelectorAll(".TbxP");
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
        var objasnjenja=this.Kontejner.querySelectorAll(".TbxO");
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

        fetch("https://localhost:5001/Jelo/DodajRecept/"+this.id+"/"+ulaznistr+"/"+podtip+"/"+s+"/"+pice+"/"+NutrVr+"/"+NutrProc+"/"+NutrObj+"/"+Sastojci+"/"+Kolicina+"/"+Jedinica,
        {method:"POST"})
        .then(j=>{
            if(j.ok){
                alert("Recept uspesno dodat!");
                this.crtajReceptePodTip(host, podtip);
            }
            /*else{
                s.text().then(
                    p=>{alert(p);}
                )
            }*/
        })
        
    }

    crtajCentarDodajSavet(host)
    {
        if(!host){
            throw new Exception("Nedodeljen host!");
        }
        var divPromena;
        var p=host.querySelector(".DivPromena");
        if(p!=null)
        {
            var roditelj=p.parentNode;
            roditelj.removeChild(p);
            divPromena=document.createElement("div");
            host.appendChild(divPromena);
            divPromena.className="DivPromena";
        }
        var podloga0=document.createElement("div");
        podloga0.className="PodlogaSavet";
        divPromena.appendChild(podloga0);

        var divNaslovSaveta=document.createElement("div");
        divNaslovSaveta.className="DivNaslovSaveta";
        podloga0.appendChild(divNaslovSaveta);

        var lblNaslovSaveta=document.createElement("label");
        lblNaslovSaveta.className="LblNaslovSaveta";
        lblNaslovSaveta.innerHTML="Naslov saveta:";
        divNaslovSaveta.appendChild(lblNaslovSaveta);

        var txbNaslovSaveta=document.createElement("input");
        txbNaslovSaveta.type="text";
        txbNaslovSaveta.className="TbxNaslovSaveta";
        divNaslovSaveta.appendChild(txbNaslovSaveta);

        var divTekstSaveta=document.createElement("div");
        divTekstSaveta.className="DivTekstSaveta";
        podloga0.appendChild(divTekstSaveta);

        var lblTekstSaveta=document.createElement("label");
        lblTekstSaveta.className="LblTekstSaveta";
        lblTekstSaveta.innerHTML="Tekst";
        divTekstSaveta.appendChild(lblTekstSaveta);

        var tarTekstSaveta=document.createElement("textarea");
        tarTekstSaveta.className="TraTekstSaveta";
        tarTekstSaveta.name="post";
        tarTekstSaveta.cols="100";
        tarTekstSaveta.rows="40";
        divTekstSaveta.appendChild(tarTekstSaveta);

        var divSlikaSaveta=document.createElement("div");
        divSlikaSaveta.className="DivSilkaSaveta";
        podloga0.appendChild(divSlikaSaveta);

        var lblSlikaSaveta=document.createElement("label");
        lblSlikaSaveta.className="LblSlikaSaveta";
        lblSlikaSaveta.innerHTML="Slika:";
        divSlikaSaveta.appendChild(lblSlikaSaveta);

        var txbSlikaSaveta=document.createElement("input");
        txbSlikaSaveta.type="text";
        txbSlikaSaveta.className="TbxSlikaSaveta";
        divSlikaSaveta.appendChild(txbSlikaSaveta);

        var divDugmeDodajSavet=document.createElement("div");
        divDugmeDodajSavet.className="divDugmeDodajSavet";
        podloga0.appendChild(divDugmeDodajSavet);

        var dugmeDodajSavet=document.createElement("button");
        dugmeDodajSavet.className="DugmeDodajSavet";
        dugmeDodajSavet.innerHTML="DODAJ";
        dugmeDodajSavet.onclick=(ev)=>this.upisiSavet(host,txbNaslovSaveta.value,tarTekstSaveta.value,txbSlikaSaveta.value);
        divDugmeDodajSavet.appendChild(dugmeDodajSavet);


    }
    upisiSavet(host,naslov,tekst,slika){
        if(naslov===null || naslov===undefined || naslov===""){
            alert("Unesite naslov saveta!");
            return;
        }
        if(tekst===null || tekst===undefined || tekst===""){
            alert("Unesite tekst saveta!");
            return;
        }
        if(slika===null || slika===undefined || slika===""){
            alert("Unesite sliku!");
            return;
        }

        fetch("https://localhost:5001/Saveti/DodajSavet/"+this.id+"/"+naslov+"/"+tekst+"/"+ slika,{
            method:"POST"
        }).then(s=>{
            console.log(s);
            if(s.ok){
                alert("Savet uspesno dodat!");
                this.crtajSavete(host);
            }
            else{
                s.text().then(
                    p=>{alert(p);}
                )
            }
        })
    }
    crtajJelaSastojci(host)
    {
        if(!host){
            throw new Exception("Nije dodeljen host");
        }

        var divPromena;
        var p=host.querySelector(".DivPromena");
        if(p!==null)
        {
            var roditelj=p.parentNode;
            roditelj.removeChild(p);
            divPromena=document.createElement("div");
            host.appendChild(divPromena);
            divPromena.className="DivPromena";
        }

        var podloga0=document.createElement("div");
        podloga0.className="Podloga0";
        divPromena.appendChild(podloga0);

        var divTipJeloSastojak=document.createElement("div");
        divTipJeloSastojak.className="DivTipJeloSastojak";
        podloga0.appendChild(divTipJeloSastojak);

        var lblTipJeloSastojak=document.createElement("label");
        lblTipJeloSastojak.className="LblTipJeloSastojak";
        lblTipJeloSastojak.innerHTML="Tip jela koji pretrazujete:";
        divTipJeloSastojak.appendChild(lblTipJeloSastojak);
        
        this.fetchZaTip(divTipJeloSastojak,"SelectTipJeloSastojak");

        var divNaslovSastojak=document.createElement("div");
        divNaslovSastojak.className="DivNaslovSastojak";
        podloga0.appendChild(divNaslovSastojak);

        var lblNaslovSastojak=document.createElement("label");
        lblNaslovSastojak.className="LblNaslovSastojak";
        lblNaslovSastojak.innerHTML="Izaberite sastojke";
        divNaslovSastojak.appendChild(lblNaslovSastojak);

        var divSastojciPretraga=document.createElement("div");
        divSastojciPretraga.className="DivSastojciPretraga";
        podloga0.appendChild(divSastojciPretraga);

        var k=0;
        var div;
        var listaBtn=[];
        fetch("https://localhost:5001/Sastojak/Preuzmi",
        {method:"GET"})
        .then(s=>{
            s.json().then(sastojci=>{
                sastojci.forEach(sastojak=>{
                    var btn=document.createElement("button");
                    btn.classList.add("btnSastojakPretraga");
                    btn.innerHTML=sastojak.naziv;
                    btn.value="notSelected";

                    if(k%5===0){
                        div=document.createElement("div");
                        div.className="DivSastojciP";
                        divSastojciPretraga.appendChild(div);
                        div.appendChild(btn);
                    }
                    else{
                    div.appendChild(btn);
                    }
                    k++;
                    btn.onclick=(ev)=>{
                        if(btn.value==="notSelected"){
                            btn.classList.add("btnSastojakPretragaSel");
                            btn.value="Selected";
                            listaBtn.push(btn.innerHTML);
                            console.log(btn.innerHTML);
                        }
                        else if(btn.value==="Selected"){
                            btn.classList.remove("btnSastojakPretragaSel");
                            btn.value="notSelected";
                            listaBtn=listaBtn.filter(function(value){
                                return value!=btn.innerHTML;
                            });
                            console.log(listaBtn);
                        }
                    }
                })
            })
        })
        var divBtnPretrazi=document.createElement("div");
        divBtnPretrazi.className="DivBtnPretrazi";
        podloga0.appendChild(divBtnPretrazi);

        var btnPretrazi=document.createElement("button");
        btnPretrazi.className="BtnPretrazi";
        btnPretrazi.innerHTML="PRETRAŽI";
        btnPretrazi.onclick=(ev)=>this.crtajJelaSaSastojcima(host,this.id,listaBtn);
        divBtnPretrazi.appendChild(btnPretrazi);

    }
    crtajJelaSaSastojcima(host,kuvarid,listaBtn){

        var pom=this.Kontejner.querySelector(".SelectTipJeloSastojak");
        console.log(pom);
        var tip=pom.options[pom.selectedIndex].value;

        if(!host){
            throw new Exception("Host nije dodeljen!");
        }
        var divPromena;
        var p=host.querySelector(".DivPromena");
        if(p!==null){
    
        var roditelj=p.parentNode;
        roditelj.removeChild(p);
        divPromena=document.createElement("div");
        host.appendChild(divPromena);
        divPromena.className="DivPromena";
    
        }
        var podloga=document.createElement("div");
        podloga.className="Podloga";
        divPromena.appendChild(podloga);

        var post;
        var ok=true;
        post=encodeURI("https://localhost:5001/Jelo/IzdvojJelaSaDatimSastojcima/"
        +kuvarid+"/"+tip+"?");
        var duz=listaBtn.length;
        console.log(duz);
        var p=0;
        listaBtn.forEach((btn)=>{
            p++;
            post+="nSastojci="+btn;
            if(p!=duz){
            post+="&"
            }
        });
        console.log(post);
        var k=0;
        var divRed;
        fetch(post,
        {method:"GET"})
        .then(p=>{
            if(p.ok){
            p.json().then(jela=>{
                jela.forEach(jelo=>{
                    var obj=new Jelo(jelo.index,jelo.naziv,jelo.opis,jelo.vreme,jelo.broj_porcija,jelo.porcija_gram,jelo.postupak,
                        jelo.serviranje,jelo.slozenost_jela,jelo.bez_glutena,jelo.foreignKeyNV,jelo.savet,jelo.video,jelo.slika,jelo.sastojci_svi);
    
                        if(k%4==0){
    
                        divRed=document.createElement("div");
                        divRed.className="DivRed";
                        podloga.appendChild(divRed);
    
                        obj.crtajPredlogRecept(this.id,podloga,divRed,this.Kontejner);
                        }
                        else{
                        obj.crtajPredlogRecept(this.id,podloga,divRed,this.Kontejner);
                        }
                        k++;
                 })
             })
            }
            else{
                alert("Jelo sa trazenim sastojcima ne postoji!");
                this.crtajJelaSastojci(host)
            }
            })
    }
    crtajDetaljnoFiltriranje(host)
    {
        if(!host){
            throw new Exception("Nije dodeljen host!");
        }
        var divPromena;
        var p=host.querySelector(".DivPromena");
        if(p!==null){

            var roditelj=p.parentNode;
            roditelj.removeChild(p);
            divPromena=document.createElement("div");
            host.appendChild(divPromena);
            divPromena.className="DivPromena";
        }

        var podlogaFilter=document.createElement("div");
        podlogaFilter.className="PodlogaFilter";
        divPromena.appendChild(podlogaFilter);
        
        var divTipFilter=document.createElement("div");
        divTipFilter.className="DivTipFilter";
        podlogaFilter.appendChild(divTipFilter);

        var lblTipFilter=document.createElement("label");
        lblTipFilter.className="LblTipFilter";
        lblTipFilter.innerHTML="Tip:";
        divTipFilter.appendChild(lblTipFilter);

        this.fetchZaTip(divTipFilter,"SelectTipFilter");

        var divPodTipFilter=document.createElement("div");
        divPodTipFilter.className="DivPodTipFilter";
        podlogaFilter.appendChild(divPodTipFilter);

        var lblPodTipFilter=document.createElement("label");
        lblPodTipFilter.className="LblTipFilter";
        lblPodTipFilter.innerHTML="Podtip:";
        divPodTipFilter.appendChild(lblPodTipFilter);
        
        var btnPotvrdi=document.createElement("button");
       btnPotvrdi.innerHTML="POTVRDI!";
       btnPotvrdi.className="DugmePotvrdi";
       btnPotvrdi.onclick=(ev)=>this.potvrdiFilter();
       divTipFilter.appendChild(btnPotvrdi);

        var divVremeFilter=document.createElement("div");
        divVremeFilter.className="DivVremeFilter";
        podlogaFilter.appendChild(divVremeFilter);

       var lblVremeFilter=document.createElement("label");
       lblVremeFilter.className="lblVremeFilter";
       lblVremeFilter.innerHTML="Vreme (min):";
       divVremeFilter.appendChild(lblVremeFilter);

       var txbVremeFilter=document.createElement("input");
       txbVremeFilter.type="number";
       txbVremeFilter.min="0";
       txbVremeFilter.max="120";
       txbVremeFilter.className="TxbVremeFilter";
       divVremeFilter.appendChild(txbVremeFilter);

       var divBrPorcijaFilter=document.createElement("div");
       divBrPorcijaFilter.className="DivBrPorcijaFilter";
       podlogaFilter.appendChild(divBrPorcijaFilter);

       var lblBrPorcijaFilter=document.createElement("label");
       lblBrPorcijaFilter.className="LblBrProcijaFilter";
       lblBrPorcijaFilter.innerHTML="Broj procija (1-16):";
       divBrPorcijaFilter.appendChild(lblBrPorcijaFilter);

       var txbBrPorcijaFilter=document.createElement("input");
       txbBrPorcijaFilter.type="number";
       txbBrPorcijaFilter.min="1";
       txbBrPorcijaFilter.max="16";
       txbBrPorcijaFilter.className="TxbBrPorcijaFilter";
       divBrPorcijaFilter.appendChild(txbBrPorcijaFilter);

       var divSlozenostFilter=document.createElement("div");
       divSlozenostFilter.className="DivSlozenostFilter";
       podlogaFilter.appendChild(divSlozenostFilter);

       var lblSlozenostFilter=document.createElement("label");
       lblSlozenostFilter.className="LblSlozenostFilter";
       lblSlozenostFilter.innerHTML="Slozenost:";
       divSlozenostFilter.appendChild(lblSlozenostFilter);

       var selectSlozenostFilter=document.createElement("select");
       selectSlozenostFilter.className="SelectSlozenostFilter";
       divSlozenostFilter.appendChild(selectSlozenostFilter);

       var option;
       fetch("https://localhost:5001/Slozenost/PreuzmiSlozenost")
       .then(p=>{
           p.json().then(slozenosti=>{
               slozenosti.forEach(slozenost=>{
               option=document.createElement("option");
               option.innerHTML=slozenost.naziv;
               option.value=slozenost.id;
               selectSlozenostFilter.appendChild(option);       
               })
           })
       });

       var divDugmeFilter=document.createElement("div");
       divDugmeFilter.className="DivDugmeFilter";
       podlogaFilter.appendChild(divDugmeFilter);

       var btnDugmeFilter=document.createElement("button");
       btnDugmeFilter.className="DugmeFilter";
       btnDugmeFilter.innerHTML="PRETRAZI";
       btnDugmeFilter.onclick=(ev)=>this.pretraziDetaljnoFiltriranje(host);
       divDugmeFilter.appendChild(btnDugmeFilter);


    }
    pretraziDetaljnoFiltriranje(host){
        var podtipJela=this.Kontejner.querySelector(".SelectPodTipFilter");
        var podtipJelaID=podtipJela.options[podtipJela.selectedIndex].value;
        var vreme=this.Kontejner.querySelector(".TxbVremeFilter").value;
        var brPorcija=this.Kontejner.querySelector(".TxbBrPorcijaFilter").value;
        var slozenostJela=this.Kontejner.querySelector(".SelectSlozenostFilter");
        var slozenostJelaID=slozenostJela.options[slozenostJela.selectedIndex].value;

        if(!host){
            throw new Exception("Host nije dodeljen!");
        }
        var divPromena;
        var p=host.querySelector(".DivPromena");
        if(p!==null){

        var roditelj=p.parentNode;
        roditelj.removeChild(p);
        divPromena=document.createElement("div");
        host.appendChild(divPromena);
        divPromena.className="DivPromena";
        }
        var podloga=document.createElement("div");
        podloga.className="Podloga";
        divPromena.appendChild(podloga);

        var divRed;
        var k=0;
        fetch("https://localhost:5001/Jelo/Izfiltriraj/"+this.id+"/"+podtipJelaID+"/"+vreme+"/"+brPorcija+"/"+slozenostJelaID)
        .then(p=>{
            if(p.ok){
            p.json().then(jela=>{
                jela.forEach(jelo=>{
                    var obj=new Jelo(jelo.index,jelo.naziv,jelo.opis,jelo.vreme,jelo.broj_porcija,jelo.porcija_gram,jelo.postupak,
                        jelo.serviranje,jelo.slozenost_jela,jelo.bez_glutena,jelo.foreignKeyNV,jelo.savet,jelo.video,jelo.slika,jelo.sastojci_svi);
                        //listaJelaTipa.push(obj);
                        if(k%4==0){
                        
                        divRed=document.createElement("div");
                        divRed.className="DivRed";
                        podloga.appendChild(divRed);

                        obj.crtajPredlogRecept(this.id,podloga,divRed,this.Kontejner);
                        }
                        else{
                        obj.crtajPredlogRecept(this.id,podloga,divRed,this.Kontejner);
                        }
                        k++;
                 })
             })
            }
            else{
                alert("Jela sa naznacenim filterom ne postoje! Pokusajte ponovo");
                this.crtajDetaljnoFiltriranje(host);
            }
         })
    }
    crtajRecepteTip(host,idtip){

        if(!host){
            throw new Exception("Host nije dodeljen!");
        }
        var divPromena;
        var p=host.querySelector(".DivPromena");
        if(p!==null){

        var roditelj=p.parentNode;
        roditelj.removeChild(p);
        divPromena=document.createElement("div");
        host.appendChild(divPromena);
        divPromena.className="DivPromena";
        }
        var podloga=document.createElement("div");
        podloga.className="Podloga";
        divPromena.appendChild(podloga);

        //var listaJelaTipa=[];
        var divRed;
        var k=0;
        fetch("https://localhost:5001/Jelo/PreuzmiTipJela/"+this.id+"/"+idtip)
        .then(p=>{
            p.json().then(jela=>{
                jela.forEach(jelo=>{
                    var obj=new Jelo(jelo.index,jelo.naziv,jelo.opis,jelo.vreme,jelo.broj_porcija,jelo.porcija_gram,jelo.postupak,
                        jelo.serviranje,jelo.slozenost_jela,jelo.bez_glutena,jelo.foreignKeyNV,jelo.savet,jelo.video,jelo.slika,jelo.sastojci_svi);
                        //listaJelaTipa.push(obj);
                        if(k%4==0){
                        
                        divRed=document.createElement("div");
                        divRed.className="DivRed";
                        podloga.appendChild(divRed);

                        obj.crtajPredlogRecept(this.id,podloga,divRed,this.Kontejner);
                        }
                        else{
                        obj.crtajPredlogRecept(this.id,podloga,divRed,this.Kontejner);
                        }
                        k++;
                 })
             })
         })
        
        
}
crtajReceptePodTip(host, podtipid)
{
    if(!host){
        throw new Exception("Host nije dodeljen!");
    }
    var divPromena;
    var p=host.querySelector(".DivPromena");
    if(p!==null){

    var roditelj=p.parentNode;
    roditelj.removeChild(p);
    divPromena=document.createElement("div");
    host.appendChild(divPromena);
    divPromena.className="DivPromena";
    }

    var podloga=document.createElement("div");
    podloga.className="Podloga";
    divPromena.appendChild(podloga);
  
    var divRed;
    var k=0;
    fetch("https://localhost:5001/Jelo/PreuzmiPodtip/"+this.id+"/"+podtipid)
    .then(p=>{
        p.json().then(jela=>{
            jela.forEach(jelo=>{
                var obj=new Jelo(jelo.index,jelo.naziv,jelo.opis,jelo.vreme,jelo.broj_porcija,jelo.porcija_gram,jelo.postupak,
                    jelo.serviranje,jelo.slozenost_jela,jelo.bez_glutena,jelo.foreignKeyNV,jelo.savet,jelo.video,jelo.slika,jelo.sastojci_svi);
                    //listaJelaTipa.push(obj);
                    if(k%4==0){
                    
                    divRed=document.createElement("div");
                    divRed.className="DivRed";
                    podloga.appendChild(divRed);

                    obj.crtajPredlogRecept(this.id,podloga,divRed,this.Kontejner);
                    }
                    else{
                    obj.crtajPredlogRecept(this.id,podloga,divRed,this.Kontejner);
                    }
                    k++;
             })
         })
        })
    
}
crtajSavete(host){
    if(!host){
        throw new Exception("Host nije dodeljen!");
    }
    var divPromena;
    var p=host.querySelector(".DivPromena");
    if(p!==null){

    var roditelj=p.parentNode;
    roditelj.removeChild(p);
    divPromena=document.createElement("div");
    host.appendChild(divPromena);
    divPromena.className="DivPromena";


    var podloga=document.createElement("div");
    podloga.className="Podloga";
    divPromena.appendChild(podloga);
    }
    var divRed;
    var k=0;
    fetch("https://localhost:5001/Saveti/PrikaziSavete/"+this.id)
    .then(p=>{
        p.json().then(saveti=>{
            saveti.forEach(savet=>{
                var obj=new Saveti(savet.id,savet.naslov,savet.tekst,savet.slika);
                    if(k%4==0){
                    
                    divRed=document.createElement("div");
                    divRed.className="DivRed";
                    podloga.appendChild(divRed);

                    obj.crtajPredlogSavet(this.id,podloga,divRed);
                    }
                    else{
                    obj.crtajPredlogSavet(this.id,podloga,divRed);
                    }
                    k++;
             })
         })
        })
    }
    crtajJelaBezGlutena(host){
        if(!host){
            throw new Exception("Host nije dodeljen!");
        }
        var divPromena;
        var p=host.querySelector(".DivPromena");
        if(p!==null){
    
        var roditelj=p.parentNode;
        roditelj.removeChild(p);
        divPromena=document.createElement("div");
        divPromena.className="DivPromena";
        host.appendChild(divPromena);
    
        }
        var podloga=document.createElement("div");
        podloga.className="Podloga";
        divPromena.appendChild(podloga);
    
    var divRed;
    var k=0;
    fetch("https://localhost:5001/Jelo/PreuzmiJelaBezGlutena/"+this.id)
    .then(p=>{
        p.json().then(jela=>{
            jela.forEach(jelo=>{
                var obj=new Jelo(jelo.index,jelo.naziv,jelo.opis,jelo.vreme,jelo.broj_porcija,jelo.porcija_gram,jelo.postupak,
                    jelo.serviranje,jelo.slozenost_jela,jelo.bez_glutena,jelo.foreignKeyNV,jelo.savet,jelo.video,jelo.slika,jelo.sastojci_svi);

                    if(k%4==0){

                    divRed=document.createElement("div");
                    divRed.className="DivRed";
                    podloga.appendChild(divRed);

                    obj.crtajPredlogRecept(this.id,podloga,divRed,this.Kontejner);
                    }
                    else{
                    obj.crtajPredlogRecept(this.id,podloga,divRed,this.Kontejner);
                    }
                    k++;
             })
         })
        })


    }
    crtajPretrazi1(host){

        if(!host){
            throw new Exception("Host nije dodeljen!");
        }
        var divPromena;
        var p=host.querySelector(".DivPromena");
        if(p!==null){
    
        var roditelj=p.parentNode;
        roditelj.removeChild(p);
        divPromena=document.createElement("div");
        host.appendChild(divPromena);
        divPromena.className="DivPromena";
    
        }
        var podloga=document.createElement("div");
        podloga.className="Podloga";
        divPromena.appendChild(podloga);

       var optEl=this.Kontejner.querySelector(".SelectTip1");
       console.log(optEl);

       var tip=optEl.options[optEl.selectedIndex].value;
    
       var vr=this.Kontejner.querySelector(".TxbVreme1");
       var vreme=vr.value;

       var optsl=this.Kontejner.querySelector(".SelectSlozenost1");
       var slozenost=optsl.options[optsl.selectedIndex].value;
       console.log(slozenost);

    var k=0;
    var divRed;
        fetch("https://localhost:5001/Jelo/PreuzmiJeloVremeSlozenost/"+this.id+"/"+tip+"/"+vreme+"/"+slozenost)
        .then(p=>{
            p.json().then(jela=>{
                jela.forEach(jelo=>{
                    var obj=new Jelo(jelo.index,jelo.naziv,jelo.opis,jelo.vreme,jelo.broj_porcija,jelo.porcija_gram,jelo.postupak,
                        jelo.serviranje,jelo.slozenost_jela,jelo.bez_glutena,jelo.foreignKeyNV,jelo.savet,jelo.video,jelo.slika,jelo.sastojci_svi);
    
                        if(k%4==0){
    
                        divRed=document.createElement("div");
                        divRed.className="DivRed";
                        podloga.appendChild(divRed);
    
                        obj.crtajPredlogRecept(this.id,podloga,divRed,this.Kontejner);
                        }
                        else{
                        obj.crtajPredlogRecept(this.id,podloga,divRed,this.Kontejner);
                        }
                        k++;
                 })
             })
            })
            var pom=this.Kontejner.querySelector(".TxbVreme1").value="";
            var sel=this.Kontejner.querySelector(".SelectTip1").selectedIndex=0;
            var sel1=this.Kontejner.querySelector(".SelectSlozenost1").selectedIndex=0;
            var pom=this.Kontejner.querySelector(".TxbBrPorcija2").value="";
            var se2=this.Kontejner.querySelector(".SelectTip2").selectedIndex=0;
    }

    crtajPretrazi2(host){
        if(!host)
        throw new Exception("Nije dodeljen host!");

        var divPromena;
        var p=host.querySelector(".DivPromena");
        if(p!==null){
    
        var roditelj=p.parentNode;
        roditelj.removeChild(p);
        divPromena=document.createElement("div");
        host.appendChild(divPromena);
        divPromena.className="DivPromena";
    
        }
        var podloga=document.createElement("div");
        podloga.className="Podloga";
        divPromena.appendChild(podloga);

        var optEl=this.Kontejner.querySelector(".SelectTip2");
        var opTip=optEl.options[optEl.selectedIndex].value;

        var brPor=this.Kontejner.querySelector(".TxbBrPorcija2").value;

        var k=0;
        var divRed;
        fetch("https://localhost:5001/Jelo/PreuzmiJeloBrojPorcija/"+this.id+"/"+opTip+"/"+brPor)
        .then(p=>{
            p.json().then(jela=>{
                jela.forEach(jelo=>{
                    var obj=new Jelo(jelo.index,jelo.naziv,jelo.opis,jelo.vreme,jelo.broj_porcija,jelo.porcija_gram,jelo.postupak,
                        jelo.serviranje,jelo.slozenost_jela,jelo.bez_glutena,jelo.foreignKeyNV,jelo.savet,jelo.video,jelo.slika,jelo.sastojci_svi);
    
                        if(k%4==0){
    
                        divRed=document.createElement("div");
                        divRed.className="DivRed";
                        podloga.appendChild(divRed);
    
                        obj.crtajPredlogRecept(this.id,podloga,divRed,this.Kontejner);
                        }
                        else{
                        obj.crtajPredlogRecept(this.id,podloga,divRed,this.Kontejner);
                        }
                        k++;
                 })
             })
            })
            var pom=this.Kontejner.querySelector(".TxbBrPorcija2").value="";
            var sel=this.Kontejner.querySelector(".SelectTip2").selectedIndex=0;
            var pom=this.Kontejner.querySelector(".TxbVreme1").value="";
            var sel0=this.Kontejner.querySelector(".SelectTip1").selectedIndex=0;
            var sel1=this.Kontejner.querySelector(".SelectSlozenost1").selectedIndex=0;
    }

    fetchZaPodTip(host,klasa,idtip)
    {
        var stariSelect=this.Kontejner.querySelector(".SelectPodTipLevo");
        var stariSelect1=this.Kontejner.querySelector(".SelectPodTipFilter");
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
