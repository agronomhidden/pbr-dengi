import {loadLocation, locationLoaded} from "../AC/locationAC"
import MtsMoneyRequest from "../../Utils/RequestApi/MtsMoneyRequest"


export const getLocation = locationId => dispatch => {
    dispatch(loadLocation(locationId))

    return MtsMoneyRequest
        .setMethod('locations')
        .postRequest()
        .then(res => res && dispatch(locationLoaded(res.data.result)))
}
