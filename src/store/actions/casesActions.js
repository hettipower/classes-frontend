// Define action types
export const SET_CASE_MEMBER = 'SET_CASE_MEMBER';
export const SET_CASES = 'SET_CASES';
export const SET_MEMBER_CASES = 'SET_MEMBER_CASES';
export const SET_MEMBER_INQUIRES = 'SET_MEMBER_INQUIRES';

// Define action creators
export const setCaseMember = (value) => ({
    type: SET_CASE_MEMBER,
    payload: value
});

export const setCases = (value) => ({
    type: SET_CASES,
    payload: value
});

export const setMemberCases = (value) => ({
    type: SET_MEMBER_CASES,
    payload: value
});

export const setMemberInquires = (value) => ({
    type: SET_MEMBER_INQUIRES,
    payload: value
});