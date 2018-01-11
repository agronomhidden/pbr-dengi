import React from 'react'
import {Link} from 'react-router-dom'
import propTypes from 'prop-types'
import classNames from 'classnames'
import Autosuggest from 'react-autosuggest'


export default class AutoComplete extends React.Component {

    /** @var number таймаут для запроса */
    timeout;
    /** @var string строка запроса */
    searchValue;

    static propTypes = {
        /** Input */
        name: propTypes.string,
        type: propTypes.string,
        value: propTypes.string,
        placeholder: propTypes.string,
        disabled: propTypes.bool,
        onChange: propTypes.func.isRequired,
        onSubmit: propTypes.func.isRequired,
        inputModifier: propTypes.string,
        /** AutoComplete */
        multiSection: propTypes.bool,
        autoCompleteLoading: propTypes.bool,
        autoCompleteDetected: propTypes.array,
        autoCompleteFunc: propTypes.func,
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

    _getValue = suggestion => suggestion && suggestion.name

    _getSection = section => section.suggestions

    _minCountValue = val => val.length > 2

    _clearResult = () => {
    }

    renderSectionTitle = section => !!section.suggestions.length && <strong>{section.title}</strong>

    _renderBlock = ({isService, id, name}) =>
        <div key={id}>
            <Link to={`/${isService ? 'payments' : 'categories'}/${id}`}>{name}</Link>
        </div>

    _fetchRequested = ({value, reason}) => {
        this.searchValue = value.trim();
        const {props: {match: {params}, autoCompleteFunc}, searchValue} = this;
        const id = params ? params.id : null;
        clearTimeout(this.timeout);
        if (this._minCountValue(value)) {
            reason === 'input-focused' && autoCompleteFunc(searchValue, id)
            if (reason === 'input-changed' && this.searchValue !== this.props.value.trim()) {
                this.timeout = setTimeout(() => {
                    autoCompleteFunc(searchValue, id)
                }, 1000)
            }
        }
    }

    _selected = (event, {suggestionValue}) => {
        this.props.onChange({target: {name: 'searchQuery', value: suggestionValue}})
        this.props.onSubmit(event);
    }

    render = () => <Autosuggest multiSection={this.props.multiSection}
                                renderSectionTitle={this.renderSectionTitle}
                                getSectionSuggestions={this._getSection}
                                suggestions={this.props.autoCompleteDetected}
                                onSuggestionsFetchRequested={this._fetchRequested}
                                onSuggestionsClearRequested={this._clearResult}
                                getSuggestionValue={this._getValue}
                                renderSuggestion={this._renderBlock}
                                shouldRenderSuggestions={this._minCountValue}
                                onSuggestionSelected={this._selected}
                                inputProps={this._getInputProps()}/>


}
