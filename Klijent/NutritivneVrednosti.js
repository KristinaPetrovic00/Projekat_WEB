export class NutritivneVrednosti{

    constructor(index,kalorije,kalorije_procenti,kalorije_objasnjenje,masti,masti_procenti,masti_objasnjenje,zasicenje,zasicenje_procenti,zasicenje_objasnjenje,seceri,seceri_procenti,
        seceri_objasnjenje,soli,soli_procenti,soli_objasnjenje,proteini,proteini_procenti,proteini_objasnjenje,ugljeniHidrati,ughljeniHidrati_procenti,ugljeniHidrati_objasnjenje,vlakna,vlakna_objasnjenje)
        {
            this.index=index;
            this.kalorije=kalorije;
            this.kalorije_procenti=kalorije_procenti;
            this.kalorije_objasnjenje=kalorije_objasnjenje;
            this.masti=masti;
            this.masti_procenti=masti_procenti;
            this.masti_objasnjenje=masti_objasnjenje;
            this.zasicenje=zasicenje;
            this.zasicenje_procenti=zasicenje_procenti;
            this.zasicenje_objasnjenje=zasicenje_objasnjenje;
            this.seceri=seceri;
            this.seceri_procenti=seceri_procenti;
            this.seceri_objasnjenje=seceri_objasnjenje;
            this.soli=soli;
            this.soli_procenti=soli_procenti;
            this.soli_objasnjenje=soli_objasnjenje;
            this.proteini=proteini;
            this.proteini_procenti=proteini_procenti;
            this.proteini_objasnjenje=proteini_objasnjenje;
            this.ugljeniHidrati=ugljeniHidrati;
            this.ughljeniHidrati_procenti=ughljeniHidrati_procenti;
            this.ugljeniHidrati_objasnjenje=ugljeniHidrati_objasnjenje;
            this.vlakna=vlakna;
            this.vlakna_objasnjenje=vlakna_objasnjenje;
            this.Kontejner=null;
        }
        
        crtajNutritivneVrednostistatistika(host, hostgrafik){
            if(!host || !hostgrafik){
                throw new Error("Host ne postoji!");
            }
            var i=0;
            var listanutrvr=["kalorije","masti","zasicenje","seceri","soli","proteini","ugljeni hidrati","vlakna"];
            var listanutvrvr=[this.kalorije,this.masti,this.zasicenje,this.seceri, this.soli, this.proteini, this.ugljeniHidrati,this.vlakna];
            var listanutrvrproc=[this.kalorije_procenti,this.masti_procenti,this.zasicenje_procenti,this.seceri_procenti, this.soli_procenti, this.proteini_procenti, this.ughljeniHidrati_procenti];
            var listaProcenat=["LblKalorije","LblMasti","LblZasicenje","LblSeceri","LblSoli","LblProteini","LblUgljeniHidrati","LblVlakna"];
            var listaBojaStub=["ProcKalorije","ProcMasti","ProcZasicenje","ProcSeceri","ProcSoli","ProcProteini","ProcUgljeniHidrati"];
            
                for(i=0;i<listanutrvr.length;i++){
                var divBox=document.createElement("div");
                divBox.className="DivBox";
                host.appendChild(divBox);

                var lblNazivNV=document.createElement("label");
                lblNazivNV.className="LblNazivNV";
                lblNazivNV.innerHTML=listanutrvr[i];
                divBox.appendChild(lblNazivNV);

                var lblVrednostNV=document.createElement("label");
                if(listanutrvr[i]!="kalorije"){
                lblVrednostNV.innerHTML=listanutvrvr[i]+" g";
                }
                else{
                lblVrednostNV.innerHTML=listanutvrvr[i];
                }
                lblVrednostNV.className="LblVrednostNV";
                divBox.appendChild(lblVrednostNV);

                var lblProcenatNV=document.createElement("label");
                if(listanutrvr[i]!="vlakna"){
                lblProcenatNV.innerHTML=listanutrvrproc[i]+" %";
                }
                else{
                lblProcenatNV.innerHTML="-"   
                }
                lblProcenatNV.className=listaProcenat[i];
                divBox.appendChild(lblProcenatNV);
            }

            var divStubovi=document.createElement("div");
            divStubovi.className="DivStubovi";
            hostgrafik.appendChild(divStubovi);
            
            for(i=0;i<listanutrvrproc.length;i++){

                var divStubic=document.createElement("div");
                divStubic.className=listaBojaStub[i];
                divStubic.style.height=listanutrvrproc[i]+"%";

                divStubovi.appendChild(divStubic);

            }


        }
        crtajNutritivneVrednostiObjasnjenje(host){
            if(!host){
                throw new Exception("Nije dodeljen host!");
            }
            var i;
            var listanutrvr=["kalorije","masti","zasicenje","seceri","soli","proteini","ugljeni hidrati","vlakna"];
            var listanutrvro=[this.kalorije_objasnjenje,this.masti_objasnjenje,this.zasicenje_objasnjenje,this.seceri_objasnjenje,this.soli_objasnjenje,this.proteini_objasnjenje,this.ugljeniHidrati_objasnjenje,this.vlakna_objasnjenje]
            for(i=0;i<listanutrvr.length;i++){

                var divBox=document.createElement("div");
                divBox.className="DivBox";
                host.appendChild(divBox);

                var lblNazivNV=document.createElement("label");
                lblNazivNV.className="LblNazivO"+listanutrvr[i];
                if(listanutrvr[i]=="ugljeni hidrati"){
                lblNazivNV.className="LblNazivOugljenihidrati";
                }
                lblNazivNV.innerHTML=listanutrvr[i];
                divBox.appendChild(lblNazivNV);

                var lblO=document.createElement("label");
                lblO.className="LblO";
                lblO.innerHTML=listanutrvro[i];
                divBox.appendChild(lblO);
            }
        }
}