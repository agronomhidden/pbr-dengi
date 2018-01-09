import React from 'react'
import {Link} from 'react-router-dom'
import propTypes from 'prop-types'
import classNames from 'classnames'
import Autosuggest from 'react-autosuggest'


export default class AutoComplete extends React.Component {

    static propTypes = {
        /** Input */
        name: propTypes.string,
        type: propTypes.string,
        value: propTypes.string,
        placeholder: propTypes.string,
        disabled: propTypes.bool,
        onChange: propTypes.func.isRequired,
        onSelect: propTypes.func,
        inputModifier: propTypes.string,
        /** Label */
        label: propTypes.string,
        labelModifier: propTypes.string,
        /** Wrapper */
        wrapperModifier: propTypes.string,
        /** General */
        error: propTypes.object,
        multiSection: propTypes.bool,
        autoCompleteLoading: propTypes.bool,
        autoCompleteDetected: propTypes.array,
        autoCompleteFunc: propTypes.func,
        resetAutoComplete: propTypes.func
    };

    _getInputProps = () => {

        const {
            name, placeholder, type = 'text',
            disabled, inputModifier, onChange,
            value
        } = this.props;

        const inputClass = {
            'search-form_input': !inputModifier,
        };
        inputClass[inputModifier] = !!inputModifier;

        return {
            className: classNames(inputClass),
            name,
            type,
            placeholder,
            disabled,
            onChange,
            value
        };
    }

    _getValue = suggestion => suggestion.name

    _getSection = section => section.suggestions

    _minCountValue = val => val.trim().length > 2

    _renderBlock = ({isService, id, name}) =>
        <div key={id}>
            <Link to={`/${isService ? 'payments' : 'categories'}/${id}`}>{name}</Link>
        </div>

    _fetchRequested = ({value}) => {
        const {props: {match: {params}, autoCompleteFunc}} = this;

        if (this._minCountValue(value)) {
            const id = params ? params.id : null;
            autoCompleteFunc(value, id)
        }
    }

    _clearResult = () => {
        const {value, resetAutoComplete} = this.props;
        if (this._minCountValue(value)) {
            resetAutoComplete()
        }
    }

    _onSuggestionSelected = (event, {suggestionValue}) => suggestionValue = '';

    renderSectionTitle = section =>
        !!section.suggestions.length && <strong>{section.title}</strong>

    render = () => <Autosuggest multiSection={this.props.multiSection}
                                renderSectionTitle={this.renderSectionTitle}
                                getSectionSuggestions={this._getSection}
                                suggestions={this.props.autoCompleteDetected}
                                onSuggestionsFetchRequested={this._fetchRequested}
                                onSuggestionsClearRequested={this._clearResult}
                                getSuggestionValue={this._getValue}
                                renderSuggestion={this._renderBlock}
                                shouldRenderSuggestions={this._minCountValue}
                                onSuggestionSelected={this._onSuggestionSelected}
                                inputProps={this._getInputProps()}/>


}
