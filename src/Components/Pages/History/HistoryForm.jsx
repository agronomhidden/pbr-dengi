import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SimpleDatePicker from "../Partials/SimpleDatePicker"
import moment from "moment"


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
                    <SimpleDatePicker format="DD.MM.YY" onChange={this.props.onChange} name="dateFrom"
                                      value={moment(this.props.dateFrom,"MM.DD.YY")}/>
                    по
                    <SimpleDatePicker format="DD.MM.YY" onChange={this.props.onChange} name="dateTo"
                                      value={moment(this.props.dateTo,"MM.DD.YY")}/>
                    <button><span>Показать</span></button>
                </div>
            </form>
        );
    }
}

