import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";

const BlogsPreviewPage = (props) => {
  const _logger = debug.extend("blogs");

  _logger(props);
  const { state } = useLocation();
  const [aBlog, setBlogArticle] = useState({
    title: "",
    subject: "",
    content: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (state?.type === "BLOG_VIEW") {
      setBlogArticle((prevState) => {
        let newData = { ...prevState };
        newData = state.payload;
        _logger("new Data", newData);
        return newData;
      });
    }
  }, []);

  return (
    <React.Fragment>
      {state?.type === "BLOG_VIEW" ? (
        <>
          <div className="text-center mb-5">
            <div className="row py-12 bg-dark landing-bg-image">
              <div className="d-flex justify-content-evenly">
                <h1>preview..</h1>
                <div className="d-flex col-xl-6 col-md-8 col-12">
                  <div className="card-body">
                    <div className="p-lg-6 card">
                      <div className="row">
                        <h1 className="card-title mb-3 col-12 text-center">
                          {aBlog.title}
                        </h1>
                        <h3 className="card-text">{aBlog.subject}</h3>

                        <h1 className="card-text">{aBlog.content}</h1>
                        <img
                          className="rounded-top-md img-fluid"
                          src={aBlog.imageUrl}
                          alt=""
                        ></img>
                        <div className="card-text"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="card-body">
          <div className="p-lg-6 card blogform-card-shadow">
            <div className="row">
              <h1 className="card-title mb-3 col-12">{props.blog?.title}</h1>
              <h3 className="card-text">{props.blog?.subject}</h3>
              <h6
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(props.blog?.content),
                }}
              ></h6>
              <img
                className="rounded-top-md img-fluid"
                src={props.blog?.imageUrl}
                alt=""
              ></img>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
BlogsPreviewPage.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    subject: PropTypes.string.isRequired,
  }).isRequired,
};
export default BlogsPreviewPage;
