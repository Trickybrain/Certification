using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Certifications;
using Sabio.Models.Domain.Files;
using Sabio.Models.Domain.Organizations;
using Sabio.Models.Domain.Schedules;
using Sabio.Models.Requests.Certifications;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Drawing.Printing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Sabio.Services
{
    public class CertificationsService : ICertificationsService
    {
        IDataProvider _data = null;


        public CertificationsService(IDataProvider data)
        {
            _data = data;
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[Certifications_Delete_ById]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                });
        }

        public int Add(CertificationsAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[Certifications_Insert]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);
                    col.AddWithValue("@CreatedBy", userId);
                }, returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object certId = returnCollection["@Id"].Value;
                    int.TryParse(certId.ToString(), out id);
                });
            return id;
        }

        public Certification GetById(int id)
        {
            string procName = "[dbo].[Certifications_Select_ById]";

            Certification cert = null;

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                cert = MapSingleCert(reader, ref index);
            });

            return cert;
        }
        public List<Certification> GetByOrgIdNoPaginate(int orgId)
        {
            string procName = "[dbo].[Certifications_Select_ByOrgId_NoPaginated]";

            List<Certification> listCert = null;

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@OrgId", orgId);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                Certification cert = MapSingleCert(reader, ref index);
                if(listCert == null)
                {
                    listCert = new List<Certification>();
                }
                listCert.Add(cert);
            });

            return listCert;
        }


        public Paged<Certification> GetByName(int pageIndex, int pageSize, string name)
        {
            string procName = "[dbo].[Certifications_Select_ByName_Paginated]";
            Paged<Certification> page = null;
            List<Certification> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                    col.AddWithValue("@Name", name);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;

                    Certification cert = MapSingleCert(reader, ref index);

                    if(totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(index++);
                    }
                    if(list == null)
                    {
                        list = new List<Certification>();
                    }
                    list.Add(cert);
                });

            if(list != null)
            {
                page = new Paged<Certification>(list,pageIndex,pageSize, totalCount);
            }

            return page;
        }

        public Paged<Certification> Search(int pageIndex, int pageSize, string query)
        {
            string procName = "[dbo].[Certifications_Search]";
            Paged<Certification> page = null;
            List<Certification> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                    col.AddWithValue("@Query", query);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    Certification cert = MapSingleCert(reader, ref index);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(index++);
                    }
                    if (list == null) { list = new List<Certification>(); }
                    list.Add(cert);
                });
            if (list != null)
            {
                page = new Paged<Certification>(list, pageIndex, pageSize, totalCount);
            }

            return page;
        }

        public Paged<Certification> GetByOrgId(int pageIndex, int pageSize, int orgId)
        {
            string procName = "[dbo].[Certifications_Select_ByOrgId_Paginated]";
            Paged<Certification> page = null;
            List<Certification> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                    col.AddWithValue("@OrgId", orgId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;

                    Certification cert = MapSingleCert(reader, ref index);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(index++);
                    }
                    if (list == null)
                    {
                        list = new List<Certification>();
                    }
                    list.Add(cert);
                });

            if (list != null)
            {
                page = new Paged<Certification>(list, pageIndex, pageSize, totalCount);
            }

            return page;
        }

        public void Update(CertificationsUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Certifications_Update]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);

                col.AddWithValue("@Id", model.Id);
                col.AddWithValue("@ModifiedBy", userId);
            });
        }

        private void AddCommonParams(CertificationsAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@OrganizationId", model.OrganizationId);
            col.AddWithValue("@FileId", model.FileId);
            col.AddWithValue("@ExpirationDate", model.ExpirationDate);
        }
        private Certification MapSingleCert(IDataReader reader, ref int index)
        {
            Certification cert = new Certification();
            cert.Organization = new OrganizationBase();
            cert.Organization.OrganizationType = new LookUp();

            cert.Id = reader.GetSafeInt32(index++);
            cert.Name = reader.GetSafeString(index++);
            cert.Description = reader.GetString(index++);
            cert.ExpirationDate = reader.GetDateTime(index++);
            cert.DateCreated = reader.GetSafeDateTime(index++);
            cert.DateModified = reader.GetSafeDateTime(index++);
            cert.Organization.Id = reader.GetSafeInt32(index++);
            cert.Organization.OrganizationType.Id = reader.GetSafeInt32(index++);
            cert.Organization.OrganizationType.Name= reader.GetString(index++);
            cert.Organization.Name = reader.GetSafeString(index++);
            cert.Organization.Description = reader.GetSafeString(index++);
            cert.Organization.LogoUrl = reader.GetSafeString(index++);
            cert.Organization.BusinessPhone = reader.GetSafeString(index++);
            cert.Organization.PrimaryLocationId = reader.GetSafeInt32(index++);
            cert.Organization.SiteUrl = reader.GetSafeString(index++);

            cert.CreatedBy = new BaseUser();
            cert.CreatedBy.Id = reader.GetSafeInt32(index++);
            cert.CreatedBy.FirstName = reader.GetSafeString(index++);
            cert.CreatedBy.MI = reader.GetSafeString(index++);
            cert.CreatedBy.LastName = reader.GetSafeString(index++);
            cert.CreatedBy.AvatarUrl = reader.GetSafeString(index++);

            cert.ModifiedBy = new BaseUser();
            cert.ModifiedBy.Id = reader.GetSafeInt32(index++);
            cert.ModifiedBy.FirstName = reader.GetSafeString(index++);
            cert.ModifiedBy.MI = reader.GetSafeString(index++);
            cert.ModifiedBy.LastName = reader.GetSafeString(index++);
            cert.ModifiedBy.AvatarUrl = reader.GetSafeString(index++);

            cert.File = new File();
            cert.File.Id = reader.GetSafeInt32(index++);
            cert.File.Name = reader.GetSafeString(index++);
            cert.File.Url= reader.GetSafeString(index++);
            cert.File.DateCreated= reader.GetSafeDateTime(index++);
            cert.File.CreatedBy = new BaseUser();
            cert.File.CreatedBy.Id = reader.GetSafeInt32(index++);
            cert.File.CreatedBy.FirstName = reader.GetSafeString(index++);
            cert.File.CreatedBy.MI = reader.GetSafeString(index++);
            cert.File.CreatedBy.LastName = reader.GetSafeString(index++);
            cert.File.CreatedBy.AvatarUrl = reader.GetSafeString(index++);

            cert.File.FileType = new LookUp();
            cert.File.FileType.Id = reader.GetSafeInt32(index++);
            cert.File.FileType.Name= reader.GetSafeString(index++);

            return cert;
        }
    }
}
