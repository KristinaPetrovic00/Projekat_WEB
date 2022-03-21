using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Jelo
    {
        [Key]
         public  int ID { get; set; }

        [Required]
        [MaxLength(50)]
         public string Naziv { get; set; }

         [Required]//json ignore
         public PodTip PodTip {get;set;}

        [MaxLength(100)]
        [RegularExpression(@"^[a-zA-Z0-9_ ]*$")]
        public string KratakOpis { get; set; }
        
        [Required]
        [Range(1,120)]
        [RegularExpression(@"\d+")]
         public int Vreme { get; set; }

        [Required]
        [RegularExpression(@"\d+")] 
        [Range(1,16)]
         public int BrojPorcija { get; set; }

        [Required]
        [RegularExpression(@"\d+")] 
        public int PorcijaGram {get;set;}

        [Required]
         public string Postupak { get; set; } 

        [Required]
        public string Serviranje {get;set;}

        [Required]//json ignre
        public Slozenost Slozenost{get;set;}

        [Required]
        public bool BezGlutena {get;set;} 

        //[JsonIgnore]
        [Required]
        [JsonIgnore] 
        public Pice PreporucenoPice {get;set;}

        //[Required]
        //[JsonIgnore]
        public NutritivneVrednosti NutritivneVrednosti{ get; set; }

        public int ForeignKeyNV{get;set;}

        [Required]
        [RegularExpression(@"^[a-zA-Z0-9_ ]*$")]
        public string SavetZaJelo { get; set; }
        [JsonIgnore]
        public Kuvar Kuvar { get; set; }

        [Required]
        [MaxLength(200)]
        public string Video{ get; set; }

        [Required]
        public string SlikaJela { get; set; }
        
        public List<JeloSastojak> ListaSastojaka {get;set;}

    }
}