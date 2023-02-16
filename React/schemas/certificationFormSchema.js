import * as Yup from "yup";

const CertificationFormSchema = Yup.object().shape({
    name: Yup.string().min(2).max(100).required("Name is required"),
    description: Yup.string().min(2).max(500).nullable(),
    fileId: Yup.number().min(0).typeError("Id needs to be number.").nullable(),
    expirationDate: Yup.date().required("Expiration Date is required"),
});

export default CertificationFormSchema;