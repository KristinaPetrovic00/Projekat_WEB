using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class JeloSastojak
    {
        [Key]
        public int ID { get; set; }
        [JsonIgnore]
        public Jelo Jelo { get; set; }
        
        public Sastojak Sastojak { get; set; }

         [Required]
         [RegularExpression(@"\d+")]
         [Range(1,1000)]
         public int Kolicina { get; set; } //u komadima ili gramima

        [Required]
        public Jedinica KolicinaJedinica { get; set; }
        
    }
}