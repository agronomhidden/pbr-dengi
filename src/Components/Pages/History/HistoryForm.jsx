import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SimpleDatePicker from "../Partials/SimpleDatePicker"


export default class HistoryForm extends Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        dateFrom: PropTypes.string.isRequired,
        dateTo: PropTypes.string.isRequired
    }

    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                <div>
                    Период с
                    <SimpleDatePicker format="MM.DD.YY" onChange={this.props.onChange} name="dateFrom"
                                      value={this.props.dateFrom}/>
                    по
                    <SimpleDatePicker format="MM.DD.YY" onChange={this.props.onChange} name="dateTo"
                                      value={this.props.dateTo}/>
                    <button><span>Показать</span></button>
                </div>
            </form>
        );
    }
}

