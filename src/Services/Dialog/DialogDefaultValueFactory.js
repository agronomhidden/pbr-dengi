import {queryStringToState} from "pbr-lib-front-utils/dist/queryStringHelper"
import FavoriteValues from './FavoriteValues';

export default new class DialogDefaultValueFactory {

    defaultValues;

    queryString;

    favoriteProps;

    setSearchString(searchString){
        this.queryString = queryStringToState(searchString);
    }

    setFavoriteProps(favoriteProps){
        this.queryString = favoriteProps;
    }

    getFavid() {
        return this.queryString.favid
    }

    getDefault() {
        return this.queryString.default
    }

    getServiceId(){
        return this.queryString.id
    }

    get valueContainer() {
        if (this.getFavid()) {
            console.log(this.getFavid());
            return new FavoriteValues(this.getServiceId(), this.favoriteProps)
        }
        if (this.getDefault()) {
         //   return new LocationStringValues(this.getDefault()).getValues()
        }
        return false;
    }

}