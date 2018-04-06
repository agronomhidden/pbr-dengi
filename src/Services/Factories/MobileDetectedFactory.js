import MobileDetect from 'mobile-detect'
import is from 'is_js'
import {ANDROID, IOS} from "../../CONSTANTS"

export default new class MobileDetectedFactory {

    userAgent = null;

    removeTeaser = null;

    setUserAgent(req) {

        if (req.headers && is.existy(req.headers['user-agent'])) {
            this.userAgent = req.headers['user-agent']
        }

        if (req.cookies && req.cookies['removeTeaser']) {
            this.removeTeaser = req.cookies['removeTeaser']
        }

    }

    getDetected() {
        return new MobileDetect(this.userAgent)
    }

    getOs() {
        const os = this.getMobileOs()

        if (os && !this.removeTeaser) {
            return os
        }

        return null
    }

    getMobileOs() {
        const md = this.getDetected()
        if (md.mobile() && [IOS, ANDROID].includes(md.os())) {
            return md.os()
        }
        return null
    }



}