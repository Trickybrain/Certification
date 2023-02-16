import React from "react";
import { useNavigate } from "react-router-dom";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import "./blogs.css";
function BlogsCard(props) {
  const _logger = debug.extend("BlogsCard");

  const navigate = useNavigate();
  const aBlog = props.blog;
  const onEditBlogClicked = (e) => {
    e.preventDefault();
    const state = { type: "EDIT_BLOG", payload: props.blog };
    navigate("/blogs/edit/" + aBlog.id, { state: state });
  };

  const onDeleteBlogClicked = (e) => {
    e.preventDefault();
    props.onDeleteClicked(aBlog.id);
  };

  _logger(aBlog);
  return (
    <div className="d-flex col-md-4 col-sm-6 col-xs-12 ">
      <div className="mb-4 shadow-lg card card-container ">
        <a href="/auto-info" className="blogs-main-card">
          <img
            src={aBlog.imageUrl}
            alt={aBlog.title}
            className="blog-img-card card-img-top rounded-top-md img-fluid"
          />
        </a>

        <div className="card-body">
          <a
            className="fs-5 fw-semi-bold d-block mb-3 text-primary"
            href="/auto-info"
          >
            {aBlog.blogType.name}
          </a>
          <h3>
            <a className="text-inherit" href="/auto-info">
              {aBlog.title}
            </a>
          </h3>
          <p>{aBlog.subject}</p>
          <h6
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(aBlog.content),
            }}
          ></h6>
          <div className="align-items-center g-0 mt-4 row">
            <div className="col lh-1 col">
              <h5 className="mb-1">Anonymous Blogger</h5>
              <p className="fs-6 mb-0"></p>
            </div>
          </div>
          {props.currentUser.roles.includes("SysAdmin") && (
            <div className="btn-group justify-content-center" role="group">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={onEditBlogClicked}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-dark"
                onClick={onDeleteBlogClicked}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

BlogsCard.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subject: PropTypes.string,
    content: PropTypes.string,
    blogType: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
  onDeleteClicked: PropTypes.string,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    isLoggedIn: PropTypes.bool,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default React.memo(BlogsCard);
