import {queryStringToState} from "pbr-lib-front-utils/dist/queryStringHelper"
import FavoriteValues from './FavoriteValues';
import LocationStringValues from "./LocationStringValues"
import InvoiceValues from "./InvoiceValues"

export default new class DialogDefaultValueFactory {

    queryString;

    favoriteProps;

    invoiceProps;

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

    setInvoiceProps(invoiceProps) {
        this.invoiceProps = invoiceProps;
    }

    get favId() {
        return this.queryString.favId
    }

    get default() {
        return this.queryString.default
    }


    get invoiceId() {
        return this.queryString.invoiceId
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
        if (this.invoiceId) {
            return new InvoiceValues(this.invoiceId, this.invoiceProps)
        }

        return null;
    }

}