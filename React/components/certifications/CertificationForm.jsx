import React, {useState, useEffect} from "react";
import debug from "sabio-debug";
import toastr from "toastr";
import certService from "services/certificationService";
import {useFormik} from "formik";
import {
  Container,
  Col,
  Row,
  Card,
  Form,
  FormGroup,
  Button,
} from "react-bootstrap";
import FileUpload from "../fileupload/FileUpload";
import {useNavigate, useLocation} from "react-router-dom";
import PropTypes from "prop-types";
import CertificationFormSchema from "schemas/certificationFormSchema";
import orgService from "../../services/organizationService";

const _logger = debug.extend("Certification");

function CertificationForm(props) {
  _logger("CertificationForm", props);
  const [certFormData, setCertFormData] = useState({
    id:0,
    name: "",
    description: "",
    organizationId: 0,
    fileId: 0,
    fileUrl: "",
    expirationDate: "",
  });

  const [isCreatingNew, setIsCreatingNew] = useState(true);
  const navigate = useNavigate();
  const {state} = useLocation();


  useEffect(() => {
    orgService
      .getByUserIdV4(props.currentUser.id)
      .then(onOrgIdByUserIdSuccess)
      .catch(onOrgIdByUserIdError);
    _logger("useEffect pathname", state);
    if (
      state?.type === "CERT_EDIT" &&
      state.payload 
    ) {
      setCertFormData((prevState) => {
        const newFormData = {...prevState};
        _logger("setCertFormData", state);
        newFormData.id = state.payload.id;
        _logger("id good", newFormData);
        newFormData.name = state.payload.name;
        newFormData.description = state.payload.description;
        newFormData.organizationId = state.payload.organization.id;
        newFormData.fileId = state.payload.file.id;
        newFormData.fileUrl = state.payload.file.url;
        newFormData.expirationDate = state.payload.expirationDate.split("T")[0];
        _logger("data transfer good", newFormData);
        return newFormData;
      });

      setIsCreatingNew(false);
    }
  }, [state]);

  const onSubmit = (values) => {
    _logger("Current onSubmit value", values);
    if (!isCreatingNew) {
      _logger("onSubmit edit", values);

      certService.update(values).then(onEditSuccess).catch(onEditError);
    } else {
      certService.add(values).then(onAddCertSuccess).catch(onAddCertError);
    }
  };

  const Formik = useFormik({
    initialValues: certFormData,
    enableReinitialize: true,
    validationSchema: CertificationFormSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit,
  });



  const onOrgIdByUserIdSuccess = (response) => {
    _logger("onOrgIdByUserIdSuccess1", response);
    setCertFormData((prevState)=>{
      const newFormData = {...prevState};
      newFormData.organizationId = response.item[0].id;
      return newFormData;
    })
  };

  const onAddCertSuccess = () => {
    toastr.success("Certification successfully added!");
    onCertRequested();
  };

  const onEditSuccess = (response) => {
    _logger("success", response);
    toastr.success("Certification edited successfully!");
    onCertRequested();
  };

  const onCertRequested = () => {
    _logger("onCertRequested");
    navigate(`/certification/listview`);
  };

  const fileUploadSuccess = (value) => {
    _logger("fileupload value", value);
    setCertFormData((prevState) => {
      const pd = {...prevState};
      pd.fileUrl = value[0].url;
      pd.fileId = value[0].id;
      return pd;
    });
  };

  const onAddCertError = () => {
    toastr.error("Something went wrong!");
  };

  const onOrgIdByUserIdError = (response) => {
    _logger("onGetCurrentUserError", response);
    toastr.error("Error");
  };

  const onEditError = () => {
    toastr.error("Something went wrong!");
  };

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Card>
            <Card.Header className="text-align-center">
              {isCreatingNew ? (
                <h1>Add Your Businesses Certification / License Here</h1>
              ) : (
                <h1>Update Your Businesses Certification / License Here</h1>
              )}
            </Card.Header>
            <Card.Body>
              <Form onSubmit={Formik.handleSubmit}>
                <Row className="mb-4">
                  <FormGroup as={Col} md="12">
                    <Form.Label>
                      Name:<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      className="form-control"
                      rows="1"
                      id="name"
                      name="name"
                      value={Formik.values.name}
                      onChange={Formik.handleChange}
                      placeholder="Name"
                    />
                    {Formik.errors.name ? (
                      <div>{Formik.errors.name}</div>
                    ) : null}
                  </FormGroup>
                </Row>
                <Row className="mb-5">
                  <FormGroup as={Col} md="6">
                    <Form.Label>Expiration Date:</Form.Label>
                    <Form.Control
                      type="date"
                      name="expirationDate"
                      value={Formik.values.expirationDate}
                      onChange={Formik.handleChange}
                      placeholder="2023-01-01"
                    />
                    {Formik.errors.expirationDate ? (
                      <div>{Formik.errors.expirationDate}</div>
                    ) : null}
                  </FormGroup>
                  <FormGroup as={Col} md="6" className="ms-0">
                    <Form.Label>File Id:</Form.Label>
                    <FileUpload
                      fileUploadSuccess={fileUploadSuccess}></FileUpload>
                    {Formik.errors.fileId ? (
                      <div>{Formik.errors.fileId}</div>
                    ) : null}
                  </FormGroup>   
                </Row>

                <Row className="mb-4">
                  <Form.Group as={Col} md="12">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                      as="textarea"
                      className="form-control"
                      rows="4"
                      id="description"
                      name="description"
                      value={Formik.values.description}
                      onChange={Formik.handleChange}
                      placeholder="Provide a Description For Your Certification"
                    />
                    {Formik.errors.description ? (
                      <div>{Formik.errors.description}</div>
                    ) : null}
                  </Form.Group>
                </Row>
                <Row className="mt-3">
                  <Button variant="primary" type="submit" id="button">
                    {isCreatingNew ? "Submit" : "Update certification"}
                  </Button>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </React.Fragment>
  );
}

CertificationForm.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

export default CertificationForm;
