// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// react-router-dom components
import { NavLink } from "react-router-dom";

// @mui material components
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";

// Otis Admin PRO React components
import MDBox from "components/MDBox";

// Custom styles for the SidenavCollapse
import {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
  collapseArrow,
} from "services/Sidenav/styles/sidenavCollapse";

// Otis Admin PRO React context
import { useMaterialUIController } from "context";

function SidenavCollapse({
  icon,
  name,
  children = false,
  active = false,
  noCollapse = false,
  open = false,
  route,
  ...rest
}) {
  const [controller] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } = controller;

  return (
    <>
      <ListItem component="li">
        {
          noCollapse ?
          <NavLink to={route} style={{ width: `86%` }}>
            <MDBox
              {...rest}
              sx={(theme) =>
                collapseItem(theme, { active, transparentSidenav, whiteSidenav, darkMode })
              }
            >
              <ListItemIcon
                sx={(theme) => collapseIconBox(theme, { transparentSidenav, whiteSidenav, darkMode })}
              >
                {typeof icon === "string" ? (
                  <Icon sx={(theme) => collapseIcon(theme, { active })}>{icon}</Icon>
                ) : (
                  icon
                )}
              </ListItemIcon>

              <ListItemText
                primary={name}
                sx={(theme) =>
                  collapseText(theme, {
                    miniSidenav,
                    transparentSidenav,
                    whiteSidenav,
                    active,
                  })
                }
              />

              <Icon
                sx={(theme) =>
                  collapseArrow(theme, {
                    noCollapse,
                    transparentSidenav,
                    whiteSidenav,
                    miniSidenav,
                    open,
                    active,
                    darkMode,
                  })
                }
              >
                expand_less
              </Icon>
            </MDBox>
          </NavLink>
          :
          <MDBox
            {...rest}
            sx={(theme) =>
              collapseItem(theme, { active, transparentSidenav, whiteSidenav, darkMode })
            }
          >
            <ListItemIcon
              sx={(theme) => collapseIconBox(theme, { transparentSidenav, whiteSidenav, darkMode })}
            >
              {typeof icon === "string" ? (
                <Icon sx={(theme) => collapseIcon(theme, { active })}>{icon}</Icon>
              ) : (
                icon
              )}
            </ListItemIcon>

            <ListItemText
              primary={name}
              sx={(theme) =>
                collapseText(theme, {
                  miniSidenav,
                  transparentSidenav,
                  whiteSidenav,
                  active,
                })
              }
            />

            <Icon
              sx={(theme) =>
                collapseArrow(theme, {
                  noCollapse,
                  transparentSidenav,
                  whiteSidenav,
                  miniSidenav,
                  open,
                  active,
                  darkMode,
                })
              }
            >
              expand_less
            </Icon>
          </MDBox>
        }
      </ListItem>
      {children && (
        <Collapse in={open} unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
}

// Typechecking props for the SidenavCollapse
SidenavCollapse.propTypes = {
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  active: PropTypes.bool,
  noCollapse: PropTypes.bool,
  open: PropTypes.bool,
  route: PropTypes.node,
};

export default SidenavCollapse;
