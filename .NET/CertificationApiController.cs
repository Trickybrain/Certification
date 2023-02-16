using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using Sabio.Models.Requests.Certifications;
using Sabio.Models.Domain.Certifications;
using Sabio.Services.Interfaces;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/certifications")]
    [ApiController]
    public class CertificationApiController : BaseApiController
    {
        private ICertificationsService _service = null;
        private IAuthenticationService<int> _authService = null;

        public CertificationApiController(ICertificationsService service
            , ILogger<CertificationApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Delete(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }


        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(CertificationsAddRequest model)
        {
            ObjectResult result = null;
            try
            {
                int userId = _authService.GetCurrentUserId();

                int id = _service.Add(model, userId);

                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }


            return result;
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(CertificationsUpdateRequest model)
        {
            int code = 200;

            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.Update(model, userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Certification>> GetById(int id)
        {

            int iCode = 200;
            BaseResponse response = null;
            try
            {
                Certification cert = _service.GetById(id);

                if (cert == null)
                {

                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");

                }
                else
                {
                    response = new ItemResponse<Certification>() { Item = cert };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }

            return StatusCode(iCode, response);

        }


        [HttpGet("OrgId/{id:int}")]
        public ActionResult<ItemsResponse<Certification>> GetByOrgIdNoPaginate(int id)
        {

            int iCode = 200;
            BaseResponse response = null;
            try
            {
                List<Certification> listCert = _service.GetByOrgIdNoPaginate(id);

                if (listCert == null)
                {

                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");

                }
                else
                {
                    response = new ItemsResponse<Certification> { Items = listCert };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }

            return StatusCode(iCode, response);

        }

        [HttpGet("name")]
        public ActionResult<ItemResponse<Paged<Certification>>> GetByName(int pageIndex, int pageSize, string name)
        {
            int code = 200;

            BaseResponse response = null;

            try
            {
                Paged<Certification> page = _service.GetByName( pageIndex, pageSize, name);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Certification>> { Item = page };

                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);

        }

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<Certification>>> Search(int pageIndex, int pageSize, string query)
        {
            int code = 200;

            BaseResponse response = null;

            try
            {
                Paged<Certification> page = _service.Search(pageIndex, pageSize, query);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Certification>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);

        }

        [HttpGet("orgId")]
        public ActionResult<ItemResponse<Paged<Certification>>> GetByOrgId(int pageIndex, int pageSize, int orgId)
        {
            int code = 200;

            BaseResponse response = null;

            try
            {
                Paged<Certification> page = _service.GetByOrgId(pageIndex, pageSize, orgId);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Certification>> { Item = page };

                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);

        }
    }
}
