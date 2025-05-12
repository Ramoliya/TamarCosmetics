
const initailState = {
    errorMessage: {},
};

export default (state = initailState, action) => {
    switch (action.type) {
        case "MESSAGES_ERR":
            return {
                ...state,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}