import * as Yup from "yup";

const blogsSchema = Yup.object().shape({
  title: Yup.string().min(2).max(1000).required("Required"),
  subject: Yup.string().min(2).max(100).required("Required"),
  content: Yup.string().min(2).max(1000000).required("Required"),
});

export default blogsSchema;
