import AbstractMessage from "./AbstractMessage"
import Validator from "../ParamsValidator"

export default class MessageEripDialog extends AbstractMessage {

    static METHOD = 'erip-dialog';

    /**
     * @param {string} access_token
     * @param {integer} serviceCode
     * @param {{}|null} fields
     * @param {{}} otherFields
     * @param {string|null} mts_session
     */
    constructor(access_token, serviceCode, mts_session = null, fields = null, otherFields = {}) {
        console.log(fields);
        super()
        if (!Validator.isNull(serviceCode) && !Validator.isInt(serviceCode)) {
            throw new TypeError('serviceCode must be integer or NULL')
        }
        this.args = Object.assign({access_token, serviceCode, fields, mts_session}, otherFields)
    }

}