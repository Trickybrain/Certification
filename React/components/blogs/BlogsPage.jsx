import React, { useEffect, useState } from "react";
import blogsService from "../../services/blogsService";
import BlogsCard from "./BlogsCard";
import debug from "sabio-debug";
import toastr from "toastr";
import "./blogs.css";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import lookUpService from "../../services/lookUpService";
import Dropdown from "react-bootstrap/Dropdown";
import PropTypes from "prop-types";

const _logger = debug.extend("BlogsPage");

function BlogsPage(props) {
  const currentUser = props.currentUser;
  const [selectedBlogType, setSelectedBlogType] = useState("");

  const [pageData, setPageData] = useState({
    blogs: [],
    blogComponents: [],
  });

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    totalCount: 0,
    pageSize: 6,
    currentPage: 1,
  });

  const [blogTypes, setBlogTypes] = useState({
    blogTypesObject: [],
    blogTypesComponents: [],
  });

  useEffect(() => {
    lookUpService
      .LookUp(["BlogTypes"])
      .then(onGetBlogTypesSuccess)
      .catch(onGetBlogTypesFail);
  }, []);

  useEffect(() => {
    if (selectedBlogType !== "") {
      blogsService
        .getByBlogType(
          pagination.pageIndex,
          pagination.pageSize,
          selectedBlogType
        )
        .then(onGetBlogSuccess)
        .catch(onGetBlogError);
    }
  }, [pagination.pageIndex, pagination.pageSize, selectedBlogType]);

  useEffect(() => {
    if (selectedBlogType === "") {
      blogsService
        .getBlog(pagination.pageIndex, pagination.pageSize)
        .then(onGetBlogSuccess)
        .catch(onGetBlogError);
    }
  }, [pagination.pageIndex, selectedBlogType]);

  const handleDelete = (aBlog) => {
    blogsService
      .deleteBlog(aBlog)
      .then(onDeleteBlogSuccess)
      .catch(onDeleteBlogError);
  };

  const onDeleteBlogSuccess = (id) => {
    toastr.success("Blog deleted");
    setPageData((prevState) => {
      const pd = { ...prevState };
      const index = pd.blogs.findIndex((blog) => blog.id === id);
      let updatedBlogs = [...pd.blogs];
      if (index >= 0) {
        updatedBlogs.splice(index, 1);
      }
      pd.blogs = updatedBlogs;
      pd.blogComponents = updatedBlogs.map(mapBlog);

      return pd;
    });
  };

  const onDeleteBlogError = (error) => {
    toastr.error("Failed to delete blog");
    _logger(error);
  };

  const onGetBlogTypesSuccess = (res) => {
    let blogTypesArray = res.item.blogTypes;
    setBlogTypes(() => {
      const newBlogTypes = {
        blogTypesObject: blogTypesArray,
        blogTypesOptions: blogTypesArray.map((blogType) => {
          return (
            <option key={blogType.id} value={blogType.name}>
              {blogType.name}
            </option>
          );
        }),
      };
      newBlogTypes.blogTypesComponents = newBlogTypes.blogTypesOptions.map(
        (item, index) => (
          <Dropdown.Item key={index} onClick={handleBlogTypeChange}>
            <strong>{item}</strong>
          </Dropdown.Item>
        )
      );

      return newBlogTypes;
    });
  };

  const onGetBlogTypesFail = (err) => {
    toastr.error("get blogs failed");
    _logger(err);
  };

  const handleBlogTypeChange = (event) => {
    event.preventDefault();
    setSelectedBlogType(event.target.value);
  };

  const handleAllBlogs = () => {
    _logger("handleallblogs");
    setSelectedBlogType("");
  };

  const onGetBlogSuccess = (res) => {
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.blogs = res.item.pagedItems;
      pd.blogComponents = res.item.pagedItems.map(mapBlog);
      setPagination((prevPagination) => {
        return {
          ...prevPagination,
          totalCount: res.item.totalCount,
        };
      });
      return pd;
    });
  };

  const onGetBlogError = (err) => {
    toastr.error("get blogs failed");
    _logger(err);
  };

  const mapBlog = (aBlog) => {
    if (aBlog.blogType.name === selectedBlogType || selectedBlogType === "")
      return (
        <BlogsCard
          currentUser={currentUser}
          blog={aBlog}
          key={aBlog.id}
          onDeleteClicked={handleDelete}
        />
      );
  };

  const onChange = (pIndex, pageSize) => {
    setPagination({
      ...pagination,
      pageIndex: pIndex - 1,
      pageSize,
      currentPage: pIndex,
    });
  };

  return (
    <>
      <div className="blogs-preview-container ">
        <div className="pt-9 pb-9 bg-purple ">
          <div className="container">
            <div className="container p-3 text-left">
              <div className="row">
                <div>
                  <div>
                    <Dropdown>
                      <Dropdown.Toggle className="bg-black" id="dropdown-basic">
                        {selectedBlogType || "All"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={handleAllBlogs}>
                          <strong>All</strong>
                        </Dropdown.Item>
                        {blogTypes.blogTypesComponents}
                      </Dropdown.Menu>
                    </Dropdown>

                    <div className="nav justify-content-center">
                      {(currentUser.roles.includes("SysAdmin") ||
                        currentUser.roles.includes("Blogger")) && (
                        <a
                          className="ps-0 nav-link active nav-color"
                          href="/blogs/add"
                        >
                          Create a blog
                        </a>
                      )}
                      <a className="nav-link nav-color" href="/blogs">
                        View blogs
                      </a>
                    </div>
                    <div className="col-xl-10 col-lg-10 col-md-12 col-sm-12 offset-xl-1 offset-lg-1">
                      <div className="text-center mb-5">
                        <h1 className=" display-2 fw-bold">
                          ReParrot Newsroom
                        </h1>
                        <p className="lead">
                          Your place for all your auto information needs.
                        </p>
                      </div>

                      <div className="row ">{pageData.blogComponents}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        onChange={onChange}
        current={pagination.currentPage}
        total={pagination.totalCount}
        pageSize={pagination.pageSize}
        locale={locale}
        className="pagination justify-content-center"
      />
    </>
  );
}

BlogsPage.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    isLoggedIn: PropTypes.bool,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default BlogsPage;
