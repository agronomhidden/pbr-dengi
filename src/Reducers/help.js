import {
    START, SUCCESS, SERVICE_DESCRIPTION
} from "../CONSTANTS"
import {Record} from 'immutable'
import {DocumentRecord} from "./entities"

export const helpState = Record({
    description: {},
    loading: false,
    loaded: false,
})

export default (state = new helpState(), action = {}) => {
    switch (action.type) {
        case SERVICE_DESCRIPTION + START:
            return state
                .set('loading', true)
        case SERVICE_DESCRIPTION + SUCCESS:
            return state
                .set('loading', false)
                .set('loaded', true)
                .set('description', new DocumentRecord(action.payload))
        default:
            return state;
    }
}