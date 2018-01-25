import {loadLocation, locationLoaded,setLocationErrors} from "../AC/locationAC"
import {get} from "../../Utils/ajaxWraper"


export const getLocation = () => dispatch => {
    dispatch(loadLocation())
    return get('api/locations', {}, res => {
        res && dispatch(locationLoaded(res.data.result))
    }, setLocationErrors, dispatch)
}
