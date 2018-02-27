import React from 'react'
import PageComponent from '../../App/PageComponent'
import {
    autoCompleteSearch,
    categoriesSetSearch,
    getCategories,
    resetAutoComplete
} from "../../../Reducers/AC/categoriesAC";
import {mapToArr} from "pbr-lib-front-utils/dateManipulation";
import PageLayout from "../../Decorators/PageLayout";
import {CategoriesRecord} from "../../../Reducers/entities";
import {connect} from "react-redux";
import PageDataLoader from "../../Decorators/PageDataLoader";

class Accounts extends PageComponent {

    render() {
        return <div>Мои счета</div>
    }
}

export default connect(
    (s => ({

    })),
    {

    }
)(PageLayout(Accounts));