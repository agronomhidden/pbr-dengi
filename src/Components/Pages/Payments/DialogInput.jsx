import React, {Component} from 'react';
import PropTypes from 'prop-types'
import attributesForDialogInput from "../../Decorators/attributesForDialogInput"
import InputMask from 'react-input-mask'

class DialogInput extends Component {

    static propTypes = {
        mask: PropTypes.object,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
        maskAttributes: PropTypes.object.isRequired,
        attributes: PropTypes.object.isRequired,
        hint: PropTypes.string,
        editable: PropTypes.bool
    };

    _getInput() {

        const {
            mask, value, hint, maskAttributes,
            editable, attributes
        } = this.props;

        if (!editable) {
            return <h3>{value}</h3>
        }

        if (attributes.type === 'mask' || mask) {
            return <InputMask {...maskAttributes}/>
        }

        if (attributes.type === 'date') {
            //return <DatePicker {...attributes} />
        }

        return (
            <div>
                <input ref="name" {...attributes}/>
                {hint && ' ' + hint}
            </div>)
    }

    render = () => this._getInput()

}

export default attributesForDialogInput(DialogInput)