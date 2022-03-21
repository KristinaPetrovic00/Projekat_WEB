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
    public class PodtipController : ControllerBase
    {
        public KuvarContext Context{get;set;}
        
        public PodtipController(KuvarContext context)
        {
            Context=context;
        }

        [Route("PreuzmiPodtipove/{IdTip}")]
        [HttpGet]
        public async Task<ActionResult>PreuzmiPodtipove(int IdTip)
        {
            var podtipovi=Context.PodTipovi.Include(p=>p.Tip);
            var obj=podtipovi.Where(p=>p.Tip.ID==IdTip);
            return Ok(await obj.Select(p=>
                new
                {
                    Id=p.ID,
                    Naziv=p.Naziv
                }
            ).ToListAsync());
        }
    }
}