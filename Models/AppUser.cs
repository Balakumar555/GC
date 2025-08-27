using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("AppUser")]
    public class AppUser
    {
        [Key]
        public Guid? Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public DateTime? DOB { get; set; }
        public string? Gender { get; set; }
        public string? UserName { get; set; } = string.Empty;
        public string? Phone { get; set; }
        public string? Address { get; set; }

    }
}
