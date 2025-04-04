// @mui material components
import Skeleton from '@mui/material/Skeleton';
import Grid from "@mui/material/Grid";

function TableSkeletons() {
    return (
        <Grid container px={2} spacing={1}>
            <Grid item xs={12} md={6} lg={3}>
                <Skeleton height={50} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Skeleton height={50} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Skeleton height={50} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Skeleton height={50} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Skeleton height={50} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Skeleton height={50} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Skeleton height={50} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Skeleton height={50} />
            </Grid>
        </Grid>
    )
};

export default TableSkeletons;