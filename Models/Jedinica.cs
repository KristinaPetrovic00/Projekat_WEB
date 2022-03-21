using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Models
{
    public class Jedinica 
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [RegularExpression(@"^[a-zA-Z0-9_ ]*$")]
        public string Naziv { get; set; }

        public List<JeloSastojak> JeloSastojakJedinica { get; set; }
        
    }
}