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
    public class JeloController : ControllerBase
    {
        public KuvarContext Context{get;set;}
        
        public JeloController(KuvarContext context)
        {
            Context=context;
        }
        
        [Route("PreuzmiTipJela/{IdKuvara}/{IdTipaJela}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiTipJela(int IdKuvara,int IdTipaJela)
        {
            var recepti=Context.Jela
                    .Include(p=>p.Kuvar)
                    .Include(p=>p.PreporucenoPice)
                    .Include(p=>p.NutritivneVrednosti)
                    .Include(p=>p.PodTip)
                    .Include(p=>p.Slozenost)
                    .Include(p=>p.ListaSastojaka)
                    .ThenInclude(p=>p.KolicinaJedinica)
                    .Include(p=>p.ListaSastojaka)
                    .ThenInclude(p=>p.Sastojak);

            var podtipovi=Context.PodTipovi.Include(p=>p.Tip)
                                    .Where(p=>p.Tip.ID==IdTipaJela);
                                
            var jelaTipa=await recepti
            .Where(p=>p.Kuvar.ID==IdKuvara)
            .Where(p=>podtipovi.Contains(p.PodTip)).ToListAsync();
           /* List<JeloSastojak> a=new List<JeloSastojak>();

            jelaTipa.ForEach(p=>
            {
                a=p.ListaSastojaka;
            });
return BadRequest(a);*/
            try{
            if(jelaTipa.Count==0)
            return BadRequest("Jela trazenog tipa ne postoje");
            return Ok
            (
                jelaTipa.Select(p=>
                new
                {
                    Index=p.ID,
                    Naziv=p.Naziv,
                    PodTip_jela=new
                    {
                        Idex_podtipa=p.PodTip.ID,
                        Tip=p.PodTip.Naziv
                    },
                    Opis=p.KratakOpis,
                    Vreme=p.Vreme,
                    Broj_porcija=p.BrojPorcija,
                    Porcija_gram=p.PorcijaGram,
                    Postupak=p.Postupak,
                    Serviranje=p.Serviranje,
                    Slozenost_jela=new
                    {
                        Id_slozenosti=p.Slozenost.ID,
                        Slozenost=p.Slozenost.Naziv
                    },
                    Bez_glutena=p.BezGlutena,
                    Preporuceno_pice=new
                    {
                        Index_pica=p.PreporucenoPice.ID,
                        Naziv_pica=p.PreporucenoPice.Naziv,
                        Slika_pica=p.PreporucenoPice.SlikaPica
                    },
                    Nutritivne_vrednosti=new
                    {
                    Index_vrednosti=p.NutritivneVrednosti.ID,
                    Kalorije=p.NutritivneVrednosti.Kalorije,
                    Kalorije_procenti=p.NutritivneVrednosti.KalorijeProcenti,
                    Kalorije_objasnjenje=p.NutritivneVrednosti.KalorijeObjasnjenje,
                    Masti=p.NutritivneVrednosti.Masti,
                    Masti_procenti=p.NutritivneVrednosti.MastiProcenti,
                    Masti_objasnjenje=p.NutritivneVrednosti.MastiObjasnjenje,
                    Zasicenje=p.NutritivneVrednosti.Zasicenje,
                    Zasicenje_procenti=p.NutritivneVrednosti.ZasicenjeProcenti,
                    Zasicenje_objasnjenje=p.NutritivneVrednosti.ZasicenjeObjasnjenje,
                    Seceri=p.NutritivneVrednosti.Seceri,
                    Seceri_procenti=p.NutritivneVrednosti.SeceriProcenti,
                    Seceri_objasnjenje=p.NutritivneVrednosti.SeceriObjasnjenje,
                    Soli=p.NutritivneVrednosti.Soli,
                    Soli_procenti=p.NutritivneVrednosti.SoliProcenti,
                    Soli_objasnjenje=p.NutritivneVrednosti.SoliObjasnjenje,
                    Proteini=p.NutritivneVrednosti.Proteini,
                    Proteini_procenti=p.NutritivneVrednosti.ProteiniProcenti,
                    Proteini_objasnjenje=p.NutritivneVrednosti.ProteiniObjasnjenje,
                    UgljeniHidrati=p.NutritivneVrednosti.UgljeniHidrati,
                    UghljeniHidrati_procenti=p.NutritivneVrednosti.UgljeniHidratiProcenti,
                    UgljeniHidrati_objasnjenje=p.NutritivneVrednosti.UgljeniHidratiObjasenjenje,
                    Vlakna=p.NutritivneVrednosti.Vlakna,
                    Vlakna_objasnjenje=p.NutritivneVrednosti.VlaknaObjasnjenje,
                    },
                    ForeignKeyNV=p.ForeignKeyNV,
                    Savet=p.SavetZaJelo,
                    Video=p.Video,
                    Slika=p.SlikaJela,
                    Sastojci_svi=p.ListaSastojaka
                    .Select(q=>
                     new 
                     {
                         Sastojak_naziv=q.Sastojak.Naziv,
                         Kolicina_sastojka=q.Kolicina,
                         Kolicina_jedinica=q.KolicinaJedinica.Naziv
 
                     })
 
                }).ToList()
            );
            }
            catch(Exception e)
            {
                return BadRequest("Doslo je do greske: "+e.Message);
            }
        }
        
        [Route("PreuzmiPodtip/{IdKuvara}/{Idpodtip}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiPodtipJela(int IdKuvara,int Idpodtip)
        {
            try{
            var recepti=Context.Jela
                   .Include(p=>p.Kuvar)
                    .Include(p=>p.PreporucenoPice)
                    .Include(p=>p.NutritivneVrednosti)
                    .Include(p=>p.PodTip)
                    .Include(p=>p.Slozenost)
                    .Include(p=>p.ListaSastojaka)
                    .ThenInclude(p=>p.KolicinaJedinica)
                    .Include(p=>p.ListaSastojaka)
                    .ThenInclude(p=>p.Sastojak);

            var jelaPodtip=await recepti
                            .Where(p=>p.Kuvar.ID==IdKuvara)
                            .Where(p=>p.PodTip.ID==Idpodtip).ToListAsync();

            if(jelaPodtip.Count==0)
            return BadRequest("Jela trazenog podtipa ne postoje");
            return Ok
            (
                jelaPodtip.Select(p=>
                 new
                {
                    Index=p.ID,
                    Naziv=p.Naziv,
                    PodTip_jela=new
                    {
                        Idex_podtipa=p.PodTip.ID,
                        Tip=p.PodTip.Naziv
                    },
                    Opis=p.KratakOpis,
                    Vreme=p.Vreme,
                    Broj_porcija=p.BrojPorcija,
                    Porcija_gram=p.PorcijaGram,
                    Postupak=p.Postupak,
                    Serviranje=p.Serviranje,
                    Slozenost_jela=new
                    {
                        Id_slozenosti=p.Slozenost.ID,
                        Slozenost=p.Slozenost.Naziv
                    },
                    Bez_glutena=p.BezGlutena,
                    Preporuceno_pice=new
                    {
                        Index_pica=p.PreporucenoPice.ID,
                        Naziv_pica=p.PreporucenoPice.Naziv,
                        Slika_pica=p.PreporucenoPice.SlikaPica
                    },
                    Nutritivne_vrednosti=new
                    {
                    Index_vrednosti=p.NutritivneVrednosti.ID,
                    Kalorije=p.NutritivneVrednosti.Kalorije,
                    Kalorije_procenti=p.NutritivneVrednosti.KalorijeProcenti,
                    Kalorije_objasnjenje=p.NutritivneVrednosti.KalorijeObjasnjenje,
                    Masti=p.NutritivneVrednosti.Masti,
                    Masti_procenti=p.NutritivneVrednosti.MastiProcenti,
                    Masti_objasnjenje=p.NutritivneVrednosti.MastiObjasnjenje,
                    Zasicenje=p.NutritivneVrednosti.Zasicenje,
                    Zasicenje_procenti=p.NutritivneVrednosti.ZasicenjeProcenti,
                    Zasicenje_objasnjenje=p.NutritivneVrednosti.ZasicenjeObjasnjenje,
                    Seceri=p.NutritivneVrednosti.Seceri,
                    Seceri_procenti=p.NutritivneVrednosti.SeceriProcenti,
                    Seceri_objasnjenje=p.NutritivneVrednosti.SeceriObjasnjenje,
                    Soli=p.NutritivneVrednosti.Soli,
                    Soli_procenti=p.NutritivneVrednosti.SoliProcenti,
                    Soli_objasnjenje=p.NutritivneVrednosti.SoliObjasnjenje,
                    Proteini=p.NutritivneVrednosti.Proteini,
                    Proteini_procenti=p.NutritivneVrednosti.ProteiniProcenti,
                    Proteini_objasnjenje=p.NutritivneVrednosti.ProteiniObjasnjenje,
                    UgljeniHidrati=p.NutritivneVrednosti.UgljeniHidrati,
                    UghljeniHidrati_procenti=p.NutritivneVrednosti.UgljeniHidratiProcenti,
                    UgljeniHidrati_objasnjenje=p.NutritivneVrednosti.UgljeniHidratiObjasenjenje,
                    Vlakna=p.NutritivneVrednosti.Vlakna,
                    Vlakna_objasnjenje=p.NutritivneVrednosti.VlaknaObjasnjenje,
                    },
                    ForeignKeyNV=p.ForeignKeyNV,
                    Savet=p.SavetZaJelo,
                    Video=p.Video,
                    Slika=p.SlikaJela,
                   Sastojci_svi=p.ListaSastojaka
                    .Select(q=>
                     new 
                     {
                         Sastojak_naziv=q.Sastojak.Naziv,
                         Kolicina_sastojka=q.Kolicina,
                         Kolicina_jedinica=q.KolicinaJedinica.Naziv
 
                     })
 
                }).ToList()
            );
            }
            catch(Exception e)
            {
                return BadRequest("Doslo je do greske: "+e.Message);
            }

        }
        
        [Route("PreuzmiJelaBezGlutena/{IdKuvara}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiJelaBezGlutena(int IdKuvara)
        {
            try{
            var recepti=Context.Jela
                    .Include(p=>p.Kuvar)
                    .Include(p=>p.PreporucenoPice)
                    .Include(p=>p.NutritivneVrednosti)
                    .Include(p=>p.PodTip)
                    .Include(p=>p.Slozenost)
                    .Include(p=>p.ListaSastojaka)
                    .ThenInclude(p=>p.KolicinaJedinica)
                    .Include(p=>p.ListaSastojaka)
                    .ThenInclude(p=>p.Sastojak);

            var jelaBezGlutena=await recepti
            .Where(p=>p.Kuvar.ID==IdKuvara)
            .Where(p=>p.BezGlutena==true).ToListAsync();

            if(jelaBezGlutena.Count==0) 
            return BadRequest("Ne postoje rezultati za jela bez glutena");
            return Ok(
                jelaBezGlutena.Select(p=>
                new
                {
                    Index=p.ID,
                    Naziv=p.Naziv,
                    PodTip_jela=new
                    {
                        Idex_podtipa=p.PodTip.ID,
                        Tip=p.PodTip.Naziv
                    },
                    Opis=p.KratakOpis,
                    Vreme=p.Vreme,
                    Broj_porcija=p.BrojPorcija,
                    Porcija_gram=p.PorcijaGram,
                    Postupak=p.Postupak,
                    Serviranje=p.Serviranje,
                    Slozenost_jela=new
                    {
                        Id_slozenosti=p.Slozenost.ID,
                        Slozenost=p.Slozenost.Naziv
                    },
                    Bez_glutena=p.BezGlutena,
                    Preporuceno_pice=new
                    {
                        Index_pica=p.PreporucenoPice.ID,
                        Naziv_pica=p.PreporucenoPice.Naziv,
                        Slika_pica=p.PreporucenoPice.SlikaPica
                    },
                    Nutritivne_vrednosti=new
                    {
                    Index_vrednosti=p.NutritivneVrednosti.ID,
                    Kalorije=p.NutritivneVrednosti.Kalorije,
                    Kalorije_procenti=p.NutritivneVrednosti.KalorijeProcenti,
                    Kalorije_objasnjenje=p.NutritivneVrednosti.KalorijeObjasnjenje,
                    Masti=p.NutritivneVrednosti.Masti,
                    Masti_procenti=p.NutritivneVrednosti.MastiProcenti,
                    Masti_objasnjenje=p.NutritivneVrednosti.MastiObjasnjenje,
                    Zasicenje=p.NutritivneVrednosti.Zasicenje,
                    Zasicenje_procenti=p.NutritivneVrednosti.ZasicenjeProcenti,
                    Zasicenje_objasnjenje=p.NutritivneVrednosti.ZasicenjeObjasnjenje,
                    Seceri=p.NutritivneVrednosti.Seceri,
                    Seceri_procenti=p.NutritivneVrednosti.SeceriProcenti,
                    Seceri_objasnjenje=p.NutritivneVrednosti.SeceriObjasnjenje,
                    Soli=p.NutritivneVrednosti.Soli,
                    Soli_procenti=p.NutritivneVrednosti.SoliProcenti,
                    Soli_objasnjenje=p.NutritivneVrednosti.SoliObjasnjenje,
                    Proteini=p.NutritivneVrednosti.Proteini,
                    Proteini_procenti=p.NutritivneVrednosti.ProteiniProcenti,
                    Proteini_objasnjenje=p.NutritivneVrednosti.ProteiniObjasnjenje,
                    UgljeniHidrati=p.NutritivneVrednosti.UgljeniHidrati,
                    UghljeniHidrati_procenti=p.NutritivneVrednosti.UgljeniHidratiProcenti,
                    UgljeniHidrati_objasnjenje=p.NutritivneVrednosti.UgljeniHidratiObjasenjenje,
                    Vlakna=p.NutritivneVrednosti.Vlakna,
                    Vlakna_objasnjenje=p.NutritivneVrednosti.VlaknaObjasnjenje,
                    },
                    ForeignKeyNV=p.ForeignKeyNV,
                    Savet=p.SavetZaJelo,
                    Video=p.Video,
                    Slika=p.SlikaJela,
                  Sastojci_svi=p.ListaSastojaka
                    .Select(q=>
                     new 
                     {
                         Sastojak_naziv=q.Sastojak.Naziv,
                         Kolicina_sastojka=q.Kolicina,
                         Kolicina_jedinica=q.KolicinaJedinica.Naziv
 
                     })
 
                }).ToList()
            );
        }
            catch(Exception e)
            {
                return BadRequest("Doslo je do greske: "+e.Message);
            }
        }

        [Route("PreuzmiJeloVremeSlozenost/{IdKuvara}/{IdTip}/{vreme}/{IdSlozenost}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiJeloIVreme(int IdKuvara,int IdTip,int vreme,int IdSlozenost)
        {
            //provera za vreme
            if(vreme<1 || vreme>120)
            return BadRequest("Neprikladno vreme");
            
            try{
            var recepti=Context.Jela
                    .Include(p=>p.Kuvar)
                    .Include(p=>p.PreporucenoPice)
                    .Include(p=>p.NutritivneVrednosti)
                    .Include(p=>p.PodTip)
                    .Include(p=>p.Slozenost)
                    .Include(p=>p.ListaSastojaka)
                    .ThenInclude(p=>p.KolicinaJedinica)
                    .Include(p=>p.ListaSastojaka)
                    .ThenInclude(p=>p.Sastojak);

            var podtipovi=Context.PodTipovi.Include(p=>p.Tip)
                                           .Where(p=>p.Tip.ID==IdTip);

            var jela=await recepti.Where(p=>p.Kuvar.ID==IdKuvara)
                                  .Where(p=>p.Vreme<=vreme)
                                  .Where(p=>podtipovi.Contains(p.PodTip))
                                  .Where(p=>p.Slozenost.ID==IdSlozenost).ToListAsync();
            if(jela.Count==0)
            return BadRequest("Trazeni tip jela sa naznacenim vremenom pripreme i slozenosti ne postoji");
            return Ok
            (
                jela.Select(p=>
                new
                {
                    Index=p.ID,
                    Naziv=p.Naziv,
                    PodTip_jela=new
                    {
                        Idex_podtipa=p.PodTip.ID,
                        Tip=p.PodTip.Naziv
                    },
                    Opis=p.KratakOpis,
                    Vreme=p.Vreme,
                    Broj_porcija=p.BrojPorcija,
                    Porcija_gram=p.PorcijaGram,
                    Postupak=p.Postupak,
                    Serviranje=p.Serviranje,
                    Slozenost_jela=new
                    {
                        Id_slozenosti=p.Slozenost.ID,
                        Slozenost=p.Slozenost.Naziv
                    },
                    Bez_glutena=p.BezGlutena,
                    Preporuceno_pice=new
                    {
                        Index_pica=p.PreporucenoPice.ID,
                        Naziv_pica=p.PreporucenoPice.Naziv,
                        Slika_pica=p.PreporucenoPice.SlikaPica
                    },
                    Nutritivne_vrednosti=new
                    {
                    Index_vrednosti=p.NutritivneVrednosti.ID,
                    Kalorije=p.NutritivneVrednosti.Kalorije,
                    Kalorije_procenti=p.NutritivneVrednosti.KalorijeProcenti,
                    Kalorije_objasnjenje=p.NutritivneVrednosti.KalorijeObjasnjenje,
                    Masti=p.NutritivneVrednosti.Masti,
                    Masti_procenti=p.NutritivneVrednosti.MastiProcenti,
                    Masti_objasnjenje=p.NutritivneVrednosti.MastiObjasnjenje,
                    Zasicenje=p.NutritivneVrednosti.Zasicenje,
                    Zasicenje_procenti=p.NutritivneVrednosti.ZasicenjeProcenti,
                    Zasicenje_objasnjenje=p.NutritivneVrednosti.ZasicenjeObjasnjenje,
                    Seceri=p.NutritivneVrednosti.Seceri,
                    Seceri_procenti=p.NutritivneVrednosti.SeceriProcenti,
                    Seceri_objasnjenje=p.NutritivneVrednosti.SeceriObjasnjenje,
                    Soli=p.NutritivneVrednosti.Soli,
                    Soli_procenti=p.NutritivneVrednosti.SoliProcenti,
                    Soli_objasnjenje=p.NutritivneVrednosti.SoliObjasnjenje,
                    Proteini=p.NutritivneVrednosti.Proteini,
                    Proteini_procenti=p.NutritivneVrednosti.ProteiniProcenti,
                    Proteini_objasnjenje=p.NutritivneVrednosti.ProteiniObjasnjenje,
                    UgljeniHidrati=p.NutritivneVrednosti.UgljeniHidrati,
                    UghljeniHidrati_procenti=p.NutritivneVrednosti.UgljeniHidratiProcenti,
                    UgljeniHidrati_objasnjenje=p.NutritivneVrednosti.UgljeniHidratiObjasenjenje,
                    Vlakna=p.NutritivneVrednosti.Vlakna,
                    Vlakna_objasnjenje=p.NutritivneVrednosti.VlaknaObjasnjenje,
                    },
                    ForeignKeyNV=p.ForeignKeyNV,
                    Savet=p.SavetZaJelo,
                    Video=p.Video,
                    Slika=p.SlikaJela,
                    Sastojci_svi=p.ListaSastojaka
                    .Select(q=>
                     new 
                     {
                         Sastojak_naziv=q.Sastojak.Naziv,
                         Kolicina_sastojka=q.Kolicina,
                         Kolicina_jedinica=q.KolicinaJedinica.Naziv
 
                     })
 
                }).ToList()
            );
            }
            catch(Exception e)
            {
                return BadRequest("Doslo je do greske: "+e.Message);
            }
        }
        
        [Route("PreuzmiJeloBrojPorcija/{IdKuvara}/{IdTip}/{brojPorcija}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiJeloBrojPorcija(int IdKuvara,int IdTip,int brojPorcija)
        {
            //provera za broj porcija
            if(brojPorcija<1 || brojPorcija>16)
            return BadRequest("Neprikladan broj porcija");
            try{
            var recepti=Context.Jela
                    .Include(p=>p.Kuvar)
                    .Include(p=>p.PreporucenoPice)
                    .Include(p=>p.NutritivneVrednosti)
                    .Include(p=>p.PodTip)
                    .Include(p=>p.Slozenost)
                    .Include(p=>p.ListaSastojaka)
                    .ThenInclude(p=>p.KolicinaJedinica)
                    .Include(p=>p.ListaSastojaka)
                    .ThenInclude(p=>p.Sastojak);

            var podtipovi=Context.PodTipovi.Include(p=>p.Tip)
                                           .Where(p=>p.Tip.ID==IdTip);

            var jela=await recepti.Where(p=>p.Kuvar.ID==IdKuvara)
                                  .Where(p=>p.BrojPorcija==brojPorcija)
                                  .Where(p=>podtipovi.Contains(p.PodTip)).ToListAsync();
            if(jela.Count==0)
            return BadRequest("Trazeni tip jela sa naznacenim brojem porcija je nemoguce pronaci");
             return Ok
            (
                jela.Select(p=>
              new
                {
                    Index=p.ID,
                    Naziv=p.Naziv,
                    PodTip_jela=new
                    {
                        Idex_podtipa=p.PodTip.ID,
                        Tip=p.PodTip.Naziv
                    },
                    Opis=p.KratakOpis,
                    Vreme=p.Vreme,
                    Broj_porcija=p.BrojPorcija,
                    Porcija_gram=p.PorcijaGram,
                    Postupak=p.Postupak,
                    Serviranje=p.Serviranje,
                    Slozenost_jela=new
                    {
                        Id_slozenosti=p.Slozenost.ID,
                        Slozenost=p.Slozenost.Naziv
                    },
                    Bez_glutena=p.BezGlutena,
                    Preporuceno_pice=new
                    {
                        Index_pica=p.PreporucenoPice.ID,
                        Naziv_pica=p.PreporucenoPice.Naziv,
                        Slika_pica=p.PreporucenoPice.SlikaPica
                    },
                    Nutritivne_vrednosti=new
                    {
                    Index_vrednosti=p.NutritivneVrednosti.ID,
                    Kalorije=p.NutritivneVrednosti.Kalorije,
                    Kalorije_procenti=p.NutritivneVrednosti.KalorijeProcenti,
                    Kalorije_objasnjenje=p.NutritivneVrednosti.KalorijeObjasnjenje,
                    Masti=p.NutritivneVrednosti.Masti,
                    Masti_procenti=p.NutritivneVrednosti.MastiProcenti,
                    Masti_objasnjenje=p.NutritivneVrednosti.MastiObjasnjenje,
                    Zasicenje=p.NutritivneVrednosti.Zasicenje,
                    Zasicenje_procenti=p.NutritivneVrednosti.ZasicenjeProcenti,
                    Zasicenje_objasnjenje=p.NutritivneVrednosti.ZasicenjeObjasnjenje,
                    Seceri=p.NutritivneVrednosti.Seceri,
                    Seceri_procenti=p.NutritivneVrednosti.SeceriProcenti,
                    Seceri_objasnjenje=p.NutritivneVrednosti.SeceriObjasnjenje,
                    Soli=p.NutritivneVrednosti.Soli,
                    Soli_procenti=p.NutritivneVrednosti.SoliProcenti,
                    Soli_objasnjenje=p.NutritivneVrednosti.SoliObjasnjenje,
                    Proteini=p.NutritivneVrednosti.Proteini,
                    Proteini_procenti=p.NutritivneVrednosti.ProteiniProcenti,
                    Proteini_objasnjenje=p.NutritivneVrednosti.ProteiniObjasnjenje,
                    UgljeniHidrati=p.NutritivneVrednosti.UgljeniHidrati,
                    UghljeniHidrati_procenti=p.NutritivneVrednosti.UgljeniHidratiProcenti,
                    UgljeniHidrati_objasnjenje=p.NutritivneVrednosti.UgljeniHidratiObjasenjenje,
                    Vlakna=p.NutritivneVrednosti.Vlakna,
                    Vlakna_objasnjenje=p.NutritivneVrednosti.VlaknaObjasnjenje,
                    },
                    ForeignKeyNV=p.ForeignKeyNV,
                    Savet=p.SavetZaJelo,
                    Video=p.Video,
                    Slika=p.SlikaJela,
                   Sastojci_svi=p.ListaSastojaka
                    .Select(q=>
                     new 
                     {
                         Sastojak_naziv=q.Sastojak.Naziv,
                         Kolicina_sastojka=q.Kolicina,
                         Kolicina_jedinica=q.KolicinaJedinica.Naziv
 
                     })
 
                }).ToList()
            );
            }
            catch(Exception e)
            {
                return BadRequest("Doslo je do greske: "+e.Message);
            }
        }
        
        [Route("IzdvojJelaSaDatimSastojcima/{idKuvara}/{idTip}")]
        [HttpGet]
        public async Task<ActionResult> IzdvojJelaSaDatimSastojcima(int idKuvara,int IdTip,[FromQuery] string[] NSastojci)
        {
            var recepti=Context.Jela
                   .Include(p=>p.Kuvar)
                    .Include(p=>p.PreporucenoPice)
                    .Include(p=>p.NutritivneVrednosti)
                    .Include(p=>p.PodTip)
                    .Include(p=>p.Slozenost)
                    .Include(p=>p.ListaSastojaka)
                    .ThenInclude(p=>p.KolicinaJedinica)
                    .Include(p=>p.ListaSastojaka)
                    .ThenInclude(p=>p.Sastojak);

            var podtipovi=Context.PodTipovi.Include(p=>p.Tip)
                                           .Where(p=>p.Tip.ID==IdTip);


            var jela= await recepti.Where(p=>podtipovi.Contains(p.PodTip)).ToListAsync();

            List<Jelo> listaJela=new List<Jelo>();
            
            foreach (var jelo in jela)
            {
                List<string> listaSastojaka=new List<string>();
                bool a=true;

                var sastojci=Context.JelaSastojci.Include(p=>p.Jelo)
                                                 .Include(p=>p.Sastojak)
                                                 .Where(p=>p.Jelo.ID==jelo.ID);
                foreach(var sastojak in sastojci)
                {
                    string nazivsastojka=sastojak.Sastojak.Naziv;
                    listaSastojaka.Add(nazivsastojka);
                }
               foreach(var nsas in NSastojci)
               {
                   if(!(listaSastojaka.Contains(nsas)))
                        a=false;
               }

               if(a==true)
               {
                   listaJela.Add(jelo);
               }
                
            }
            if(listaJela.Count==0)
            return BadRequest("Ne postoje jela trazenog tipa i naznacenih sastojaka");
             return Ok
            (
                listaJela.Select(p=>
                new
                {
                    Index=p.ID,
                    Naziv=p.Naziv,
                    PodTip_jela=new
                    {
                        Idex_podtipa=p.PodTip.ID,
                        Tip=p.PodTip.Naziv
                    },
                    Opis=p.KratakOpis,
                    Vreme=p.Vreme,
                    Broj_porcija=p.BrojPorcija,
                    Porcija_gram=p.PorcijaGram,
                    Postupak=p.Postupak,
                    Serviranje=p.Serviranje,
                    Slozenost_jela=new
                    {
                        Id_slozenosti=p.Slozenost.ID,
                        Slozenost=p.Slozenost.Naziv
                    },
                    Bez_glutena=p.BezGlutena,
                    Preporuceno_pice=new
                    {
                        Index_pica=p.PreporucenoPice.ID,
                        Naziv_pica=p.PreporucenoPice.Naziv,
                        Slika_pica=p.PreporucenoPice.SlikaPica
                    },
                    Nutritivne_vrednosti=new
                    {
                    Index_vrednosti=p.NutritivneVrednosti.ID,
                    Kalorije=p.NutritivneVrednosti.Kalorije,
                    Kalorije_procenti=p.NutritivneVrednosti.KalorijeProcenti,
                    Kalorije_objasnjenje=p.NutritivneVrednosti.KalorijeObjasnjenje,
                    Masti=p.NutritivneVrednosti.Masti,
                    Masti_procenti=p.NutritivneVrednosti.MastiProcenti,
                    Masti_objasnjenje=p.NutritivneVrednosti.MastiObjasnjenje,
                    Zasicenje=p.NutritivneVrednosti.Zasicenje,
                    Zasicenje_procenti=p.NutritivneVrednosti.ZasicenjeProcenti,
                    Zasicenje_objasnjenje=p.NutritivneVrednosti.ZasicenjeObjasnjenje,
                    Seceri=p.NutritivneVrednosti.Seceri,
                    Seceri_procenti=p.NutritivneVrednosti.SeceriProcenti,
                    Seceri_objasnjenje=p.NutritivneVrednosti.SeceriObjasnjenje,
                    Soli=p.NutritivneVrednosti.Soli,
                    Soli_procenti=p.NutritivneVrednosti.SoliProcenti,
                    Soli_objasnjenje=p.NutritivneVrednosti.SoliObjasnjenje,
                    Proteini=p.NutritivneVrednosti.Proteini,
                    Proteini_procenti=p.NutritivneVrednosti.ProteiniProcenti,
                    Proteini_objasnjenje=p.NutritivneVrednosti.ProteiniObjasnjenje,
                    UgljeniHidrati=p.NutritivneVrednosti.UgljeniHidrati,
                    UghljeniHidrati_procenti=p.NutritivneVrednosti.UgljeniHidratiProcenti,
                    UgljeniHidrati_objasnjenje=p.NutritivneVrednosti.UgljeniHidratiObjasenjenje,
                    Vlakna=p.NutritivneVrednosti.Vlakna,
                    Vlakna_objasnjenje=p.NutritivneVrednosti.VlaknaObjasnjenje,
                    },
                    ForeignKeyNV=p.ForeignKeyNV,
                    Savet=p.SavetZaJelo,
                    Video=p.Video,
                    Slika=p.SlikaJela,
                   Sastojci_svi=p.ListaSastojaka
                    .Select(q=>
                     new 
                     {
                         Sastojak_naziv=q.Sastojak.Naziv,
                         Kolicina_sastojka=q.Kolicina,
                         Kolicina_jedinica=q.KolicinaJedinica.Naziv
 
                     })
 
                }).ToList()
            );
        }
        
        [Route("Izfiltriraj/{IdKuvara}/{IdPodtip}/{vreme}/{Brporcija}/{IdSlozenost}")]
        [HttpGet]
        public async Task<ActionResult> Izfiltriraj(int IdKuvara,int IdPodtip,int vreme,int Brporcija,int IdSlozenost)
        {
            //provera za broj porcija
            if(Brporcija<1 || Brporcija>16)
            return BadRequest("Neprikladan broj porcija");
            //provera za vreme
            if(vreme<1 || vreme>120)
            return BadRequest("Neprikladno vreme");

            try{
            var recepti=Context.Jela
                    .Include(p=>p.Kuvar)
                    .Include(p=>p.PreporucenoPice)
                    .Include(p=>p.NutritivneVrednosti)
                    .Include(p=>p.PodTip)
                    .Include(p=>p.Slozenost)
                    .Include(p=>p.ListaSastojaka)
                    .ThenInclude(p=>p.KolicinaJedinica)
                    .Include(p=>p.ListaSastojaka)
                    .ThenInclude(p=>p.Sastojak);

            var jela=await recepti.Where(p=>p.Kuvar.ID==IdKuvara)
                                  .Where(p=>p.PodTip.ID==IdPodtip)
                                  .Where(p=>p.Vreme<=vreme)
                                  .Where(p=>p.BrojPorcija==Brporcija)
                                  .Where(p=>p.Slozenost.ID==IdSlozenost)
                                  .ToListAsync();
            if(jela.Count==0)
            return BadRequest("Primenjeni filter ne daje rezultate");
            return Ok
            (
                jela.Select(p=>
                new
                {
                    Index=p.ID,
                    Naziv=p.Naziv,
                    PodTip_jela=new
                    {
                        Idex_podtipa=p.PodTip.ID,
                        Tip=p.PodTip.Naziv
                    },
                    Opis=p.KratakOpis,
                    Vreme=p.Vreme,
                    Broj_porcija=p.BrojPorcija,
                    Porcija_gram=p.PorcijaGram,
                    Postupak=p.Postupak,
                    Serviranje=p.Serviranje,
                    Slozenost_jela=new
                    {
                        Id_slozenosti=p.Slozenost.ID,
                        Slozenost=p.Slozenost.Naziv
                    },
                    Bez_glutena=p.BezGlutena,
                    Preporuceno_pice=new
                    {
                        Index_pica=p.PreporucenoPice.ID,
                        Naziv_pica=p.PreporucenoPice.Naziv,
                        Slika_pica=p.PreporucenoPice.SlikaPica
                    },
                    Nutritivne_vrednosti=new
                    {
                    Index_vrednosti=p.NutritivneVrednosti.ID,
                    Kalorije=p.NutritivneVrednosti.Kalorije,
                    Kalorije_procenti=p.NutritivneVrednosti.KalorijeProcenti,
                    Kalorije_objasnjenje=p.NutritivneVrednosti.KalorijeObjasnjenje,
                    Masti=p.NutritivneVrednosti.Masti,
                    Masti_procenti=p.NutritivneVrednosti.MastiProcenti,
                    Masti_objasnjenje=p.NutritivneVrednosti.MastiObjasnjenje,
                    Zasicenje=p.NutritivneVrednosti.Zasicenje,
                    Zasicenje_procenti=p.NutritivneVrednosti.ZasicenjeProcenti,
                    Zasicenje_objasnjenje=p.NutritivneVrednosti.ZasicenjeObjasnjenje,
                    Seceri=p.NutritivneVrednosti.Seceri,
                    Seceri_procenti=p.NutritivneVrednosti.SeceriProcenti,
                    Seceri_objasnjenje=p.NutritivneVrednosti.SeceriObjasnjenje,
                    Soli=p.NutritivneVrednosti.Soli,
                    Soli_procenti=p.NutritivneVrednosti.SoliProcenti,
                    Soli_objasnjenje=p.NutritivneVrednosti.SoliObjasnjenje,
                    Proteini=p.NutritivneVrednosti.Proteini,
                    Proteini_procenti=p.NutritivneVrednosti.ProteiniProcenti,
                    Proteini_objasnjenje=p.NutritivneVrednosti.ProteiniObjasnjenje,
                    UgljeniHidrati=p.NutritivneVrednosti.UgljeniHidrati,
                    UghljeniHidrati_procenti=p.NutritivneVrednosti.UgljeniHidratiProcenti,
                    UgljeniHidrati_objasnjenje=p.NutritivneVrednosti.UgljeniHidratiObjasenjenje,
                    Vlakna=p.NutritivneVrednosti.Vlakna,
                    Vlakna_objasnjenje=p.NutritivneVrednosti.VlaknaObjasnjenje,
                    },
                    ForeignKeyNV=p.ForeignKeyNV,
                    Savet=p.SavetZaJelo,
                    Video=p.Video,
                    Slika=p.SlikaJela,
                    Sastojci_svi=p.ListaSastojaka
                    .Select(q=>
                     new 
                     {
                         Sastojak_naziv=q.Sastojak.Naziv,
                         Kolicina_sastojka=q.Kolicina,
                         Kolicina_jedinica=q.KolicinaJedinica.Naziv
 
                     })
 

                }).ToList()
            );
            }
            catch(Exception e)
            {
                return BadRequest("Doslo je do greske:"+e.Message);
            }

        }

        [Route("DodajRecept/{idKuvara}/{ulaznistr}/{idPodtip}/{idSlozenost}/{idPica}/{NutrVr}/{NutrProc}/{NutrObj}/{Sastojci}/{Kolicina}/{Jedinica}")]
        [HttpPost]
        public async Task<ActionResult> DodajRecept(int idKuvara,string ulaznistr,int idPodtip,int idSlozenost,int idPica,
        string NutrVr,string NutrProc,string NutrObj,string Sastojci,string Kolicina, string Jedinica)
        { 
            try
        {
            var podaciJ=ulaznistr.Split('{')
            .ToList();
            string naziv="",opis="",savet="",video="",slika="",serviranje="",postupak="";
            bool gluten=true;
            int vreme=0,brporcija=0,gramaza=0;
            int k=0;
            //podaciJ.ForEach(p=>
            for(k=0;k<podaciJ.Count;k++){
                switch(k){
                    case 0: naziv=podaciJ[k];
                    break;

                    case 1: opis=podaciJ[k];
                    break;

                    case 2: vreme=Int32.Parse(podaciJ[k]);
                    break;

                    case 3: brporcija=Int32.Parse(podaciJ[k]);
                    break;

                    case 4: gramaza=Int32.Parse(podaciJ[k]);
                    break;

                    case 5: gluten= Convert.ToBoolean(podaciJ[k]);
                    break;

                    case 6: savet=podaciJ[k];
                    break;

                    case 7: video=podaciJ[k];
                    break;

                     case 8: slika=podaciJ[k];
                     //return BadRequest(slika);
                    break;

                    case 9: serviranje=podaciJ[k];
                    break;
                    
                    case 10: postupak=podaciJ[k];
                    break;
                    
                }
            }//);
            //return BadRequest(opis+" "+podaciJ[1]+" "+savet+" "+podaciJ[6]+" "+video+" "+podaciJ[7]);
            var kuvar=await Context.Kuvar.Where(p=>p.ID==idKuvara).FirstAsync();
            //return BadRequest(kuvar);
            var podtip=await Context.PodTipovi.Where(p=>p.ID==idPodtip).FirstAsync();
            //return BadRequest(kuvar);
            var slozenost=await Context.Slozenost.Where(p=>p.ID==idSlozenost).FirstAsync();
            //return BadRequest(slozenost);
            var pice=await Context.Pica.Where(p=>p.ID==idPica).FirstAsync();//da li su null
            //return BadRequest(pice);
            
               

            var nutrvr=NutrVr.Split('{')
            .Where(x=>int.TryParse(x,out _))
            .Select(int.Parse)
            .ToList();
            Console.WriteLine(nutrvr);

            var nutrproc=NutrProc.Split('{')
            .Where(x=>int.TryParse(x,out _))
            .Select(int.Parse)
            .ToList();

            var nutrobj=NutrObj.Split('{')
            .ToList();

            var sastojci=Sastojci.Split('{')
            .ToList();

            var kolicina=Kolicina.Split('{')
            .Where(x=>int.TryParse(x,out _))
            .Select(int.Parse)
            .ToList();

            var jedinica=Jedinica.Split('{')
            .Where(x=>int.TryParse(x,out _))
            .Select(int.Parse)
            .ToList();

           // return Ok(jedinica);
            ////////////////////////////////////////////////////
            //int r=0;
            var nutrVr=new NutritivneVrednosti{
               Kalorije=nutrvr[0],
               KalorijeProcenti=nutrproc[0],
               KalorijeObjasnjenje=nutrobj[0],

               Masti=nutrvr[1],
               MastiProcenti=nutrproc[1],
               MastiObjasnjenje=nutrobj[1],

               Zasicenje=nutrvr[2],
               ZasicenjeProcenti=nutrproc[2],
               ZasicenjeObjasnjenje=nutrobj[2],

               Seceri=nutrvr[3],
               SeceriProcenti=nutrproc[3],
               SeceriObjasnjenje=nutrobj[3],

               Soli=nutrvr[4],
               SoliProcenti=nutrproc[4],
               SoliObjasnjenje=nutrobj[4],

               Proteini=nutrvr[5],
               ProteiniProcenti=nutrproc[5],
               ProteiniObjasnjenje=nutrobj[5],

               UgljeniHidrati=nutrvr[6],
               UgljeniHidratiProcenti=nutrproc[6],
               UgljeniHidratiObjasenjenje=nutrobj[6],

               Vlakna=nutrvr[7],
               VlaknaObjasnjenje=nutrobj[7],

               
            };
            Context.NutritivneVrednosti.Add(nutrVr);

            var jelo=new Jelo{
               Naziv=naziv,
               PodTip=podtip, 
               KratakOpis=opis,
               Vreme=vreme,
               BrojPorcija=brporcija,
               PorcijaGram=gramaza,
               Postupak=postupak,
               Serviranje=serviranje,
                Slozenost=slozenost,
                BezGlutena=gluten,
                PreporucenoPice=pice,
                NutritivneVrednosti=nutrVr,
                SavetZaJelo=savet,
                Kuvar=kuvar,
                Video=video,
                SlikaJela=slika

            };
            Context.Jela.Add(jelo);
            int t;
            for(t=0;t<sastojci.Count;t++)
            {
                var objekat=await Context.Jedinice.Where(p=>p.ID==jedinica[t]).FirstOrDefaultAsync();

                JeloSastojak obj=new JeloSastojak
                {
                    Jelo=jelo,
                    Sastojak=await Context.Sastojci.Where(p=>p.Naziv==sastojci[t]).FirstAsync(),
                    Kolicina=kolicina[t],
                    KolicinaJedinica=objekat
                };
                Context.JelaSastojci.Add(obj);
            }

            await Context.SaveChangesAsync();
            return Ok($"Dodato je novo jelo {jelo.Naziv}");
        }
        catch(Exception e)
        {
            return BadRequest("Doslo je do greske: "+e.Message);
        }
    }

        [Route("IzmeniRecept/{idKuvara}/{idRecepta}/{ulaznistr}/{idPodtip}/{idSlozenost}/{idPica}/{NutrVr}/{NutrProc}/{NutrObj}/{Sastojci}/{Kolicina}/{Jedinica}")]
        [HttpPut]
        public async Task<ActionResult> IzmeniRecept(int idKuvara,int idRecepta,string ulaznistr,int idPodtip,int idSlozenost,int idPica,
        string NutrVr,string NutrProc,string NutrObj,string Sastojci,string Kolicina, string Jedinica)
        { 
            try
        {
            var podaciJ=ulaznistr.Split('{')
            .ToList();
            string naziv="",opis="",savet="",video="",slika="",serviranje="",postupak="";
            bool gluten=true;
            int vreme=0,brporcija=0,gramaza=0;
            int k=0;
            for(k=0;k<podaciJ.Count;k++){
                switch(k){
                    case 0: naziv=podaciJ[k];
                    break;

                    case 1: opis=podaciJ[k];
                    break;

                    case 2: vreme=Int32.Parse(podaciJ[k]);
                    break;

                    case 3: brporcija=Int32.Parse(podaciJ[k]);
                    break;

                    case 4: gramaza=Int32.Parse(podaciJ[k]);
                    break;

                    case 5: gluten= Convert.ToBoolean(podaciJ[k]);
                    break;

                    case 6: savet=podaciJ[k];
                    break;

                    case 7: video=podaciJ[k];
                    break;

                     case 8: slika=podaciJ[k];
                    break;

                    case 9: serviranje=podaciJ[k];
                    break;
                    
                    case 10: postupak=podaciJ[k];
                    break;
                    
                }
            }
            var kuvar=await Context.Kuvar.Where(p=>p.ID==idKuvara).FirstAsync();
            var podtip=await Context.PodTipovi.Where(p=>p.ID==idPodtip).FirstAsync();
            var slozenost=await Context.Slozenost.Where(p=>p.ID==idSlozenost).FirstAsync();
            var pice=await Context.Pica.Where(p=>p.ID==idPica).FirstAsync();
            
            var nutrvr=NutrVr.Split('{')
            .Where(x=>int.TryParse(x,out _))
            .Select(int.Parse)
            .ToList();
            Console.WriteLine(nutrvr);

            var nutrproc=NutrVr.Split('{')
            .Where(x=>int.TryParse(x,out _))
            .Select(int.Parse)
            .ToList();

            var nutrobj=NutrObj.Split('{')
            .ToList();

            var sastojci=Sastojci.Split('{')
            .ToList();

            var kolicina=Kolicina.Split('{')
            .Where(x=>int.TryParse(x,out _))
            .Select(int.Parse)
            .ToList();

            var jedinica=Jedinica.Split('{')
            .Where(x=>int.TryParse(x,out _))
            .Select(int.Parse)
            .ToList();
            var jelo=await Context.Jela.Where(p=>p.ID==idRecepta).FirstAsync();
            var nv=await Context.NutritivneVrednosti.Include(p=>p.Jelo)
                                                    .Where(p=>p.ID==jelo.ForeignKeyNV).FirstAsync();
            nv.Kalorije=nutrvr[0];
            nv.KalorijeProcenti=nutrproc[0];
            nv.KalorijeObjasnjenje=nutrobj[0];

            nv.Masti=nutrvr[1];
            nv.MastiProcenti=nutrproc[1];
            nv.MastiObjasnjenje=nutrobj[1];

            nv.Zasicenje=nutrvr[2];
            nv.ZasicenjeProcenti=nutrproc[2];
            nv.ZasicenjeObjasnjenje=nutrobj[2];

            nv.Seceri=nutrvr[3];
            nv.SeceriProcenti=nutrproc[3];
            nv.SeceriObjasnjenje=nutrobj[3];

            nv.Soli=nutrvr[4];
            nv.SoliProcenti=nutrproc[4];
            nv.SoliObjasnjenje=nutrobj[4];

            nv.Proteini=nutrvr[5];
            nv.ProteiniProcenti=nutrproc[5];
            nv.ProteiniObjasnjenje=nutrobj[5];

            nv.UgljeniHidrati=nutrvr[6];
            nv.UgljeniHidratiProcenti=nutrproc[6];
            nv.UgljeniHidratiObjasenjenje=nutrobj[6];

            nv.Vlakna=nutrvr[7];
            nv.VlaknaObjasnjenje=nutrobj[7];

            Context.NutritivneVrednosti.Update(nv);

            jelo.Naziv=naziv;
            jelo.PodTip=podtip; 
            jelo.KratakOpis=opis;
            jelo.Vreme=vreme;
            jelo.BrojPorcija=brporcija;
            jelo.PorcijaGram=gramaza;
            jelo.Postupak=postupak;
            jelo.Serviranje=serviranje;
            jelo.Slozenost=slozenost;
            jelo.BezGlutena=gluten;
            jelo.PreporucenoPice=pice;
            jelo.NutritivneVrednosti=nv;
            jelo.SavetZaJelo=savet;
            jelo.Kuvar=kuvar;
            jelo.Video=video;
            jelo.SlikaJela=slika;

            Context.Jela.Update(jelo);
            //da li treba da obrisem sve ove prethodne sastojke
            var izbrisiSastojke=await Context.JelaSastojci.Where(p=>p.Jelo.ID==idRecepta).ToListAsync();
            izbrisiSastojke.ForEach(p=>{
                Context.JelaSastojci.Remove(p);
            }
            );
            int t;
            for(t=0;t<sastojci.Count;t++)
            {
                var objekat=await Context.Jedinice.Where(p=>p.ID==jedinica[t]).FirstOrDefaultAsync();

                JeloSastojak obj=new JeloSastojak
                {
                    Jelo=jelo,
                    Sastojak=await Context.Sastojci.Where(p=>p.Naziv==sastojci[t]).FirstAsync(),
                    Kolicina=kolicina[t],
                    KolicinaJedinica=objekat
                };
                Context.JelaSastojci.Update(obj);
            }

            await Context.SaveChangesAsync();
            return Ok("Izmenjeno je jelo!");
        }
        catch(Exception e)
        {
            return BadRequest("Doslo je do greske: "+e.Message);
        }
    }
        
        [Route("IzbrisatiJelo/{IdKuvara}/{naziv}")]
        [HttpDelete]
        public async Task<ActionResult>Izbrisi(int IdKuvara,string naziv)
        {
            if(string.IsNullOrWhiteSpace(naziv))
            {
                return BadRequest("Naziv nije unet ispravno!");
            }
            if(naziv.Length>50)
            {
                return BadRequest("Naziv je duzi od dovoljenog!");
            }

            try
            {
                var jelo=Context.Jela.Where(p=>p.Kuvar.ID==IdKuvara)
                                     .Where(p=>p.Naziv==naziv).FirstOrDefault();

                var stavke=await Context.JelaSastojci.Include(p=>p.Jelo)
                                                     .Where(p=>p.Jelo==jelo).ToListAsync();
                if(jelo!=null)
                {
                    for(var i=0;i<stavke.Count;i++){
                        Context.Remove(stavke[i]);
                    }
                    string ime=jelo.Naziv;
                    Context.Jela.Remove(jelo); //iz modela
                    await Context.SaveChangesAsync();
                    return Ok($"Uspesno obrisan recept sa nazivom: {ime}");
                }
                else
                {
                    return BadRequest("Nije pronadjen recept sa datim nazivom!");
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
