// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-router components
import { Link } from "react-router-dom";

// @mui material components
import Icon from "@mui/material/Icon";

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

function ButtonCell({ buttonData }) {
  return (
    <MDBox display="flex" alignItems="center">
      {buttonData.map((button) => {

        if( button.action === 'icon' ) {
          return(
            <MDButton key={button.name} variant="text" style={{ marginRight : '10px', padding: 0, minWidth: 0 }}>
              <Link to={button.link} style={{ color: `${button.color}`, padding: `0.5625rem 1rem` }}>
                <Icon>{button.icon}</Icon>
              </Link>
            </MDButton>
          );
        }

        if( button.action === 'link' ) {
          return(
            <MDButton key={button.name} variant="gradient" color={button.color} style={{ marginRight : '10px', padding: 0 }}>
              <Link to={button.link} style={{ color: `#ffffff`, padding: `0.5625rem 1.5rem` }}>
                {button.name}
              </Link>
            </MDButton>
          );
        }

        if( button.action === 'click' ) {
          return(
            <MDButton 
              key={button.name} 
              onClick={() => button.click(button)}
              style={{ padding: `${button.icon && 0}`,  marginRight : '10px' }}
              color={!button.icon && button.color}
            >
              {
                button.icon ?
                <Icon style={{ color: `${button.color}` }}>{button.icon}</Icon>
                : `${button.name}`
              }
            </MDButton>
          );
        }

        return false;

      })}
    </MDBox>
  );
}

// Typechecking props for the ButtonCell
ButtonCell.propTypes = {
  buttonData: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      name: PropTypes.string.isRequired,
      action: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      id: PropTypes.string,
      click: PropTypes.func,
      icon: PropTypes.string,
      data: PropTypes.node,
    })
  ).isRequired,
};

export default ButtonCell;
