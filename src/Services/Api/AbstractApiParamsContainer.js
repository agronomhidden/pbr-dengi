
export default class AbstractApiParamsContainer {

    store = null;

    ips = [];

    token = null;

    locationId = null;

    url = null;

    constructor(url) {
        if (new.target === AbstractApiParamsContainer) {
            throw new TypeError('Cannot construct Abstract instances directly');
        }
        this.url = url;
    }

    hasStore() {
        return !!this.store;
    }

    hasIP() {
        return !!this.ips.length;
    }

    setStore(store) {
        this.store = store;
        return this;
    }

    getUser() {
        if (!this.store) {
            throw new Error('store was not be defined');
        }
        return this.store.getState().auth.user || null;
    }

    getLocationId() {
        return this.locationId;
    }

    getIP() {
        return this.ips.join(' ');
    }

    getUrl() {
        return this.url;
    }
}