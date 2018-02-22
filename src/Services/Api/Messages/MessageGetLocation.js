import AbstractMessage from './AbstractMessage';

export default class MessageGetLocation extends AbstractMessage {

    static GET_LOCATION_METHOD = 'locations';

    getMethod = () => MessageGetLocation.GET_LOCATION_METHOD
}