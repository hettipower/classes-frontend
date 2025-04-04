import SignInBasic from "layouts/authentication/sign-in";
import Dashboard from "layouts/dashboard";

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
  }
];

export default routes;
