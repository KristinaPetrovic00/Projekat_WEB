import { Jelo } from "./Jelo.js";
import { Kuvar } from "./Kuvar.js";


fetch("https://localhost:5001/Kuvar/PreuzmiKuvar")
.then(p=>
    {
        p.json().then(kuvari=>
            {
                document.body.className="ProzorClass";
                var glavniDivK=document.createElement("div");
                glavniDivK.className="GlavniDivK";
                document.body.appendChild(glavniDivK);

                kuvari.forEach(kuvar => {
                    var divK=document.createElement("div");
                    divK.className="DivZaKuvare";
                    divK.innerHTML=kuvar.nazivKuvara;
                    var image=document.createElement("img");
                    image.className="ImageKClass";
                    image.src="./Slike/"+kuvar.logo;
                    image.alt=kuvar.logo;
                    divK.appendChild(image);
                    glavniDivK.appendChild(divK);

                    divK.onclick=(ev)=>{
                        var k=new Kuvar(kuvar.id,kuvar.nazivKuvara,kuvar.citat,kuvar.logo);
                        console.log(kuvar.nazivKuvara);

                        var p=document.body.querySelector(".Pozadina");
                        if(p!==null)
                        {
                            var roditelj=p.parentNode;
                            roditelj.removeChild(p);
                        }
                        var m=document.body.querySelectorAll(".DivZaKuvare");
                        m.forEach(element=>{
                            let roditelj=element.parentNode;
                            roditelj.removeChild(element);
                        });
                        let pom=glavniDivK.parentNode;
                        pom.removeChild(glavniDivK);

                        k.CrtajKuvara(document.body);



                    }
                });
            })
    })