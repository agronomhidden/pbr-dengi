import {API_REQUEST_ACTION} from '../CONSTANTS';
import ApiCaller from '../Services/Api/ApiCaller';

function getActionOnError(xhr, action) {
    if (xhr.response) {
        if (xhr.response.status === 403 && action.forbiddenErrorAC) {
            return action.forbiddenErrorAC(xhr.response.data)
        }
        if (xhr.response.status === 499 && action.fieldErrorAC) {
            return action.fieldErrorAC(xhr.response.data)
        }
        if (xhr.response.status === 500 && action.serverErrorAC) {
            return action.serverErrorAC(xhr.response.data)
        }
    }
    if (action.dataLoadErrorAC) {
        return action.dataLoadErrorAC(xhr)
    }
    return null
}

/**
 *
 * @param {AbstractApiParamsContainer} paramsContainer
 * @return {function(*): function(*): function(*=): *}
 */
export default paramsContainer => store => next => action => {
    if (action.type === API_REQUEST_ACTION) {
        if (paramsContainer.hasStore() === false) {
            paramsContainer.setStore(store);
        }
        action.beforeAC && next(action.beforeAC(paramsContainer))

        const apiCaller = new ApiCaller(action.method, action.payload, paramsContainer)

        return apiCaller.call()
            .then(res => res && res.data && action.successAC && next(action.successAC(res.data.result)))
            .catch(xhr => {
                const ac = getActionOnError(xhr, action);
                ac && next(ac);
            })
    }

    return next(action)
}
