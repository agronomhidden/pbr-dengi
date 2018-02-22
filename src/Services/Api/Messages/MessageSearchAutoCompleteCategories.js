import MessageSearchCategories from "./MessageSearchCategories"

export default class MessageSearchAutoCompleteCategories extends MessageSearchCategories {

    static SEARCH_AUTOCOMPLETE_METHOD = 'search/autocomplete-search';

    getMethod = () => MessageSearchAutoCompleteCategories.SEARCH_AUTOCOMPLETE_METHOD

    /**
     * @param {string} value
     * @param {string|null} category_id
     * @param {integer|null} location_id
     */
    constructor(value = '', category_id = null, location_id = null) {
        super(...arguments)
    }
}