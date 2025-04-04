// Define action types
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_REVIEWER_ROUTES = 'SET_REVIEWER_ROUTES';

export const setUserData = (value) => ({
    type: SET_USER_DATA,
    payload: value
});