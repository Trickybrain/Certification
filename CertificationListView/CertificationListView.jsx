import React, {useState, useEffect} from "react";
import certService from "../../services/certificationService";
import toastr from "toastr";
import CertRenderListView from "./CertificationCard";
import {useCallback} from "react";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import debug from "sabio-debug";
import "./css/stylesheet.css";
import {useNavigate} from "react-router-dom";
import orgService from "../../services/organizationService";
import PropTypes from "prop-types";

const _logger = debug.extend("CertificationListView");

function CertificationListView(props) {
  _logger("CertificationListView", props);
  const [pageData, setPageData] = useState({
    arrayOfCert: [],
    certComponents: [],
    orgId: 0,
    pageIndex: 1,
    pageSize: 4,
    total: 0,
  });

  const navigate = useNavigate();

  const pagination = (current) => {
    _logger("pagination", current);
    setPageData((prevState) => {
      const newPage = {...prevState};
      newPage.pageIndex = current;
      return newPage;
    });
    certService
      .getByOrgIdPaginate(current - 1, pageData.pageSize, pageData.orgId)
      .then(onGetCertSuccess)
      .catch(onGetCertError);
  };

  useEffect(() => {
    orgService
      .getByUserIdV4(props.currentUser.id)
      .then(onOrgIdByUserIdSuccess)
      .catch(onOrgIdByUserIdError);
  }, []);

  const onOrgIdByUserIdSuccess = (response) => {
    _logger("onOrgIdByUserIdSuccess", response);
    pageData.orgId = response.items[0].id;
    certService
      .getByOrgIdPaginate(
        pageData.pageIndex - 1,
        pageData.pageSize,
        pageData.orgId
      )
      .then(onGetCertSuccess)
      .catch(onGetCertError);
  };

  const onGetCertSuccess = (response) => {
    setPageData((prevState) => {
      const arrayOfData = response.item.pagedItems;
      const pd = {...prevState};
      pd.total = response.item.totalCount;
      pd.arrayOfCert = arrayOfData;
      pd.certComponents = arrayOfData.map(mapString);
      return pd;
    });
  };

  const mapString = (cert) => {
    _logger("mapString", cert);
    return (
      <CertRenderListView
        cert={cert}
        key={cert.id}
        onCertClickedForDelete={onDeleteRequested}
        onCertClickedForEdit={onEditRequested}></CertRenderListView>
    );
  };

  const onEditRequested = (cert) => {
    _logger("onEditRequested", cert);
    const stateForTransports = {type: "CERT_EDIT", payload: cert};
    _logger("onEditRequested, stateForTransports", stateForTransports);
    navigate(`/certification/form/edit/${cert.id}`, {
      state: stateForTransports,
    });
  };

  const onDeleteRequested = useCallback((cert) => {
    _logger("onGetCertSuccess", cert);
    const onDeleteSuccess = deleteSuccessHandler(cert.id);

    certService.deleteCert(cert.id).then(onDeleteSuccess).catch(onDeleteError);
  }, []);

  const deleteSuccessHandler = (isDeleted) => {
    _logger("deleteSuccessHandler", isDeleted);
    return () => {
      setPageData((prevState) => {
        const pd = {...prevState};
        pd.arrayOfCert = [...pd.arrayOfCert];

        const indexOf = pd.arrayOfCert.findIndex((singleCert) => {
          let result = false;

          if (singleCert.id === isDeleted) {
            result = true;
          }

          return result;
        });

        if (indexOf >= 0) {
          pd.arrayOfCert.splice(indexOf, 1);
          pd.certComponents = pd.arrayOfCert.map(mapString);
        }
        return pd;
      });
    };
  };

  const renderCert = () => {
    return (
      <div className="row ">
        {pageData.certComponents}
        <Pagination
          className="certPagination mb-5 text-align-center"
          locale={locale}
          current={pageData.pageIndex}
          pageSize={pageData.pageSize}
          total={pageData.total}
          onChange={pagination}></Pagination>
      </div>
    );
  };

  const onDeleteError = () => {
    toastr.error("Error");
  };

  const createNewCert = () => {
    navigate(`/certification/form`);
  };

  const onGetCertError = () => {
    _logger("onGetCertError");

    toastr.error("Error Finding Certification");
  };

  const onOrgIdByUserIdError = (response) => {
    _logger("onGetCurrentUserError", response);

    toastr.error("Error finding Organization");
  };


  return (
    <React.Fragment>
      <div className="cert-preview-container">
        <div className="container p-3 text-left">
          <body>
            <div className="row">
              <div className="col-lg-12">
                <div className="page-content-certlistview">
                  <div className="main-banner-cert row  header-text">
                    <div className="col-lg-7">
                      <h4 className="h4-cert header-text-cert">
                        <em className="em-cert">Browse</em> All Your
                        Certifications Here
                      </h4>
                      <div className="main-button-cert">
                        <button
                          type="button"
                          id="createCert"
                          onClick={createNewCert}>
                          + Create a Certification
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="cert-library">
                    <div className="col-lg-12">
                      <div className="heading-section">
                        {pageData.arrayOfCert.length !== 0 ? (
                          <div className="cert-container ">{renderCert()}</div>
                        ) : (
                          <h2 className="h2-cert text-center mb-3">
                            No Certification To Be Found!
                          </h2>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </body>
        </div>
      </div>
    </React.Fragment>
  );
}

CertificationListView.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

export default CertificationListView;
