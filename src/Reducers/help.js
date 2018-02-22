import {
    START, SUCCESS, SERVICE_DESCRIPTION
} from "../CONSTANTS"

import {Record} from 'immutable'


export const payState = Record({
    description: null,
    loading: false,
    fail: false
})

export default (state = new payState(), action = {}) => {
    switch (action.type) {
        case SERVICE_DESCRIPTION + START:
            return state
                .set('loading', true)
                .set('fail', false)
        case SERVICE_DESCRIPTION + SUCCESS:
            console.log(action.payload);
            return state
                .set('loading', false)
                .set('description', action.payload)
        default:
            return state;
    }
}