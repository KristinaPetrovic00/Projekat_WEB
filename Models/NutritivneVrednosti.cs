using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace Models
{
    public class NutritivneVrednosti
    {
        [Key]
        public int ID { get; set; }
    //KALORIJE
        [Required]
        [RegularExpression(@"\d+")]
        public int Kalorije { get; set; }
        [Required]
        [RegularExpression(@"\d+")]
        public int KalorijeProcenti { get; set; }
        [Required]
        [RegularExpression(@"^[a-zA-Z0-9_ ]*$")]
        public string KalorijeObjasnjenje{get;set;}
    //MASTI
        [Required]
        [RegularExpression(@"\d+")]
        public int Masti { get; set; }
        [Required]
        [RegularExpression(@"\d+")]
        public int MastiProcenti { get; set; }
        [Required]
        [RegularExpression(@"^[a-zA-Z0-9_ ]*$")]
        public string MastiObjasnjenje { get; set; }
    //ZASICENJE
        [Required]
        [RegularExpression(@"\d+")]
        public int Zasicenje { get; set; }
        [Required]
        [RegularExpression(@"\d+")]
        public int ZasicenjeProcenti { get; set; }
        [Required]
        [RegularExpression(@"^[a-zA-Z0-9_ ]*$")]
        public string  ZasicenjeObjasnjenje { get; set; }
    //SECERI
        [Required]
        [RegularExpression(@"\d+")]
        public int Seceri { get; set; }
        [Required]
        [RegularExpression(@"\d+")]
        public int SeceriProcenti { get; set; }
        [Required]
        [RegularExpression(@"^[a-zA-Z0-9_ ]*$")]
        public string SeceriObjasnjenje { get; set; }
    //SOLI
        [Required]
        [RegularExpression(@"\d+")]
        public int Soli { get; set; }
        [Required]
        [RegularExpression(@"\d+")]
        public int SoliProcenti { get; set; }
        [Required]
        [RegularExpression(@"^[a-zA-Z0-9_ ]*$")]
        public string SoliObjasnjenje { get; set; }
    //PROTEINI
        [Required]
        [RegularExpression(@"\d+")]
        public int Proteini { get; set; }
        [Required]
        [RegularExpression(@"\d+")]
        public int ProteiniProcenti { get; set; }
        [Required]
        [RegularExpression(@"^[a-zA-Z0-9_ ]*$")]
        public string ProteiniObjasnjenje { get; set; }
    //UGLJENI HIDRATI
        [Required]
        [RegularExpression(@"\d+")]
        public int UgljeniHidrati { get; set; }
        [Required]
        [RegularExpression(@"\d+")]
        public int UgljeniHidratiProcenti { get; set; }
        [Required]
        [RegularExpression(@"^[a-zA-Z0-9_ ]*$")]
        public string UgljeniHidratiObjasenjenje { get; set; }
    //VLAKNA
        [Required]
        [RegularExpression(@"\d+")]
        public int Vlakna { get; set; }
        //vlakna se ne izrazavaju u procentima
        [Required]
        [RegularExpression(@"^[a-zA-Z0-9_ ]*$")]
        public string VlaknaObjasnjenje { get; set; }

        public Jelo Jelo { get; set; }
    }
}