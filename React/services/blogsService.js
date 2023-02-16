import axios from "axios";
import * as serviceHelpers from "./serviceHelpers";
import debug from "sabio-debug";
import {
  onGlobalError,
  onGlobalSuccess,
  API_HOST_PREFIX,
} from "./serviceHelpers";

const _logger = debug.extend("blogService");

const endpoint = { blogUrl: `${API_HOST_PREFIX}/api/blogs` };

const getBlog = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint.blogUrl}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const addBlogs = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint.blogUrl}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getByBlogType = (pageIndex, pageSize, blogTypeId) => {
  _logger("getByBlogType", pageIndex, pageSize, blogTypeId);
  const config = {
    method: "GET",
    url: `${endpoint.blogUrl}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}&blogtype=${blogTypeId}`,
    data: blogTypeId,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getEditBlog = (blogId) => {
  const config = {
    method: "GET",
    url: `${endpoint.blogUrl}/${blogId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const editBlog = (blogId, payload) => {
  const config = {
    method: "PUT",
    url: `${endpoint.blogUrl}/${blogId}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const deleteBlog = (blogId) => {
  const config = {
    method: "DELETE",
    url: `${endpoint.blogUrl}/${blogId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(() => blogId)
    .catch(onGlobalError);
};

const searchBlogs = (pageIndex, pageSize, query) => {
  const config = {
    method: "GET",
    url: `${endpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(serviceHelpers.onGlobalSuccess)
    .catch(serviceHelpers.onGlobalError);
};

const blogsService = {
  addBlogs,
  getEditBlog,
  editBlog,
  getBlog,
  deleteBlog,
  searchBlogs,
  getByBlogType,
};
export default blogsService;
