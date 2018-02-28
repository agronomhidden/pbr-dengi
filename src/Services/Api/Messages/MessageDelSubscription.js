import AbstractMessage from './AbstractMessage';

export default class MessageTotalLogout extends AbstractMessage {

    static METHOD = 'user/del-subscription'

    /**
     * @param {string|null} access_token
     */
    constructor(access_token) {
        super()
        this.args = {access_token}
    }

}