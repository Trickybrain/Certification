using Sabio.Models;
using Sabio.Models.Domain.Certifications;
using Sabio.Models.Domain.Organizations;
using Sabio.Models.Requests.Certifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface ICertificationsService
    {
        Certification GetById(int id);
        List<Certification> GetByOrgIdNoPaginate(int orgId);
        Paged<Certification> GetByName(int pageIndex, int pageSize, string name);
        Paged<Certification> GetByOrgId(int pageIndex, int pageSize, int orgId);
        Paged<Certification> Search(int pageIndex, int pageSize, string query);
        void Update(CertificationsUpdateRequest model, int userId);
        int Add(CertificationsAddRequest model, int userId);
        void Delete(int id);
    }
}
