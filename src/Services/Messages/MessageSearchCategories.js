import Validator from "../Api/ParamsValidator"
import AbstractMessage from "./AbstractMessage"

export default class MessageSearchCategories extends AbstractMessage {


    static SEARCH_METHOD = 'search';

    getMethod = () => MessageSearchCategories.SEARCH_METHOD

    /**
     * @param {string} value
     * @param {string|null} category_id
     * @param {integer|null} location_id
     */
    constructor(value = '', category_id = null, location_id = null) {
        super()
        if (!Validator.isNull(location_id) && !Validator.isInt(location_id)) {
            throw new TypeError('location_id must be integer or NULL')
        }
        if (!Validator.isNull(category_id) && !Validator.isInt(category_id)) {
            throw new TypeError('category_id must be integer or NULL')
        }
        console.dir({...arguments})
        this.args = {value, location_id, category_id}
    }


}