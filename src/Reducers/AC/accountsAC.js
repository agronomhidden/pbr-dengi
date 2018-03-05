import {
    GET_BANNERS,
    SUCCESS,
    CREATE_USER_DATA_WITH_BANNER,
    START,
    FAIL,
    API_REQUEST_ACTION,
    RESET
} from "../../CONSTANTS"

import * as msg from "../../Services/Api/Messages/messagesClassStorage";


export function setBanners(result) {
    return {
        type: GET_BANNERS + SUCCESS,
        payload: result
    }
}

export function loadBanners() {
    return {
        type: API_REQUEST_ACTION,
        method: msg.MessageGetSlider.METHOD,
        payload: {},
        successAC: setBanners,
    }
}

export function startCreateUserDataUsingBanner(service_id) {
    return {
        type: CREATE_USER_DATA_WITH_BANNER + START,
        payload: {service_id}
    }
}

export function successCreateUserDataUsingBanner(service_id, text) {
    return {
        type: CREATE_USER_DATA_WITH_BANNER + SUCCESS,
        payload: {service_id, text}
    }
}

export function failCreateUserDataUsingBanner(service_id, text) {
    return {
        type: CREATE_USER_DATA_WITH_BANNER + FAIL,
        payload: {service_id, text}
    }
}

export function resetCreateUserDataUsingBanner() {
    return {
        type: CREATE_USER_DATA_WITH_BANNER + RESET,
        payload: null
    }
}

export function createUserDataUsingBanner(service_id, identifier, defaultSuccessText = 'Успешно', defaultError = 'Ошибка') {
    return {
        type: API_REQUEST_ACTION,
        method: msg.MessageCreateUserData.METHOD,
        payload: {service_id, identifier},
        beforeAC: (paramsContainer) => startCreateUserDataUsingBanner(service_id),
        successAC: () => successCreateUserDataUsingBanner(service_id, defaultSuccessText),
        fieldErrorAC: (res) => failCreateUserDataUsingBanner(service_id, res.message || defaultError),
        serverErrorAC: (res) => failCreateUserDataUsingBanner(service_id, res.error || defaultError),
        dataLoadErrorAC: () => failCreateUserDataUsingBanner(service_id, defaultError),
    }
}

