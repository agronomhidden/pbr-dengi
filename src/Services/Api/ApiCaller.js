import {REAL_IP} from "../../CONSTANTS";
import BaseApiCaller from './BaseApiCaller';
import * as creator from '../Messages/messageCreators';

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
        switch (method) {
            case creator.MessageGetLocation.GET_LOCATION_METHOD:
                return new creator.MessageGetLocation().getMessage()
            case creator.MessageGetCategories.GET_CATEGORIES_METHOD:
                return new creator.MessageGetCategories(params.id, paramsContainer.getLocationId()).getMessage()
            case creator.MessageSearchCategories.SEARCH_METHOD:
                return new creator.MessageSearchCategories(
                    params.searchQuery, params.id, paramsContainer.getLocationId())
                    .getMessage()
            case creator.MessageSearchAutoCompleteCategories.SEARCH_AUTOCOMPLETE_METHOD:
                return new creator.MessageSearchAutoCompleteCategories(
                    params.value, params.category_id, paramsContainer.getLocationId()
                ).getMessage()
            case creator.MessageGetUser.GET_USER_METHOD:
                return new creator.MessageGetUser(paramsContainer.getToken()).getMessage()
        }
    }
}
