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
        super()

        if (Validator.isNull(access_token) && Validator.isNull(serviceCode)) {
            throw new Error('access_token and serviceCode, do not must be NULL')
        }
        if (!Validator.isNull(serviceCode) && !Validator.isInt(serviceCode)) {
            throw new TypeError('serviceCode must be integer or NULL')
        }
        this.args = Object.assign({access_token, serviceCode, fields, mts_session}, otherFields)
    }

}