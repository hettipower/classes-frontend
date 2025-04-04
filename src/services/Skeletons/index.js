// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Skeleton from '@mui/material/Skeleton';

function Skeletons({ height = 50 }) {
    return (
        <Skeleton height={height} sx={{ transformOrigin: `0 0` }} />
    )
};

// typechecking props for Skeletons
Skeletons.propTypes = {
    height: PropTypes.string,
};

export default Skeletons;