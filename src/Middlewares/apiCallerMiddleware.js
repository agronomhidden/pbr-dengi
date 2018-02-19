import {API_REQUEST_ACTION} from '../CONSTANTS';
import ApiCaller from '../Services/Api/ApiCaller';

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
        try {
            const apiCaller = new ApiCaller(action.method, action.payload, paramsContainer)

            return apiCaller.call().then(res => res && res.data && action.successAC && next(action.successAC(res.data.result)))
        } catch (e) {
            
        }
    }

    return next(action)
}
