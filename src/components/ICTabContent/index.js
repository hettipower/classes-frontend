// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Otis Admin PRO React components
import MDBox from "components/MDBox";

function ICTabContent({ children, value, index, ...other }) {

    return (
        <Card
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
        >
            {value === index && <MDBox sx={{ p: 3 }}>{children}</MDBox>}
        </Card>
    );
}

// typechecking props for ICTabContent
ICTabContent.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default ICTabContent;
  