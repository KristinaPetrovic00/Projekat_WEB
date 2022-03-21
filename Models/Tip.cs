using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Tip
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(30)]
        [RegularExpression(@"^[a-zA-Z0-9_ ]*$")]
        public string Naziv { get; set; }

        [Required]
        public List<PodTip> PodTip { get; set; }

    }
}