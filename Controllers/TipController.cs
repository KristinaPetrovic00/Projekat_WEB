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
    public class TipController : ControllerBase
    {
        public KuvarContext Context{get;set;}
        
        public TipController(KuvarContext context)
        {
            Context=context;
        }

        [Route("PreuzmiTip")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiTip()
        {
            var tipovi=Context.Tipovi.Include(p=>p.PodTip);
            return Ok(await tipovi.Select(p=>
            new{
                Id=p.ID,
                Naziv=p.Naziv
            }).ToListAsync());
        }
    }
}