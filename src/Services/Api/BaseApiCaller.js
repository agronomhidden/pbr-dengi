import axios from 'axios';
import Validator from './ParamsValidator';

export default class BaseApiCaller {

    static GET_LOCATION_METHOD = 'locations';
    static GET_CATEGORIES_METHOD = 'categories/get';
    static SEARCH_METHOD = 'search';
    static SEARCH_AUTOCOMPLETE_METHOD = 'search/autocomplete-search';

    url = null;
    message = {};
    config = {timeout: 30000, headers: {}};

    createMessage() {}

    createConfig() {}

    call() {
        return axios.post(this.url, this.message, this.config)
    }

    /**
     *
     * @param  {string} method
     * @return {{method, args}}
     */
    messageGetLocations(method) {
        return this.getBaseMessage(method)
    }

    /**
     *
     * @param {string} method
     * @param {string} value
     * @param {string|null} category_id
     * @param {integer|null} location_id
     * @return {{method, args}}
     */
    messageSearchAutocompleteCategories(method, value = '', category_id = null, location_id = null) {
        if (!Validator.isNull(location_id) && !Validator.isInt(location_id)) {
            throw new TypeError('location_id must be integer or NULL')
        }
        if (!Validator.isNull(category_id) && !Validator.isInt(category_id)) {
            throw new TypeError('category_id must be integer or NULL')
        }

        return this.getBaseMessage(method, {value, location_id, category_id})
    }

    /**
     *
     * @param {string} method
     * @param {string} value
     * @param {string|null} category_id
     * @param {integer|null} location_id
     * @return {{method, args}}
     */
    messageSearchCategories(method, value = '', category_id = null, location_id = null) {
        if (!Validator.isNull(location_id) && !Validator.isInt(location_id)) {
            throw new TypeError('location_id must be integer or NULL')
        }
        if (!Validator.isNull(category_id) && !Validator.isInt(category_id)) {
            throw new TypeError('category_id must be integer or NULL')
        }

        return this.getBaseMessage(method, {value, location_id, category_id})
    }

    /**
     *
     * @param  {string} method
     * @param  {integer|null} parent_id
     * @param  {integer|null} location_id
     * @return {{method, args}}
     */
    messageGetCategories(method, parent_id = null, location_id = null) {

        if (!Validator.isNull(parent_id) && !Validator.isInt(parent_id)) {
            throw new TypeError('Parent_id must be integer or NULL')
        }
        if (!Validator.isNull(location_id) && !Validator.isInt(location_id)) {
            throw new TypeError('location_id must be integer or NULL')
        }

        return this.getBaseMessage(method, {parent_id, location_id})
    }

    getBaseMessage(method, args = {}) {
        return {
            method,
            args
        }
    }
}
