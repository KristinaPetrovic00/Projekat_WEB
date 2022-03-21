using Microsoft.EntityFrameworkCore.Migrations;

namespace Projekat_WEB.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Jedinice",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Jedinice", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Kuvar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Citat = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Logo = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kuvar", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "NutritivneVrednosti",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Kalorije = table.Column<int>(type: "int", nullable: false),
                    KalorijeProcenti = table.Column<int>(type: "int", nullable: false),
                    KalorijeObjasnjenje = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Masti = table.Column<int>(type: "int", nullable: false),
                    MastiProcenti = table.Column<int>(type: "int", nullable: false),
                    MastiObjasnjenje = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Zasicenje = table.Column<int>(type: "int", nullable: false),
                    ZasicenjeProcenti = table.Column<int>(type: "int", nullable: false),
                    ZasicenjeObjasnjenje = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Seceri = table.Column<int>(type: "int", nullable: false),
                    SeceriProcenti = table.Column<int>(type: "int", nullable: false),
                    SeceriObjasnjenje = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Soli = table.Column<int>(type: "int", nullable: false),
                    SoliProcenti = table.Column<int>(type: "int", nullable: false),
                    SoliObjasnjenje = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Proteini = table.Column<int>(type: "int", nullable: false),
                    ProteiniProcenti = table.Column<int>(type: "int", nullable: false),
                    ProteiniObjasnjenje = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UgljeniHidrati = table.Column<int>(type: "int", nullable: false),
                    UgljeniHidratiProcenti = table.Column<int>(type: "int", nullable: false),
                    UgljeniHidratiObjasenjenje = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Vlakna = table.Column<int>(type: "int", nullable: false),
                    VlaknaObjasnjenje = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NutritivneVrednosti", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Sastojci",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sastojci", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Slozenost",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Slozenost", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Tipovi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tipovi", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Pica",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    SlikaPica = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PiceKuvarID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pica", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Pica_Kuvar_PiceKuvarID",
                        column: x => x.PiceKuvarID,
                        principalTable: "Kuvar",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Saveti",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naslov = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Tekst = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Slika = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SavetiKuvarID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Saveti", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Saveti_Kuvar_SavetiKuvarID",
                        column: x => x.SavetiKuvarID,
                        principalTable: "Kuvar",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PodTipovi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    TipID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PodTipovi", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PodTipovi_Tipovi_TipID",
                        column: x => x.TipID,
                        principalTable: "Tipovi",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Jela",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PodTipID = table.Column<int>(type: "int", nullable: false),
                    KratakOpis = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Vreme = table.Column<int>(type: "int", nullable: false),
                    BrojPorcija = table.Column<int>(type: "int", nullable: false),
                    PorcijaGram = table.Column<int>(type: "int", nullable: false),
                    Postupak = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Serviranje = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SlozenostID = table.Column<int>(type: "int", nullable: false),
                    BezGlutena = table.Column<bool>(type: "bit", nullable: false),
                    PreporucenoPiceID = table.Column<int>(type: "int", nullable: false),
                    ForeignKeyNV = table.Column<int>(type: "int", nullable: false),
                    SavetZaJelo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KuvarID = table.Column<int>(type: "int", nullable: true),
                    Video = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    SlikaJela = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Jela", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Jela_Kuvar_KuvarID",
                        column: x => x.KuvarID,
                        principalTable: "Kuvar",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Jela_NutritivneVrednosti_ForeignKeyNV",
                        column: x => x.ForeignKeyNV,
                        principalTable: "NutritivneVrednosti",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Jela_Pica_PreporucenoPiceID",
                        column: x => x.PreporucenoPiceID,
                        principalTable: "Pica",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Jela_PodTipovi_PodTipID",
                        column: x => x.PodTipID,
                        principalTable: "PodTipovi",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Jela_Slozenost_SlozenostID",
                        column: x => x.SlozenostID,
                        principalTable: "Slozenost",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JelaSastojci",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JeloID = table.Column<int>(type: "int", nullable: true),
                    SastojakID = table.Column<int>(type: "int", nullable: true),
                    Kolicina = table.Column<int>(type: "int", nullable: false),
                    KolicinaJedinicaID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JelaSastojci", x => x.ID);
                    table.ForeignKey(
                        name: "FK_JelaSastojci_Jedinice_KolicinaJedinicaID",
                        column: x => x.KolicinaJedinicaID,
                        principalTable: "Jedinice",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JelaSastojci_Jela_JeloID",
                        column: x => x.JeloID,
                        principalTable: "Jela",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_JelaSastojci_Sastojci_SastojakID",
                        column: x => x.SastojakID,
                        principalTable: "Sastojci",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Jela_ForeignKeyNV",
                table: "Jela",
                column: "ForeignKeyNV",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Jela_KuvarID",
                table: "Jela",
                column: "KuvarID");

            migrationBuilder.CreateIndex(
                name: "IX_Jela_PodTipID",
                table: "Jela",
                column: "PodTipID");

            migrationBuilder.CreateIndex(
                name: "IX_Jela_PreporucenoPiceID",
                table: "Jela",
                column: "PreporucenoPiceID");

            migrationBuilder.CreateIndex(
                name: "IX_Jela_SlozenostID",
                table: "Jela",
                column: "SlozenostID");

            migrationBuilder.CreateIndex(
                name: "IX_JelaSastojci_JeloID",
                table: "JelaSastojci",
                column: "JeloID");

            migrationBuilder.CreateIndex(
                name: "IX_JelaSastojci_KolicinaJedinicaID",
                table: "JelaSastojci",
                column: "KolicinaJedinicaID");

            migrationBuilder.CreateIndex(
                name: "IX_JelaSastojci_SastojakID",
                table: "JelaSastojci",
                column: "SastojakID");

            migrationBuilder.CreateIndex(
                name: "IX_Pica_PiceKuvarID",
                table: "Pica",
                column: "PiceKuvarID");

            migrationBuilder.CreateIndex(
                name: "IX_PodTipovi_TipID",
                table: "PodTipovi",
                column: "TipID");

            migrationBuilder.CreateIndex(
                name: "IX_Saveti_SavetiKuvarID",
                table: "Saveti",
                column: "SavetiKuvarID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JelaSastojci");

            migrationBuilder.DropTable(
                name: "Saveti");

            migrationBuilder.DropTable(
                name: "Jedinice");

            migrationBuilder.DropTable(
                name: "Jela");

            migrationBuilder.DropTable(
                name: "Sastojci");

            migrationBuilder.DropTable(
                name: "NutritivneVrednosti");

            migrationBuilder.DropTable(
                name: "Pica");

            migrationBuilder.DropTable(
                name: "PodTipovi");

            migrationBuilder.DropTable(
                name: "Slozenost");

            migrationBuilder.DropTable(
                name: "Kuvar");

            migrationBuilder.DropTable(
                name: "Tipovi");
        }
    }
}
