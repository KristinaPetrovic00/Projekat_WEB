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
    public class SlozenostController : ControllerBase
    {
        public KuvarContext Context{get;set;}
        
        public SlozenostController(KuvarContext context)
        {
            Context=context;
        }

     [Route("PreuzmiSlozenost")]
     [HttpGet]
     public async Task<ActionResult> PreuzmiSlozenost()
     {
         var slozenost=Context.Slozenost;
         return Ok(await slozenost.Select(p=>
         new
         {
             Id=p.ID,
             Naziv=p.Naziv
         }
         ).ToListAsync());
     }
    }
}