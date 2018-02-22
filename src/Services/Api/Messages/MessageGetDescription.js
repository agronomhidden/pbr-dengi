import AbstractMessage from './AbstractMessage';

export default class MessageGetDescription extends AbstractMessage {

    static GET_DESCRIPTION_METHOD = 'help/service-description';

    getMethod = () => MessageGetDescription.GET_DESCRIPTION_METHOD
}