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
    public class SavetiController : ControllerBase
    {
        public KuvarContext Context{get;set;}
        
        public SavetiController(KuvarContext context)
        {
            Context=context;
        }

    [Route("PrikaziSavete/{idKuvara}")]
    [HttpGet]
    public async Task<ActionResult> PrikaziSavete(int idKuvara)
    {
        try
        {
            return Ok
            (
                await Context.Saveti.Where(p=>p.SavetiKuvar.ID==idKuvara)
                .Select(p=>
                new
                {
                    ID=p.ID,
                    Naslov=p.Naslov,
                    Tekst=p.Tekst,
                    Slika=p.Slika
                }).ToListAsync()
            );
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("DodajSavet/{IdKuvara}/{naslov}/{tekst}/{slika}")]
    [HttpPost]
    public async Task<ActionResult> DodajSavet(int IdKuvara,string naslov,string tekst,string slika)
    { //provera Naslov
        if(string.IsNullOrEmpty(naslov))
        {
            return BadRequest("Naslov saveta prazan!");
        }
        if(naslov.Length>30)
        {
            return BadRequest("Prekoracena duzina naslova!");
        }
    //provera Tekst
        if(string.IsNullOrEmpty(tekst))
        {
            return BadRequest("Prazan tekst!");
        }
    //provera Slika
        if(string.IsNullOrEmpty(tekst))
        {
            return BadRequest("Nema slike!");
        }
        try
        {
            var kuvar=await Context.Kuvar.Where(p=>p.ID==IdKuvara).FirstOrDefaultAsync();

            Saveti savet=new Saveti
            {
                Naslov=naslov,
                Tekst=tekst,
                Slika=slika,
                SavetiKuvar=kuvar
            };
            Context.Saveti.Add(savet);
            await Context.SaveChangesAsync();
            return Ok($"Uspesno dodat savet {savet.Naslov}");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("IzmeniSavet/{IdKuvara}/{Idsaveta}/{noviNaslov}/{tekst}/{slika}")]
    [HttpPut]
    public async Task<ActionResult> IzmeniSavet(int IdKuvara, int Idsaveta,string noviNaslov,string tekst,string slika)
    {
        //provera noviNaslov
        if(string.IsNullOrWhiteSpace(noviNaslov))
        {
            return BadRequest("Naslov saveta prazan!");
        }
        if(noviNaslov.Length>30)
        {
            return BadRequest("Prekoracena duzina naslova!");
        }
    //provera tekst
        if(string.IsNullOrEmpty(tekst))
        {
            return BadRequest("Prazan tekst!");
        }
    //provera slika
        if(string.IsNullOrEmpty(slika))
        {
            return BadRequest("Nema slike!");
        }
        try
        {
           
            Saveti savet=Context.Saveti.Include(p=>p.SavetiKuvar)
                                    .Where(p=>p.SavetiKuvar.ID==IdKuvara)
                                    .Where(p=>p.ID==Idsaveta).FirstOrDefault();
            var stariNaslov=savet.Naslov;
            savet.Naslov=noviNaslov;
            savet.Tekst=tekst;
            savet.Slika=slika;

            Context.Saveti.Update(savet);
            await Context.SaveChangesAsync();
            return Ok($"Savet {stariNaslov} izmenjen");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("ObrisiSavet/{idKuvara}/{naslov}")]
    [HttpDelete]
    public async Task<ActionResult> ObrisiSavet(int idKuvara,string naslov)
    {
        if(string.IsNullOrEmpty(naslov))
        {
            return BadRequest("Nevalidan argument!");
        }
        try
        {
            var savet=Context.Saveti.Where(p=>p.Naslov==naslov).FirstOrDefault();
            if(savet!=null)
            {
                string naziv=savet.Naslov;
                Context.Saveti.Remove(savet);
                await Context.SaveChangesAsync();
                return Ok($"Uspesno obrisan savet {naziv}");
            }
            else
            {
                return BadRequest("Savet sa datim naslovom ne postoji!");
            }
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    }
}