import React from 'react';
import Autocomplete from 'react-autocomplete';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';


export default class AutoComplete extends React.Component {

    static propTypes = {
        /** Input */
        name: propTypes.string,
        value: propTypes.string,
        placeholder: propTypes.string,
        disabled: propTypes.bool,
        onChange: propTypes.func.isRequired,
        inputModifier: propTypes.string,
        /** Label */
        label: propTypes.string,
        labelModifier: propTypes.string,
        /** Wrapper */
        wrapperModifier: propTypes.string,
        /** General */
        error: propTypes.object,
    };



    state = {
        search: ''
    }

    _onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };


    render() {
        return <Autocomplete

            getItemValue={(item) => item.label}

            open={this.state.search.length > 3}
            items={[
                {label: 'apple'},
                {label: 'banana'},
                {label: 'pear'}
            ]}
            renderItem={(item, isHighlighted) =>
                <div key={item.label} style={{background: isHighlighted ? 'lightgray' : 'white'}}>
                    <Link to='/categories/1'>{item.label}</Link>
                </div>
            }
            renderInput={
                props => {
                    console.log(this.props);
                    return <input name='search' {...props} className='search-form_input' type="text"/>
                }
            }
            value={this.state.search}
            onChange={this._onChange}
            onSelect={(val) => this.setState({search: val})}
        />
    }
}