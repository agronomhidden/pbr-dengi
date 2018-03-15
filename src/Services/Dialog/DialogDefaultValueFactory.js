import {queryStringToState} from "pbr-lib-front-utils/dist/queryStringHelper"
import FavoriteValues from './FavoriteValues';
import LocationStringValues from "./LocationStringValues"

export default new class DialogDefaultValueFactory {

    queryString;

    favoriteProps;

    serviceId;


    setSearchString(searchString) {
        this.queryString = queryStringToState(searchString);
        return this;

    }

    setServiceId(id){
        this.serviceId = id;
        return this;
    }

    setFavoriteProps(favoriteProps) {
        this.favoriteProps = favoriteProps;
    }

    get favId() {
        return this.queryString.favId
    }

    get default() {
        return this.queryString.default
    }

    get() {
        return this.queryString.id
    }

    get valueContainer() {
        if (this.favId) {
            return new FavoriteValues(this.serviceId, this.favoriteProps)
        }
        if (this.default) {
            return new LocationStringValues(this.default)
        }
        return null;
    }

}