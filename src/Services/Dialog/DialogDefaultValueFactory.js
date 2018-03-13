import {queryStringToState} from "pbr-lib-front-utils/dist/queryStringHelper"
import FavoriteValues from './FavoriteValues';
import LocationStringValues from "./LocationStringValues"

export default new class DialogDefaultValueFactory {

    queryString;

    favoriteProps;

    setSearchString(searchString){
        this.queryString = queryStringToState(searchString);
    }

    setFavoriteProps(favoriteProps){
        this.favoriteProps = favoriteProps;
    }

    get favid() {
        return this.queryString.favid
    }

    get default() {
        return this.queryString.default
    }

    get serviceId(){
        return this.queryString.id
    }

    get valueContainer() {
        if (this.favid) {
            return new FavoriteValues(this.serviceId, this.favoriteProps)
        }
        if (this.default) {
            return new LocationStringValues(this.default)
        }
        return null;
    }

}