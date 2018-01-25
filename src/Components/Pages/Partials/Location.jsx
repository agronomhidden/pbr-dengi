import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Select} from "./Select"
import {mapToArr} from "pbr-lib-front-utils/src/dateManipulation"
import {RegionsRecord, CitiesRecord} from "../../../Reducers/entities"


export class Location extends Component {


    componentWillMount(){

    }


    render() {
        return (<div>
            <Select name={'cities'} onChange, selected, modifier = 'defaultClass',children} />
            <Select/>
        </div>);
    }
}

export default connect(
    ((s) => ({
        cities: mapToArr(s.location.cities, CitiesRecord),
        regions: mapToArr(s.location.regions, RegionsRecord),
        loading: s.location.loading,
    }))
)(Location)