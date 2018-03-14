import {List, Map} from 'immutable'

export default class DialogPrepareRenderFields {

    entities;

    fieldsState = {};

    valueContainer;

    constructor(entities = List([]), valueContainer = null) {
        this.entities = entities
        this.valueContainer = valueContainer;
        this.prepare()
    }

    prepare() {
        if (!!this.entities.size) {
            this.entities.forEach((record) => {
                if (Map.isMap(record)) {
                    this.setStateOfPropsForDialog(record.get('fields').toObject())
                }
            })
        }
    }

    setStateOfPropsForDialog(record) {
        for (let name in record) {
            if (record[name].editable) {
                this.fieldsState[name] = record[name].value === null ? this.getDefaultValue(name) : record[name].value;
            }
        }
    }

    getDefaultValue(name) {
        if (this.valueContainer) {
            const value = this.valueContainer.getValue(name)
            if(value){
                return value;
            }
        }
        return '';
    }

}