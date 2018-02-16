import React from 'react';
import PageComponent from "../../App/PageComponent"
import PageLayout from "../../Decorators/PageLayout"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Tools extends PageComponent {


    state = {
        showBox: []
    }

    _onClick = (e) => {
        let number = e.target.getAttribute('data-blocknumber');
        let {showBox} = this.state;
        console.log(number , !showBox[number])
        showBox[number] = !showBox[number];
        this.setState(showBox)
    };


    render() {
        return (
            <div>
                <label className="-dotted" data-blocknumber={1} onClick={this._onClick}>
                        Сменить пароль
                </label>
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}>
                    {this.state.showBox[1] && <div style={{height: '150px', border: '1px '}}>

                    </div>}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

export default (PageLayout(Tools))

