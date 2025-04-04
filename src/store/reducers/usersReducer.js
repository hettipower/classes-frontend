import { SET_USER_DATA } from 'store/actions/usersActions';

// Initial state
const initialState = {
    userData: false,
    reviewerRoutes: ['/cases/timeline', '/review-system/to-be-acknowledged', '/review-system/in-progress', '/authentication/sign-in', '/authentication/reset-password', '/cases', '/review-system', '/scrutinize/view', '/dashboard'],
    runnerRoutes: ['/cases/timeline', '/review-system/to-be-acknowledged', '/review-system/in-progress', '/authentication/sign-in', '/authentication/reset-password', '/cases', '/review-system', '/scrutinize/view', '/dashboard'],
    hospitalRoutes: ['/cases/timeline', '/authentication/sign-in', '/authentication/reset-password', '/hospital-cases', '/scrutinize/view', '/dashboard'],
    scrutinizerRoutes: ['/cases/timeline', '/authentication/sign-in', '/authentication/reset-password', '/review-system', '/scrutinize/view', '/dashboard'],
    doctorRoutes: ['/cases/timeline', '/authentication/sign-in', '/authentication/reset-password', '/review-system', '/scrutinize/view', '/dashboard'],
};

// Reducer function
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return { ...state, userData: action.payload };
        default:
            return state;
    }
};

export default usersReducer;
