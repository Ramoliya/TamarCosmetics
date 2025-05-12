import {SET_FIRST_VISIT } from "../constants";

const initialState = {
    isFirstUser: true,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_FIRST_VISIT:
            return {
                ...state,
                isFirstUser: false,
            }
        default:
            return state;
    }
}