import { lazy } from "react";
const CertficaitionForm = lazy(() =>
    import("../components/certifications/CertificationForm")
);
const CertficaitionsListView = lazy(() =>
    import("../components/certifications/CertificationListView")
);
const BlogsForm = lazy(() => import("../components/blogs/BlogsForm"));


const blogs = [
    {
        path: "/blogs/add",
        name: "blog creation",
        exact: true,
        element: BlogsForm,
        roles: ["SysAdmin", "Blogger"],
        isAnonymous: false,
    },

    {
        path: "/blogs/edit/:id",
        name: "blog edit",
        exact: true,
        element: BlogsForm,
        roles: ["SysAdmin", "Blogger"],
        isAnonymous: false,
    },
];

const certification = [
    {
        path: "/certification/form",
        name: "Certficaition",
        element: CertficaitionForm,
        roles: ["OrgAdmin"],
        exact: true,
        isAnonymous: false,
    },
    {
        path: "/certification/listview/",
        name: "Certficaition",
        element: CertficaitionsListView,
        roles: ["OrgAdmin"],
        exact: true,
        isAnonymous: false,
    },
    {
        path: "/certification/form/edit/:id",
        name: "Certficaition",
        element: CertficaitionForm,
        roles: ["OrgAdmin"],
        exact: true,
        isAnonymous: false,
    },

];


const allRoutes = [
    ...blogs,
    ...certification,
];

export default allRoutes;