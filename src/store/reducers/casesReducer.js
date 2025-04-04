import { SET_CASE_MEMBER, SET_CASES, SET_MEMBER_CASES, SET_MEMBER_INQUIRES } from 'store/actions/casesActions';

// Initial state
const initialState = {
    caseMember: false,
    cases: false,
    memberCases: false,
    memberInquires: false
};

// Reducer function
const casesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CASE_MEMBER:
            return { ...state, caseMember: action.payload };
        case SET_CASES:
            return { ...state, cases: action.payload };
        case SET_MEMBER_CASES:
            return { ...state, memberCases: action.payload };
        case SET_MEMBER_INQUIRES:
            return { ...state, memberInquires: action.payload };
        default:
            return state;
    }
};

export default casesReducer;
