import {SET_CURRENT_USER, SUCCESS, START, LOGOUT_CURRENT_USER, FAIL, API_REQUEST_ACTION} from "../../CONSTANTS"
import MtsMoneyRequest from "../../Utils/RequestApi/MtsMoneyRequest"
import * as creator from "../../Services/Messages/messageCreators"

export const loginCurrentUser = () => ({
    type: SET_CURRENT_USER + START
})

export const setCurrentUser = response => ({
    type: SET_CURRENT_USER + SUCCESS,
    payload: response
})

export const loginCurrentUserFail = response => ({
    type: SET_CURRENT_USER + FAIL,
    payload: {fields: response.result, msg: response.message}
})



export const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
})


export const getUserByToken = () => dispatch => {
    dispatch(loginCurrentUser())

    return MtsMoneyRequest
        .setMethod('user/get')
        .postRequest()
        .then(res => res && res.data && dispatch(setCurrentUser(res.data.result)))
}


export function getUserByToken() {
    return {
        type: API_REQUEST_ACTION,
        method: creator.MessageGetUser.GET_USER_METHOD,
        payload: {},
        beforeAC: (paramsContainer) => loginCurrentUser(),
        successAC: setCurrentUser,
        forbiddenErrorAC: logoutCurrentUser
    }
}