using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Certifications
{
    public class CertificationsAddRequest
    {
        [Required]
        [StringLength(200, MinimumLength =2)]
        public string Name { get; set; }
        
        public string Description { get; set; }
        [Required]
        [Range(1,int.MaxValue)]
        public int OrganizationId { get; set; }
        public int FileId { get; set; }
        public DateTime ExpirationDate { get; set; }


    }
}
