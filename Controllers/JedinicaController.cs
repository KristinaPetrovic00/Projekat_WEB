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
    public class JedinicaController : ControllerBase
    {
        public KuvarContext Context{get;set;}
        
        public JedinicaController(KuvarContext context)
        {
            Context=context;
        }

        [Route("PreuzmiJedinice")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiJedinice()
        {
            var jedinice=Context.Jedinice.Include(p=>p.JeloSastojakJedinica);
            return Ok(await jedinice.Select(p=>
            new
            {
                Id=p.ID,
                Naziv=p.Naziv
            }).ToListAsync());
        }
    }
}
        