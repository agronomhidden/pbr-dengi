import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Select} from "./Select"
import {mapToArr} from 'pbr-lib-front-utils/dateManipulation'
import {RegionsRecord, CitiesRecord} from "../../../Reducers/entities"
import {changeLocation} from "../../../Reducers/AC/locationAC"
import {Button} from "./index"

export class Location extends Component {

    state = {
        region: 1,
        city: ''
    }

    componentWillMount() {
        this.props.locationId && this.setState((prevState, props) => {
            const city = props.cities.find(city => city.id === Number(props.locationId))
            const region = city ? city.parent_id : props.locationId
            return {
                city: city ? city.id : 0,
                region: region
            }
        })
    }

    _onClick = () => {
        const { city ,region } = this.state

        this.props.changeLocation(city !== '0' && city || region);
    }

    _onChange = ({target: {name, value}}) => {
        this.setState((prevState) => {
            const state = {[name]: value}
            if (name === 'region' && value !== prevState.region) {
                Object.assign(state, {city: 0})
            }
            return state
        })
    }

    _getRegionOptions = () => this.props.regions.map(region =>
        <option key={region.id} value={region.id}>{region.name}</option>)

    _getCitiesOptions = () => this.props.cities
        .filter(city => Number(this.state.region) === city.parent_id)
        .map(city => <option key={city.id} value={city.id}>{city.name}</option>)

    render() {
        return (<div>
            <Select name='region' onChange={this._onChange} selected={this.state.region}>
                {this._getRegionOptions()}
            </Select>
            <Select name='city' onChange={this._onChange} selected={this.state.city}>
                <option value={0}>Выберите город / регион</option>
                {this._getCitiesOptions()}
            </Select>
            <button title='Выбрать' onClick={this._onClick} disabled={this.props.loading}>Выбрать локацию</button>
        </div>);
    }
}

export default connect(
    ((s) => ({
        cities: mapToArr(s.location.get('cities'), CitiesRecord),
        regions: mapToArr(s.location.get('regions'), RegionsRecord),
        locationId: s.location.get('locationId'),
        loading: s.location.get('loading'),
    })),
    {changeLocation}
)(Location)