import AbstractMessage from "./AbstractMessage"

export default class MessageSendMail extends AbstractMessage {

    static METHOD = 'invoices/create-user-data';

    /**
     *
     * @param {string} access_token
     * @param {string} service_id
     * @param {string} identifier
     */
    constructor(access_token, service_id, identifier) {
        super()
        this.args = {access_token, service_id, identifier}
    }

}
