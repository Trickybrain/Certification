using Sabio.Models.Domain.Files;
using Sabio.Models.Domain.Organizations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Certifications
{
    public class Certification
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }

        public OrganizationBase Organization { get; set; }
        public File File { get; set; }

        public DateTime ExpirationDate { get; set; }

        public BaseUser CreatedBy { get; set; }

        public BaseUser ModifiedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
