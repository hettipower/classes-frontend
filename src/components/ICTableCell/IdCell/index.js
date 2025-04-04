// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Checkbox from "@mui/material/Checkbox";

// Otis Admin PRO React components
import MDBox from "components/MDBox";

function IdCell({ id, checked = false }) {
  return (
    <MDBox display="flex" alignItems="center">
      <Checkbox defaultChecked={checked} value={id} />
    </MDBox>
  );
}

// Typechecking props for the IdCell
IdCell.propTypes = {
  id: PropTypes.number.isRequired,
  checked: PropTypes.bool,
};

export default IdCell;
