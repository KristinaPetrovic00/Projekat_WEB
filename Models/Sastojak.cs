using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    public class Sastojak
    {
    [Key]
    public int ID { get; set; }

    [Required]
    [RegularExpression(@"^[a-zA-Z0-9_ ]*$")]
    [MaxLength(20)]
    public string Naziv { get; set; }
    
    [JsonIgnore]
    public List<JeloSastojak> ListaJela {get;set;}

    }
}