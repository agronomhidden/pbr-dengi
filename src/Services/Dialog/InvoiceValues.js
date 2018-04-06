import AbstractDefaultValues from "./AbstractDefaultValues"

export default class InvoiceValues extends AbstractDefaultValues {

    defaultValues = []

    /**
     * @param invoiceId
     * @param {UserDataServiceEntity} props
     */

    constructor(invoiceId, props) {
        super()
        if (props && props.getId() === Number(invoiceId)) {
            this.defaultValues.push(props.getIdentifier())
        }
    }

    getValue() {
        return this.defaultValues.shift()
    }

}