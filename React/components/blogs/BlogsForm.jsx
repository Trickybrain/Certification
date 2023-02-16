import React, { useState, useEffect } from "react";
import toastr from "toastr";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import debug from "sabio-debug";
import blogsSchema from "../../schemas/blogsSchema";
import lookUpService from "./../../services/lookUpService";
import blogsService from "./../../services/blogsService";
import FileUpload from "components/fileupload/FileUpload";
import "./blogs.css";
import BlogPrev from "./BlogFormPreview";

function BlogsForm() {
  const { id: blogId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const _logger = debug.extend("blogs");
  const [formData, setFormData] = useState({
    blogTypeId: 1,
    title: "",
    subject: "",
    content: "",
    imageUrl: "",
  });

  const [blogTypes, setBlogTypes] = useState({
    blogTypesObject: [],
    blogTypesComponents: [],
  });

  const submitHandler = (values) => {
    _logger(values);

    if (state && blogId) {
      handleEdit(values);
    } else {
      handleAdd(values);
    }
  };

  const handleEdit = (values) => {
    blogsService
      .editBlog(blogId, values)
      .then(handleEditSuccess)
      .catch(handleEditError);
  };

  const handleEditSuccess = () => {
    toastr.success("edit successful");
    navigate("/blogs");
  };

  const handleEditError = (response) => {
    toastr.error("Unable to edit blog");
    _logger({ error: response });
  };

  const handleAdd = (values) => {
    blogsService.addBlogs(values).then(handleAddSuccess).catch(handleAddError);
  };

  const handleAddSuccess = () => {
    toastr.success("submission added!");
    navigate("/blogs");
  };

  const handleAddError = (err) => {
    toastr.error("submission failed");
    _logger(err);
  };

  useEffect(() => {
    lookUpService
      .LookUp(["BlogTypes"])
      .then(onGetBlogTypesSuccess)
      .catch(onGetBlogTypesFail);
  }, []);

  const onGetBlogTypesSuccess = (res) => {
    _logger(res);
    let blogTypesArray = res.item.blogTypes;
    setBlogTypes((prevState) => {
      const blogTypes = { ...prevState };
      blogTypes.blogTypesObject = blogTypesArray;
      blogTypes.blogTypesComponents = blogTypesArray.map(mapBlogTypes);
      return blogTypes;
    });
  };

  const onGetBlogTypesFail = (err) => {
    toastr.error("get blogs failed");

    _logger(err);
  };

  const mapBlogTypes = (blogType) => {
    return (
      <option key={blogType.id} value={blogType.id}>
        {blogType.name}
      </option>
    );
  };

  useEffect(() => {
    if (state?.type === "EDIT_BLOG" && state.payload) {
      _logger(state.payload);
      setFormData((prevState) => {
        const newState = { ...prevState };
        newState.blogTypeId = state.payload.blogType.id;
        newState.title = state.payload.title;
        newState.subject = state.payload.subject;
        newState.content = state.payload.content;
        newState.imageUrl = state.payload.imageUrl;
        return newState;
      });
    }
  }, [state]);

  return (
    <div className="blog-edit">
      <div className="row">
        <div className="nav justify-content-center">
          <a className="ps-0 nav-link active nav-color" href="/blogs/add">
            Create a blog
          </a>
          <a className="nav-link nav-color" href="/blogs">
            View blogs
          </a>
        </div>
        <div className="text-center mb-5">
          <h1 className=" display-2 fw-bold">ReParrot Newsroom</h1>
          <p className="lead">
            Your place for all your auto information needs.
          </p>
        </div>
      </div>
      <div className="container mx-auto card">
        <Formik
          initialValues={formData}
          enableReinitialize={true}
          validationSchema={blogsSchema}
          onSubmit={submitHandler}
        >
          {({ setFieldValue, values }) => (
            <div className="row">
              <div className="col-md-6 p-4">
                <Form>
                  <div className="">
                    <div className="mb-3">
                      <label htmlFor="BlogTypeId" className="form-label">
                        Blog Type
                      </label>
                      <Field
                        component="select"
                        name="blogTypeId"
                        className="form-control"
                        placeholder="Select Blog Type"
                      >
                        {blogTypes.blogTypesComponents}
                      </Field>
                      <ErrorMessage
                        name="blogTypeId"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Title
                      </label>
                      <Field
                        name="title"
                        type="text"
                        placeholder="Title"
                        className="form-control form-control-lg"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="subject" className="form-label">
                        Subject
                      </label>
                      <Field
                        name="subject"
                        type="text"
                        placeholder="Subject"
                        className="form-control form-control-lg"
                      />
                      <ErrorMessage
                        name="subject"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="content" className="form-label">
                        Content
                      </label>
                      <div className="form-group">
                        <CKEditor
                          editor={ClassicEditor}
                          data={formData.content}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setFieldValue("content", data);
                          }}
                          className="ck-editor__editable_inline"
                        />

                        <ErrorMessage
                          name="content"
                          component="div"
                          className="alert alert-danger"
                        />
                      </div>
                      <div className="mb-3 spacing-img">
                        <label htmlFor="file" className="form-label">
                          Image URL
                        </label>
                        <FileUpload
                          name="image"
                          fileUploadSuccess={(files) => {
                            setFieldValue("imageUrl", files[0]?.url);
                          }}
                          className="form-control form-control-lg"
                        />
                        <p>{values.imageUrl}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary mx-auto d-block"
                    >
                      <i className="fa fa-save mr-2 " />{" "}
                      {blogId ? "Submit" : "Submit"}
                    </button>
                  </div>
                </Form>
              </div>
              <div className="col-md-6">
                {<BlogPrev blog={values} blogTypes={blogTypes.list} />}
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}

BlogsForm.propTypes = {
  formData: PropTypes.shape({
    blogTypeId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }),
};

export default BlogsForm;
