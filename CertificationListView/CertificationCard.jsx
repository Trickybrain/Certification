import React from "react";
import PropTypes from "prop-types";
import debug from "sabio-debug";
import "./css/stylesheet.css";
import useCollapse from "react-collapsed";

const _logger = debug.extend("CertRenderListView");

function CertificationCard(props) {
  _logger("CertificationCard Render at start", props);
  const singleList = props.cert;

  const {getCollapseProps, getToggleProps, isExpanded} = useCollapse();

  const onLocalClickedForEdit = (e) => {
    e.preventDefault();
    props.onCertClickedForEdit(singleList);
  };

  const onLocalClickedForDelete = (e) => {
    e.preventDefault();
    props.onCertClickedForDelete(singleList);
  };

  let dateAdded = singleList.dateCreated.split("T")[0];
  let expirationDate = singleList.expirationDate
    ? singleList.expirationDate.split("T")[0]
    : "Expiration Date not listed";

  let createdBy = singleList.createdBy.firstName
    ? singleList.createdBy.firstName
    : singleList.createdBy.lastName;
  let dateCreated = singleList.dateCreated.split("T")[0]
  let dateModified = singleList.dateCreated.split("T")[0]
  let certDescription = singleList.description
    ? singleList.description
    : "Currently there is no information about the certification";
  return (
    <div
      className="card mt-4 card-background-color cert-library heading-section"
      key={singleList.id}>
      <div className="item-cert mb-5">
        <ul>
          <h3 className="h3-cert">{singleList.name.toUpperCase()}</h3>
          <li>
            <h4 className="h4-cert">Expiration Date:</h4>
            <span>{expirationDate}</span>
          </li>
          <li>
            <h4 className="h4-cert ms-2">Date Added:</h4>
            <span className="ms-2">{dateAdded}</span>
          </li>
          <li>
            <h4 className="h4-cert">Created By:</h4>
            <span>{createdBy}</span>
          </li>
          <li>
            <div className="main-border-button">
              {" "}
              <button
                type="button"
                className="link-btn btn btn-primary mb-5 ms-10"
                id="editId"
                onClick={onLocalClickedForEdit}>
                Edit
              </button>
            </div>
          </li>
          <li>
            <div className="main-border-button ">
              {" "}
              <button
                type="button"
                className="link-btn btn btn-danger mb-5 ms-10 "
                id="deleteId"
                onClick={onLocalClickedForDelete}>
                Delete
              </button>
            </div>
          </li>

          <div className="collapsible">
            <div className="main-button main-button-cert" {...getToggleProps()}>
              <button
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
                className="mt-1"
                type="button">
                {isExpanded ? "Collapse" : "View Certification Info"}
              </button>
            </div>
            <div {...getCollapseProps()}>
              <div className="mt-14 row">
                <div>
                  <h2 className="h2-cert text-center mb-3">
                    Certification Description:
                  </h2>
                  <span className="descrip ">{certDescription}</span>
                </div>
                <div className="row">
                  <div className="col-xs-12 col-md-8 mt-5">
                    <div>
                      <h6 className="h6-cert">Date Created: </h6>
                      <span className="descrip">{dateCreated}</span>
                    </div>
                  </div>
                  <div className="col-xs-6 col-md-4 mt-5">
                    <div>
                      <h6 className="h6-cert">Date Modidfied: </h6>
                      <span className="descrip">{dateModified}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}

CertificationCard.propTypes = {
  cert: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    expirationDate: PropTypes.string.isRequired,
    createdBy: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
    organization: PropTypes.shape({
      name: PropTypes.string,
      organizationType: PropTypes.shape({
        name: PropTypes.string,
      }),
      businessPhone: PropTypes.string,
      description: PropTypes.string,
    }),
    dateCreated: PropTypes.string.isRequired,
    dateModified: PropTypes.string.isRequired,
  }),
  onCertClickedForEdit: PropTypes.func,
  onCertClickedForDetail: PropTypes.func,
  onCertClickedForDelete: PropTypes.func,
};

export default React.memo(CertificationCard);
