import {Record} from 'immutable'

const defaultFields = {
    text: '',
    description: '',
    banner_img: '',
    placeholder: '',
    offset_x: 0,
    offset_y: 0,
    service_id: null,
}

export default class BannerEntity extends Record(defaultFields) {

    getBannerImg() {
        return this.banner_img
    }

    getServiceId() {
        return this.service_id
    }

    getTextTitle() {
        return this.text
    }

    getDescription() {
        return this.description
    }

    getPlaceholder() {
        return this.placeholder
    }

    getOffsetX() {
        return this.offset_x
    }

    getOffsetY() {
        return this.offset_y
    }
}
