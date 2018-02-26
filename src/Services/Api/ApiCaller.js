import {REAL_IP} from "../../CONSTANTS";
import BaseApiCaller from './BaseApiCaller';
import * as creator from './Messages/messagesClassStorage';

export default class ApiCaller extends BaseApiCaller {

    /**
     * @param {string} method
     * @param {{}} params
     * @param {AbstractApiParamsContainer} paramsContainer
     */
    constructor(method, params, paramsContainer) {
        super();
        this.url = paramsContainer.getUrl()
        this.message = this.createMessage(method, params, paramsContainer)
        this.createConfig(paramsContainer)
    }

    createConfig(paramsContainer) {
        if (paramsContainer.hasIP()) {
            this.config.headers[REAL_IP] = paramsContainer.getIP()
        }
    }

    createMessage(method, params, paramsContainer) {
        let build;
        switch (method) {
            case creator.MessageGetLocation.GET_LOCATION_METHOD:
                build = new creator.MessageGetLocation()
                break;
            case creator.MessageGetCategories.GET_CATEGORIES_METHOD:
                build = new creator.MessageGetCategories(params.id, paramsContainer.getLocationId())
                break;
            case creator.MessageSearchCategories.SEARCH_METHOD:
                build = new creator.MessageSearchCategories(params.searchQuery, params.id, paramsContainer.getLocationId())
                break;
            case creator.MessageSearchAutoCompleteCategories.SEARCH_AUTOCOMPLETE_METHOD:
                build = new creator.MessageSearchAutoCompleteCategories(params.value, params.category_id, paramsContainer.getLocationId())
                break;
            case creator.MessageGetUser.GET_USER_METHOD:
                build = new creator.MessageGetUser(paramsContainer.getToken())
                break;
            case creator.MessageLoginUser.LOGIN_USER:
                build = new creator.MessageLoginUser(params)
                break;
            case creator.MessageGetDescription.GET_DESCRIPTION_METHOD:
                build = new creator.MessageGetDescription()
                break;
            case creator.MessageSendMail.SEND_MAIL:
                build = new creator.MessageSendMail(params)
                break;
            case creator.MessageGetHistory.GET_PAYMENTS_HISTORY:
                build = new creator.MessageGetHistory(params,paramsContainer.getToken())
                break;
            case creator.MessageGetHistoryItems.GET_PAYMENTS_HISTORY_ITEMS:
                build = new creator.MessageGetHistoryItems(params)
                break;
        }
        return build && build.getMessage()
    }
}
