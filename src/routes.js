import SignInBasic from "layouts/authentication/sign-in";
import Dashboard from "layouts/dashboard";
import Teachers from "layouts/teachers";
import Classes from "layouts/classes";
import AddTeacher from "layouts/teachers/add";
import AddSubject from "layouts/subjects/add";
import Subjects from "layouts/subjects";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    component: <SignInBasic />,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Icon fontSize="medium">dashboard</Icon>,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Teachers",
    key: "teachers",
    route: "/teachers",
    icon: <Icon fontSize="medium">school</Icon>,
    component: <Teachers />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Classes",
    key: "classes",
    route: "/classes",
    icon: <Icon fontSize="medium">class</Icon>,
    component: <Classes />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Subjects",
    key: "subjects",
    route: "/subjects",
    icon: <Icon fontSize="medium">build</Icon>,
    component: <Subjects />,
    noCollapse: true,
  },
  {
    name: "Add Subject",
    key: "add-subject",
    route: "/subjects/add-subject",
    component: <AddSubject />,
  },
  {
    name: "Add Teacher",
    key: "add-teacher",
    route: "/teachers/add-teacher",
    component: <AddTeacher />,
  }
];

export default routes;
