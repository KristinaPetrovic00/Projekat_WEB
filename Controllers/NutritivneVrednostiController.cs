using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Projekat_WEB.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NutritivneVrednostiController : ControllerBase
    {
        public KuvarContext Context{get;set;}
        
        public NutritivneVrednostiController(KuvarContext context)
        {
            Context=context;
        }

    [Route("PredajNutritivneVrednosti/{idNutrVr}")]
    [HttpGet]
    public async Task<ActionResult> PredajNutritivneVrednosti(int idNutrVr)
    {
        try{
            var vrednosti=await Context.NutritivneVrednosti
                        .Include(p=>p.Jelo)
                        .Where(q=>q.ID==idNutrVr).FirstAsync();
            return Ok
            (
                 new
                {
                    Index=vrednosti.ID,
                    Kalorije=vrednosti.Kalorije,
                    Kalorije_procenti=vrednosti.KalorijeProcenti,
                    Kalorije_objasnjenje=vrednosti.KalorijeObjasnjenje,
                    Masti=vrednosti.Masti,
                    Masti_procenti=vrednosti.MastiProcenti,
                    Masti_objasnjenje=vrednosti.MastiObjasnjenje,
                    Zasicenje=vrednosti.Zasicenje,
                    Zasicenje_procenti=vrednosti.ZasicenjeProcenti,
                    Zasicenje_objasnjenje=vrednosti.ZasicenjeObjasnjenje,
                    Seceri=vrednosti.Seceri,
                    Seceri_procenti=vrednosti.SeceriProcenti,
                    Seceri_objasnjenje=vrednosti.SeceriObjasnjenje,
                    Soli=vrednosti.Soli,
                    Soli_procenti=vrednosti.SoliProcenti,
                    Soli_objasnjenje=vrednosti.SoliObjasnjenje,
                    Proteini=vrednosti.Proteini,
                    Proteini_procenti=vrednosti.ProteiniProcenti,
                    Proteini_objasnjenje=vrednosti.ProteiniObjasnjenje,
                    UgljeniHidrati=vrednosti.UgljeniHidrati,
                    UghljeniHidrati_procenti=vrednosti.UgljeniHidratiProcenti,
                    UgljeniHidrati_objasnjenje=vrednosti.UgljeniHidratiObjasenjenje,
                    Vlakna=vrednosti.Vlakna,
                    Vlakna_objasnjenje=vrednosti.VlaknaObjasnjenje
                }
            );
        }
        catch(Exception e)
        {
            return BadRequest("Doslo je do greske: "+e.Message);
        }
        
    }  

    [Route("DodajNutritivneVrednosti")]
    [HttpPost]
    public async Task<ActionResult>DodajNutritivneVrednosti([FromBody] NutritivneVrednosti nv)
    {
        //provera Kalorije
        if(string.IsNullOrEmpty(nv.Kalorije.ToString()))
        {
            return BadRequest("Vrednost za kalorije nije postavljena!");
        }
        if(string.IsNullOrEmpty(nv.KalorijeProcenti.ToString()))
        {
            return BadRequest("Vrednost za kalorije u procentima nije postavljena!");
        }
        if(string.IsNullOrEmpty(nv.KalorijeObjasnjenje))
        {
            return BadRequest("Objasnjenje za kalorije nedostaje!");
        }
        //provera Masti
        if(string.IsNullOrEmpty(nv.Masti.ToString()))
        {
            return BadRequest("Vrednost za masti nije postavljena!");
        }
        if(string.IsNullOrEmpty(nv.MastiProcenti.ToString()))
        {
            return BadRequest("Vrednost za masti u procentima nije postavljena!");
        }
        if(string.IsNullOrEmpty(nv.MastiObjasnjenje))
        {
            return BadRequest("Objasnjenje za masti nedostaje!");
        }
        //provera Zasicenje
        if(string.IsNullOrEmpty(nv.Zasicenje.ToString()))
        {
            return BadRequest("Vrednost za zasicenje nije postavljena!");
        }
        if(string.IsNullOrEmpty(nv.ZasicenjeProcenti.ToString()))
        {
            return BadRequest("Vrednost za zasicenje u procentima nije postavljena!");
        }
        if(string.IsNullOrEmpty(nv.ZasicenjeObjasnjenje))
        {
            return BadRequest("Objasnjenje za zasicenje nedostaje!");
        }
        //provera Seceri
        if(string.IsNullOrEmpty(nv.Seceri.ToString()))
        {
            return BadRequest("Vrednost za secere nije postavljena!");
        }
        if(string.IsNullOrEmpty(nv.SeceriProcenti.ToString()))
        {
            return BadRequest("Vrednost za secere u procentima nije postavljena!");
        }
        if(string.IsNullOrEmpty(nv.SeceriObjasnjenje))
        {
            return BadRequest("Objasnjenje za secere nedostaje!");
        }
        //provera Soli
        if(string.IsNullOrEmpty(nv.Soli.ToString()))
        {
            return BadRequest("Vrednost za soli nije postavljena!");
        }
        if(string.IsNullOrEmpty(nv.SoliProcenti.ToString()))
        {
            return BadRequest("Vrednost za soli u procentima nije postavljena!");
        }
        if(string.IsNullOrEmpty(nv.SoliObjasnjenje))
        {
            return BadRequest("Objasnjenje za soli nedostaje!");
        }
        //provera Proteini
        if(string.IsNullOrEmpty(nv.Proteini.ToString()))
        {
            return BadRequest("Vrednost za proteine nije postavljena!");
        }
        if(string.IsNullOrEmpty(nv.ProteiniProcenti.ToString()))
        {
            return BadRequest("Vrednost za proteine u procentima nije postavljena!");
        }
        if(string.IsNullOrEmpty(nv.ProteiniObjasnjenje))
        {
            return BadRequest("Objasnjenje za proteine nedostaje!");
        }
        //provera Ugljeni hidrati
        if(string.IsNullOrEmpty(nv.UgljeniHidrati.ToString()))
        {
            return BadRequest("Vrednost za ugljene hidrate nije postavljena!");
        }
        if(string.IsNullOrEmpty(nv.UgljeniHidratiProcenti.ToString()))
        {
            return BadRequest("Vrednost za ugljene hidrate u procentima nije postavljena!");
        }
        if(string.IsNullOrEmpty(nv.UgljeniHidratiObjasenjenje))
        {
            return BadRequest("Objasnjenje za ugljene hidrate nedostaje!");
        }
        //provera Vlakna
        if(string.IsNullOrEmpty(nv.Vlakna.ToString()))
        {
            return BadRequest("Vrednost za vlakna nije postavljena!");
        }
        
        if(string.IsNullOrEmpty(nv.VlaknaObjasnjenje))
        {
            return BadRequest("Objasnjenje za vlakna nedostaje!");
        }
        try
        {
            Context.NutritivneVrednosti.Add(nv);
            await Context.SaveChangesAsync();
            return Ok("Nutritivne vrednosti dodate");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [Route("IzmeniNutritivneVrednosti")]
    [HttpPut]
    public async Task<ActionResult> IzmeniNutritivneVrednosti([FromBody] NutritivneVrednosti nv)
    {
           //provera Kalorije
        if(string.IsNullOrEmpty(nv.Kalorije.ToString()))
        {
            return BadRequest("Vrednost za kalorije nije postavljena!");
        }
        if(string.IsNullOrEmpty(nv.KalorijeProcenti.ToString()))
        {
            return BadRequest("Vrednost za kalorije u procentima nije postavljena!");
        }
        if(string.IsNullOrEmpty(nv.KalorijeObjasnjenje))
        {
            return BadRequest("Objasnjenje za kalorije nedostaje!");
        }
        //provera Masti
        if(string.IsNullOrEmpty(nv.Masti.ToString()))
        {
            return BadRequest("Vrednost za masti nije postavljena!");
        }
        if(string.IsNullOrEmpty(nv.MastiProcenti.ToString()))
        {
            return BadRequest("Vrednost za masti u procentima nije postavljena!");
        }
        if(string.IsNullOrEmpty(nv.MastiObjasnjenje))
        {
            return BadRequest("Objasnjenje za masti nedostaje!");
        }
        //provera Zasicenje
        if(string.IsNullOrEmpty(nv.Zasicenje.ToString()))
        {
            return BadRequest("Vrednost za zasicenje nije postavljena!");
        }
        if(string.IsNullOrEmpty(nv.ZasicenjeProcenti.ToString()))
        {
            return BadRequest("Vrednost za zasicenje u procentima nije postavljena!");
        }
        if(string.IsNullOrEmpty(nv.ZasicenjeObjasnjenje))
        {
            return BadRequest("Objasnjenje za zasicenje nedostaje!");
        }
        //provera Seceri
        if(string.IsNullOrEmpty(nv.Seceri.ToString()))
        {
            return BadRequest("Vrednost za secere nije postavljena!");
        }
        if(string.IsNullOrEmpty(nv.SeceriProcenti.ToString()))
        {
            return BadRequest("Vrednost za secere u procentima nije postavljena!");
        }
        if(string.IsNullOrEmpty(nv.SeceriObjasnjenje))
        {
            return BadRequest("Objasnjenje za secere nedostaje!");
        }
        //provera Soli
        if(string.IsNullOrEmpty(nv.Soli.ToString()))
        {
            return BadRequest("Vrednost za soli nije postavljena!");
        }
        if(string.IsNullOrEmpty(nv.SoliProcenti.ToString()))
        {
            return BadRequest("Vrednost za soli u procentima nije postavljena!");
        }
        if(string.IsNullOrEmpty(nv.SoliObjasnjenje))
        {
            return BadRequest("Objasnjenje za soli nedostaje!");
        }
        //provera Proteini
        if(string.IsNullOrEmpty(nv.Proteini.ToString()))
        {
            return BadRequest("Vrednost za proteine nije postavljena!");
        }
        if(string.IsNullOrEmpty(nv.ProteiniProcenti.ToString()))
        {
            return BadRequest("Vrednost za proteine u procentima nije postavljena!");
        }
        if(string.IsNullOrEmpty(nv.ProteiniObjasnjenje))
        {
            return BadRequest("Objasnjenje za proteine nedostaje!");
        }
        //provera Ugljeni hidrati
        if(string.IsNullOrEmpty(nv.UgljeniHidrati.ToString()))
        {
            return BadRequest("Vrednost za ugljene hidrate nije postavljena!");
        }
        if(string.IsNullOrEmpty(nv.UgljeniHidratiProcenti.ToString()))
        {
            return BadRequest("Vrednost za ugljene hidrate u procentima nije postavljena!");
        }
        if(string.IsNullOrEmpty(nv.UgljeniHidratiObjasenjenje))
        {
            return BadRequest("Objasnjenje za ugljene hidrate nedostaje!");
        }
        //provera Vlakna
        if(string.IsNullOrEmpty(nv.Vlakna.ToString()))
        {
            return BadRequest("Vrednost za vlakna nije postavljena!");
        }
        try
        {
            Context.NutritivneVrednosti.Update(nv);
            await Context.SaveChangesAsync();
            return Ok("Izmenjene nutritivne vrednosti");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }
     [Route("IzbrisiNutritivneVrednosti/{idNV}")]
     [HttpDelete]
     public async Task<ActionResult> IzbrisiNutritivneVrednosti(int idNV)
     {
         if(idNV<=0 || !Context.NutritivneVrednosti.Any(p=>p.ID==idNV))
            return BadRequest("ID nutritivne vrednosti nije validan");
            try
            {
                var vrednost=Context.NutritivneVrednosti.Where(p=>p.ID==idNV).FirstOrDefault();
                Context.NutritivneVrednosti.Remove(vrednost);
                await Context.SaveChangesAsync();
                return Ok("Podatak uspesno obrisan");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

     }
    }
}