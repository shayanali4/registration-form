import Axios from "axios";
import { EMAIL_DATA_REMOVE, EMAIL_SEND_FAIL, EMAIL_SEND_REQUEST, EMAIL_SEND_SUCCESS } from "../constants/emailConstants";
import { serverAddress } from "../constants/serverConstants";

export const sendEmailBackend = (receiver, subject,  message) => async (dispatch) => {
    dispatch({
        type: EMAIL_SEND_REQUEST,
    });
    try {
        const { data } = await Axios.post(`${serverAddress}/api/email`, { receiver, subject, message });
        dispatch({
            type: EMAIL_SEND_SUCCESS,
            payload: data,
        });
    } catch (err) {
        dispatch({
            type: EMAIL_SEND_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message,
        });    
    }
};

export const removeEmailData= () => async (dispatch) => {
    dispatch({
        type: EMAIL_DATA_REMOVE,
    });
};