import MobileDetectedFactory from '../Services/Factories/MobileDetectedFactory';

export default function defineIncomeSys(req, res, next) {
    MobileDetectedFactory.setUserAgent(req)
    next()
}