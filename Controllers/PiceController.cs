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
    public class PiceController : ControllerBase
    {
        public KuvarContext Context{get;set;}
        
        public PiceController(KuvarContext context)
        {
            Context=context;
        }

        [Route("PreuzmiPica/{idKuvar}")]
        [HttpGet]
        public async Task<ActionResult> Preuzmi(int idKuvar)
        {
            var pica=await Context.Pica
                    .Include(p=>p.ListaJela)
                    .Include(p=>p.PiceKuvar)
                    .Where(p=>p.PiceKuvar.ID==idKuvar).ToListAsync();
            
            if(pica==null)
            return BadRequest("Nema pica!");
            return Ok
            (
                pica.Select(p=>
                new
                {
                    Index=p.ID,
                    Naziv=p.Naziv,
                    Slika_pica=p.SlikaPica
                }).ToList()
            );
        }
        [Route("PreuzmiPice/{idKuvar}/{idJela}")]
        [HttpGet]
        public async Task<ActionResult> Preuzmi(int idKuvar,int idJela)
        {
            var pica=await Context.Pica
                    .Include(p=>p.ListaJela)
                    .Include(p=>p.PiceKuvar)
                    .Where(p=>p.PiceKuvar.ID==idKuvar).ToListAsync(); //izdvajaju se sva pica ovog kuvara

            var jelo=await Context.Jela.Where(j=>j.ID==idJela).FirstAsync();
            var idpica=jelo.PreporucenoPice.ID;

            var pice= pica.Where(p=>p.ID==idpica).FirstOrDefault();

            if(pice==null)
            return BadRequest("Nema pica!");
            return Ok
            (
                new
                {
                    Naziv=pice.Naziv,
                    Slika_pica=pice.SlikaPica
                }
            );
        }
        //sustinski ti nije neophodna fja
        /*[Route("DodajPiceFromBody/{idKuvar}")]
        [HttpPost]
        public async Task<ActionResult> DodajPice(int idKuvar,string naziv,string slika)
        {  //provera Naziva
            if(string.IsNullOrEmpty(naziv))
            {
                return BadRequest("Naziv pica prazan!");
            }
            if(naziv.Length>20)
            {
                return BadRequest("Prekoracena duzina naziva pica!");
            }
            if(!(naziv is string))
            {
                return BadRequest("Naziv pica nije sastavljeno od karaktera!");
            }
           //provera za Sliku pica
            if(string.IsNullOrEmpty(slika))
            {
                return BadRequest("Slika pica nije dodata!");
            }
            try
            {
                var kuvar=Context.Kuvar.Where(p=>p.ID==idKuvar).FirstOrDefault();
                var pice=new Pice{
                    Naziv=naziv,
                    SlikaPica=slika,
                    PiceKuvar=kuvar
                };
                Context.Pica.Add(pice);
                await Context.SaveChangesAsync();
                return Ok($"Dodato je pice sa nazivom {pice.Naziv}");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        //sustinski ti nije neophodna fja
       [Route("IzmeniPice/{naziv}/{novinaziv}/{tip}/{slika}")]
       [HttpPut]
         public async Task<ActionResult> IzmeniPice(string naziv, string novinaziv,string slika)
        {   //provera za naziv
            if(string.IsNullOrEmpty(naziv))
            {
                return BadRequest("Naziv pica koje se pretrazuje je prazno!");
            }
            if(naziv.Length>20)
            {
                return BadRequest("Prekoracena duzina naziva pica koje se pretrazuje!");
            }
            if(!(naziv is string))
            {
                return BadRequest("Naziv pica koje se pretrazuje nije sastavljeno od karaktera!");
            }
            //provera za novinaziv
            if(string.IsNullOrEmpty(naziv))
            {
                return BadRequest("Polje novog naziva pica je prazno!");
            }
            if(naziv.Length>20)
            {
                return BadRequest("Prekoracena duzina novog naziva pica!");
            }
            if(!(naziv is string))
            {
                return BadRequest("Novi naziv pica nije sastavljeno od karaktera!");
            }

            try
            {
                var pice=Context.Pica.Where(p=>p.Naziv==naziv).FirstOrDefault();
                if(pice!=null)
                {   
                    string pom=pice.Naziv;
                    pice.Naziv=novinaziv;
                    pice.SlikaPica=slika;

                    await Context.SaveChangesAsync();
                    return Ok($"Pice {pom} izmenjeno");
                }
                else
                {
                    return BadRequest($"Pice sa nazivom {naziv} nije pronadjeno");
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        [Route("IzbrisatiPice/{naziv}")]
        [HttpDelete]
        public async Task<ActionResult>IzbrisatiPice(string naziv)
        { //provera za naziv
             if(string.IsNullOrEmpty(naziv))
            {
                return BadRequest("Naziv pica koje zelite da obrisete je prazno!");
            }
            if(naziv.Length>20)
            {
                return BadRequest("Prekoracena duzina naziva pica!");
            }
            if(!(naziv is string))
            {
                return BadRequest("Naziv pica koje se trazi nije sastavljeno od karaktera!");
            }

            try
            {
                var pice=Context.Pica.Where(p=>p.Naziv==naziv).FirstOrDefault();
                if(pice!=null)
                {
                    string pom=pice.Naziv;
                    Context.Pica.Remove(pice);
                    await Context.SaveChangesAsync();
                    return Ok($"Uspesno obrisano pice sa nazivom: {pom}");
                }
                else
                {
                    return BadRequest("Nije pronadjeno pice sa naznacenim imenom!");
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
       */

    }
}