import {
    START, SUCCESS, FAIL,
    SET_MESSAGE,
} from "../CONSTANTS"

import {Record} from 'immutable'

const ReducerState = Record({
    message: null,
    loading: false
})

export default (state = new ReducerState(), action = {}) => {
    switch (action.type) {
        case SET_MESSAGE + START:
            console.log(SET_MESSAGE + START);
            return state
                .set('message',null)
                .set('loading', true)
        case SET_MESSAGE + SUCCESS:
            console.log(SET_MESSAGE + SUCCESS);
            return state
                .set('message', 'Успех!')
                .set('loading', false);
        default:
            return state;
    }
}
