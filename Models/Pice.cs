using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Pice
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [RegularExpression(@"^[a-zA-Z0-9_ ]*$")]
        [MaxLength(30)]
        public string Naziv { get; set; }
        
        [Required]
        public string SlikaPica { get; set; }
        [JsonIgnore] 
        public List<Jelo> ListaJela {get;set;}
        [JsonIgnore]    
        public Kuvar PiceKuvar {get;set;}
    }
}