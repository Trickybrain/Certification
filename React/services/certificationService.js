import axios from "axios";
import * as serviceHelpers from "./serviceHelpers";
import debug from "sabio-debug";

let certService = {
    endpoint: `${serviceHelpers.API_HOST_PREFIX}/api/certifications`,
};

const _logger = debug.extend("Certification");

certService.add = (payload) => {
    const config = {
        method: "POST",
        url: certService.endpoint,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config)
        .then(serviceHelpers.onGlobalSuccess)
        .catch(serviceHelpers.onGlobalError);
};

certService.getByOrgIdPaginate = (pageIndex, pageSize, orgId) => {
    _logger("getByOrgIdPaginate start");
    const config = {
        method: "GET",
        url: `${certService.endpoint}/orgId?orgId=${orgId}&PageIndex=${pageIndex}&PageSize=${pageSize}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config)
        .then(serviceHelpers.onGlobalSuccess)
        .catch(serviceHelpers.onGlobalError);
};

certService.getByOrgIdNoPag = (orgId) => {
    _logger("getByOrgIdPaginate start");
    const config = {
        method: "GET",
        url: `${certService.endpoint}/OrgId/${orgId}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config)
        .then(serviceHelpers.onGlobalSuccess)
        .catch(serviceHelpers.onGlobalError);
};

certService.searchPaginate = (pageIndex, pageSize, query) => {
    _logger("getByOrgIdPaginate start");
    const config = {
        method: "GET",
        url: `${certService.endpoint}/search?query=${query}&PageIndex=${pageIndex}&PageSize=${pageSize}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config)
        .then(serviceHelpers.onGlobalSuccess)
        .catch(serviceHelpers.onGlobalError);
};

certService.update = (payload) => {
    const config = {
        method: "PUT",
        url: `${certService.endpoint}/${payload.id}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config);
}

certService.deleteCert = (id) => {
    const config = {
        method: "DELETE",
        url: `${certService.endpoint}/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config)
        .then(() => {
            return id;
        })
        .catch(serviceHelpers.onGlobalError);
}


export default certService;
