
export default class FavoriteValues {

    defaultValues = {}

    constructor(serviceId, props) {
        if (props && props.get('service_id') === Number(serviceId)) {
            this.prepareValue(props)
        }
    }

    prepareValue(props) {
        props.fields.map((item, i) => {
            this.defaultValues[item.name] = item.value
        })
    }

    getValue(name) {
        return this.defaultValues[name]
    }

}