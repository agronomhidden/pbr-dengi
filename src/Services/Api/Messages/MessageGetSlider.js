import AbstractMessage from "./AbstractMessage"
import Validator from "../ParamsValidator";

export default class MessageSendMail extends AbstractMessage {

    static METHOD = 'invoices/get-slider';

    /**
     *
     * @param {string} access_token
     * @param {integer} location_id
     */
    constructor(access_token, location_id = null) {
        super()
        if (!Validator.isNull(location_id) && !Validator.isInt(location_id)) {
            throw new TypeError('location_id must be integer or NULL')
        }
        this.args = {access_token, location_id}
    }

}
