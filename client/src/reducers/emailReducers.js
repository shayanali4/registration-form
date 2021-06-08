import { EMAIL_DATA_REMOVE, EMAIL_SEND_FAIL, EMAIL_SEND_REQUEST, EMAIL_SEND_SUCCESS } from "../constants/emailConstants";

export const emailReducerInfo = (state = {}, action) => {
    switch (action.type) {
        case EMAIL_SEND_REQUEST:
            return { loading: true };
        case EMAIL_SEND_SUCCESS:
            return {
                loading: false,
                emailData: action.payload
            };
        case EMAIL_SEND_FAIL:
            return { loading: false, error: action.payload };
        case EMAIL_DATA_REMOVE:
            return {};
        default:
            return state;
    }
};