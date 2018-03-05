import React from 'react'
import {connect} from "react-redux";

import PageComponent from '../../App/PageComponent'
import {mapToArr} from "pbr-lib-front-utils/dateManipulation";
import PageLayout from "../../Decorators/PageLayout";
import Slider from './Slider'
import {ACCOUNTS_SLIDER_LOADED} from "../../../CONSTANTS";
import {loadBanners} from '../../../Reducers/AC/accountsAC'

class Accounts extends PageComponent {

    componentDidMount() {
        super.componentDidMount();
        if (this.props.sliderLoaded === false) {
            this.props.loadBanners()
        }
    }

    render() {
        return <div>
            <div>Мои счета</div>
            <div>{this.isBrowser() && this.props.sliderLoaded ? <Slider/> : null }</div>
        </div>
    }
}

export default connect(
    (s => ({
        sliderLoaded: !!(s.accounts.get('allDivLoaded') & ACCOUNTS_SLIDER_LOADED)
    })),
    {
        loadBanners
    }
)(PageLayout(Accounts));