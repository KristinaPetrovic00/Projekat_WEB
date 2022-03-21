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
    public class KuvarController : ControllerBase
    {
        public KuvarContext Context{get;set;}
        
        public KuvarController(KuvarContext context)
        {
            Context=context;
        }

        [Route("PreuzmiKuvar")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiKuvar()
        {
            var kuvar=await Context.Kuvar
            .Select(p=>
            new
            {
                ID=p.ID,
                NazivKuvara=p.Naziv,
                Logo=p.Logo,
                Citat=p.Citat
            }).ToListAsync();
            return Ok(kuvar);
        }
    }
}