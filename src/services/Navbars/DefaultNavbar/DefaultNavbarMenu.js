/**
=========================================================
* Otis Admin PRO - v2.0.2
=========================================================

* Product Page: https://material-ui.com/store/items/otis-admin-pro-material-dashboard-react/
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";

// Otis Admin PRO React components
import MDBox from "components/MDBox";

// Otis Admin PRO React context
import { useMaterialUIController } from "context";

function DefaultNavbarMenu({ open, close, placement = "bottom-start", children, style = {} }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [anchor, setAnchor] = useState(false);

  const openMenu = () => setAnchor(open);
  const closeMenu = () => setAnchor(false);
  return (
    <Popper
      anchorEl={anchor || open}
      popperRef={null}
      open={Boolean(anchor) || Boolean(open)}
      placement={placement}
      transition
      style={{ zIndex: 10, ...style }}
    >
      {({ TransitionProps }) => (
        <Grow
          {...TransitionProps}
          sx={{
            transformOrigin: "left top",
            background: ({ palette: { white, background } }) =>
              darkMode ? background.card : white.main,
          }}
        >
          <MDBox
            shadow="lg"
            borderRadius="lg"
            p={1.5}
            onMouseEnter={openMenu}
            onMouseLeave={(close, closeMenu)}
          >
            {children}
          </MDBox>
        </Grow>
      )}
    </Popper>
  );
}

// Typechecking props for the DefaultNavbarMenu
DefaultNavbarMenu.propTypes = {
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  close: PropTypes.oneOfType([PropTypes.func, PropTypes.bool, PropTypes.object]).isRequired,
  placement: PropTypes.string,
  children: PropTypes.node.isRequired,
  style: PropTypes.instanceOf(Object),
};

export default DefaultNavbarMenu;
