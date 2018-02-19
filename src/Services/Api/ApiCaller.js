import {REAL_IP} from "../../CONSTANTS";
import BaseApiCaller from './BaseApiCaller';

export default class ApiCaller extends BaseApiCaller{

    /**
     *
     * @param {string} method
     * @param {{}} params
     * @param {AbstractApiParamsContainer} paramsContainer
     */
    constructor(method, params, paramsContainer) {
        super();
        this.url = paramsContainer.getUrl();
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
            case BaseApiCaller.GET_LOCATION_METHOD:
                return this.messageGetLocations(method)
            case BaseApiCaller.GET_CATEGORIES_METHOD:
                return this.messageGetCategories(method, params.id, paramsContainer.getLocationId())
            case BaseApiCaller.SEARCH_METHOD:
                return this.messageSearchCategories(method, params.searchQuery, params.id, paramsContainer.getLocationId())
            case BaseApiCaller.SEARCH_AUTOCOMPLETE_METHOD:
                return this.messageSearchAutocompleteCategories(
                    method, params.value, params.category_id, paramsContainer.getLocationId()
                )
        }
    }
}
