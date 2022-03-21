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
    public class SastojakController : ControllerBase
    {
        public KuvarContext Context{get;set;}
        
        public SastojakController(KuvarContext context)
        {
            Context=context;
        }

        [Route("Preuzmi")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiSastojak()
        {
            var sastojci=Context.Sastojci
                        .Include(p=>p.ListaJela)
                        .ThenInclude(p=>p.Jelo);
            var sastojci_=await sastojci.ToListAsync();
            return Ok
            (
                sastojci_.Select(p=>
                new
                {
                    Index=p.ID,
                    Naziv=p.Naziv
                }).ToList()
                );
        }

        [Route("DodajSastojak")]
        [HttpPost]
        public async Task<ActionResult> DodajSastojak([FromBody]Sastojak sastojak)
        {   //provera za Naziv
            if(string.IsNullOrEmpty(sastojak.Naziv))
            {
                return BadRequest("Naziv stastojka prazan!");
            }
            if(sastojak.Naziv.Length>20)
            {
                return BadRequest("Prekoracena duzina naziva sastojka!");
            }
            if(!(sastojak.Naziv is string))
            {
                return BadRequest("Naziv sastojka nije string!");
            }
            try
            {
                Context.Sastojci.Add(sastojak);
                await Context.SaveChangesAsync();
                return Ok($"Dodat je sastojak sa nazivom: {sastojak.Naziv}");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        [Route("Izmeni sastojak/{naziv}/{novinaziv}")]
        [HttpPut]
        public async Task<ActionResult> PromeniSastojak(string naziv,string novinaziv)
        {    //provera za naziv
             if(string.IsNullOrEmpty(naziv))
            {
                return BadRequest("Naziv stastojka koji se pretrazuje je prazno!");
            }
            if(naziv.Length>20)
            {
                return BadRequest("Prekoracena duzina naziva sastojka koji se pretrazuje!");
            }
            if(!(naziv is string))
            {
                return BadRequest("Naziv sastojka koji se pretrazuje nije string!");
            }
            //provera za novinaziv
            if(string.IsNullOrEmpty(novinaziv))
            {
                return BadRequest("Polje novog naziva sastojka je prazno!");
            }
            if(naziv.Length>20)
            {
                return BadRequest("Prekoracena duzina novog naziva sastojka !");
            }
            if(!(naziv is string))
            {
                return BadRequest("Novi naziv sastojka nije sastavljeno od karaktera!");
            }

            try
            {
                var sastojak=Context.Sastojci.Where(p=>p.Naziv==naziv).FirstOrDefault();
                if(sastojak!=null)
                {
                    string pom=sastojak.Naziv;
                    sastojak.Naziv=novinaziv;

                    await Context.SaveChangesAsync();
                    return Ok($"Uspesno promenjeno ime sastojka {pom} u ime {sastojak.Naziv}");
                }
                else
                {
                    return BadRequest($"Sastojak sa datim nazivom {naziv} nije pronadjeno");
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("IzbrisatiSastojak/{naziv}")]
        [HttpDelete]
        public async Task<ActionResult>IzbrisiSastojak(string naziv)
        {
            if(string.IsNullOrEmpty(naziv))
            {
                return BadRequest("Naziv stastojka koji zelite da obrisete je prazno!");
            }
            if(naziv.Length>20)
            {
                return BadRequest("Prekoracena duzina naziva sastojka!");
            }
            if(!(naziv is string))
            {
                return BadRequest("Naziv sastojka koji se trazi nije sastavljeno od karaktera");
            }

            try
            {
                var sastojak=Context.Sastojci.Where(p=>p.Naziv==naziv).FirstOrDefault();
                if(sastojak!=null)
                {
                    string pom=sastojak.Naziv;
                    Context.Sastojci.Remove(sastojak);
                    await Context.SaveChangesAsync();
                    return Ok($"Uspesno obrisan sastojak sa nazivom: {pom}");
                }
                else
                {
                    return BadRequest("Nije pronadjen sastojak sa naznacenim imenom!");
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

        }
    }
}