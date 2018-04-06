import {
    START, SUCCESS, SERVICE_DESCRIPTION, SOCIAL_RULES, USER_AGREEMENT
} from "../CONSTANTS"
import {Record} from 'immutable'
import {DocumentRecord} from "./entities"

export const helpState = Record({
    description: {},
    social: {},
    agreement: {},
    loading: false,
    SDLoaded: false,
    SRLoaded: false,
    UALoaded: false,
    loaded: false,
})

export default (state = new helpState(), action = {}) => {
    switch (action.type) {
        case SERVICE_DESCRIPTION + START:
            return state
                .set('loading', true)
                .set('SDLoaded', false)
        case SERVICE_DESCRIPTION + SUCCESS:
            return state
                .set('loading', false)
                .set('SDLoaded', true)
                .set('description', new DocumentRecord(action.payload))

        case SOCIAL_RULES + START:
            return state
                .set('loading', true)
                .set('SRLoaded', false)
        case SOCIAL_RULES + SUCCESS:
            return state
                .set('loading', false)
                .set('SRLoaded', true)
                .set('social', new DocumentRecord(action.payload))

        case USER_AGREEMENT + START:
            return state
                .set('loading', true)
                .set('UALoaded', false)
        case USER_AGREEMENT + SUCCESS:
            return state
                .set('loading', false)
                .set('UALoaded', true)
                .set('agreement', new DocumentRecord(action.payload))
        default:
            return state;
    }
}