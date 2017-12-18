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

    _getSuggestionValue = suggestion => suggestion.name


    _getSectionSuggestions = (section) => section.suggestions


    _minCountValue = val => val.trim().length > 2

    _renderSuggestion = ({isService, id, name}) =>
        <div key={id}>
            <Link to={`/${isService ? 'services' : 'categories'}/${id}`}>{name}</Link>
        </div>


    _onSuggestionsFetchRequested = ({value}) => {
        const {props: {match: {params}, autoCompleteFunc, resetAutoComplete}} = this;

        if (this._minCountValue(value)) {
            const id = params ? params.id : null;
            autoCompleteFunc(value, id)
        } else {
            resetAutoComplete()
        }
    }


    _onSuggestionSelected = (event, {suggestionValue}) => suggestionValue = '';

    renderSectionTitle = section =>
        !!section.suggestions.length && <strong>{section.title}</strong>


    render = () => <Autosuggest multiSection={this.props.multiSection}
                                renderSectionTitle={this.renderSectionTitle}
                                getSectionSuggestions={this._getSectionSuggestions}
                                suggestions={this.props.autoCompleteDetected}
                                onSuggestionsFetchRequested={this._onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={() => {
                                }}
                                getSuggestionValue={this._getSuggestionValue}
                                renderSuggestion={this._renderSuggestion}
                                shouldRenderSuggestions={this._minCountValue}
                                onSuggestionSelected={this._onSuggestionSelected}
                                inputProps={this._getInputProps()}/>


}
