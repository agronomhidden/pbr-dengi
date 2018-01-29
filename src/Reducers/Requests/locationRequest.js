import {loadLocation, locationLoaded, setLocationErrors} from "../AC/locationAC"
import {get} from "../../Utils/ajaxWraper"


export const getLocation = locationId => dispatch => {
    dispatch(loadLocation())
    return get('api/locations', {}, res => {
        res && dispatch(locationLoaded(res.data.result, locationId))
    }, setLocationErrors, dispatch)
}
