import {getDescriptionStart, getDescriptionSuccess} from "../AC/helpAC"
import MtsMoneyRequest from "../../Utils/RequestApi/MtsMoneyRequest"


export const getDescription = () => dispatch => {

    dispatch(getDescriptionStart())

    return MtsMoneyRequest
        .setMethod('help/service-description')
        .postRequest()
        .then(res => res && res.data && dispatch(getDescriptionSuccess(res.data.result)))
}