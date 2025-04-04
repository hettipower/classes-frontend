// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Skeleton from '@mui/material/Skeleton';
import Grid from "@mui/material/Grid";

function CardsSkeletons({ height = 50 }) {
    return (
        <Grid container px={2} spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
                <Skeleton height={height} sx={{ transformOrigin: `0 0` }} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <Skeleton height={height} sx={{ transformOrigin: `0 0` }} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <Skeleton height={height} sx={{ transformOrigin: `0 0` }} />
            </Grid>
        </Grid>
    )
};

// typechecking props for CardsSkeletons
CardsSkeletons.propTypes = {
    height: PropTypes.string,
};

export default CardsSkeletons;