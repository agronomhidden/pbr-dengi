import Validator from "../Api/ParamsValidator"
import AbstractMessage from "./AbstractMessage"

export default class MessageGetCategories extends AbstractMessage {

    static GET_CATEGORIES_METHOD = 'categories/get';

    getMethod = () => MessageGetCategories.GET_CATEGORIES_METHOD

    /**
     * @param {string} value
     * @param {integer|null} parent_id
     * @param {integer|null} location_id
     */
    constructor(value = '', parent_id = null, location_id = null) {
        super()
        if (!Validator.isNull(location_id) && !Validator.isInt(location_id)) {
            throw new TypeError('location_id must be integer or NULL')
        }
        if (!Validator.isNull(parent_id) && !Validator.isInt(parent_id)) {
            throw new TypeError('Parent_id must be integer or NULL')
        }
        console.dir({...arguments})
        this.args = {parent_id, location_id}
    }

}