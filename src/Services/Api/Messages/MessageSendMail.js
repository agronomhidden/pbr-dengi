import AbstractMessage from "./AbstractMessage"

export default class MessageSendMail extends AbstractMessage {

    static SEND_MAIL = 'payments/send-invoice';

    getMethod = () => MessageSendMail.SEND_MAIL

    /**
     * @param {string|null} params
     */
    constructor(params) {
        super()
        this.args = params
    }

}


