using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Kuvar
    {
        [Key]
        public int ID { get; set; }
        [Required]
        [RegularExpression(@"^[a-zA-Z0-9_ ]*$")]
        [MaxLength(50)]
        public string Naziv { get; set; }

        [Required]
        [MaxLength(200)]
        public string Citat { get; set; }

        [Required]
        public string Logo{get;set;}
        
        [JsonIgnore]
        public List<Jelo>listaRecepata{ get; set; }

        [JsonIgnore]
        public List<Saveti> Saveti { get; set; }

        [JsonIgnore]
        public List<Pice> KuvarPica { get; set; }
    }
}