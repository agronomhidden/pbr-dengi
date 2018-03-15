import AbstractDefaultValues from "./AbstractDefaultValues"

export default class FavoriteValues extends AbstractDefaultValues {

    defaultValues = []

    constructor(defaultValues) {
        super()
        this.defaultValues = defaultValues;
    }

    getValue() {
        return this.defaultValues.shift()
    }

}