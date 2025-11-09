using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Player")]
    public class Player
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public int JsyNumber { get; set; }
    }
}
