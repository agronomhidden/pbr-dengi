import {
    GET_RECHARGE_REQUIREMENT, RECHARGE, SET_ASSIST_PARAMS, RECHARGE_INFO,
    START, SUCCESS, FAIL
} from "../CONSTANTS"
import {OrderedMap, Record} from 'immutable'
import {arrToMap} from "pbr-lib-front-utils/dist/dateManipulation"
import {fieldsRechargeConverter} from "../Utils/helper"
import FieldsAttributesRecord from "./Entities/FieldsAttributesRecord"

export const assistState = Record({
    fields: null,
    teaser: null,
    loading: false,
    loaded: false,
    uuids: null,
    errors: null,
    status: true,
    model: null,
    payServicesResult: false,
    withServices: false,
    orderNumber: null
})

const rechargeDialog = OrderedMap({
    first_name: new FieldsAttributesRecord,
    last_name: new FieldsAttributesRecord,
    email: new FieldsAttributesRecord
});

export default (state = new assistState(), action = {}) => {
    switch (action.type) {
        case GET_RECHARGE_REQUIREMENT + START:
        case RECHARGE + START:
            return state
                .set('loading', true)
                .set('loaded', false)
                .set('errors', null)
        case RECHARGE + FAIL:
            return state
                .set('loading', false)
                .set('loaded', true)
                .set('errors', action.payload)
        case GET_RECHARGE_REQUIREMENT + SUCCESS:
            const {model:{fields}, teaser} = action.payload.advanced
            return state
                .set('loading', false)
                .set('loaded', true)
                .set('uuids', action.payload.uuid)
                .set('fields', arrToMap(fieldsRechargeConverter(rechargeDialog, fields)))
                .set('teaser', teaser)
        case RECHARGE_INFO + START:
            return state
                .set('loading', true)
                .set('loaded', false)
                .set('errors', null)
                .set('status', action.status)
                .set('orderNumber', action.orderNumber)
        case RECHARGE_INFO + SUCCESS:
            return state
                .set('loading', false)
                .set('loaded', true)
                .set('model', action.payload.code)
                .set('payServicesResult', action.payload.pay_services_result)
                .set('withServices', action.payload.with_services)
        case RECHARGE_INFO + FAIL:
            return state
                .set('loaded', false)
                .set('loading', false)
        case SET_ASSIST_PARAMS:
            return state
                .set('loading', false)
                .set('loaded', true)
        default:
            return state;
    }
}