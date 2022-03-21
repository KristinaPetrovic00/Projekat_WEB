using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Saveti
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [RegularExpression(@"^[a-zA-Z0-9_ ]*$")]
        [MaxLength(30)]
        public string Naslov { get; set; }

        [Required]
        public string Tekst { get; set; }

        [Required]
        public string Slika { get; set; }

        [JsonIgnore]
        public Kuvar SavetiKuvar { get; set; }
        
    }
}