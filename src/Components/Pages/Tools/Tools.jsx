import React from 'react';
import PageComponent from "../../App/PageComponent"
import PageLayout from "../../Decorators/PageLayout"
import {ChangePassword, SetProfile} from './index';
import {ToolWrapper} from './ToolWrapper';


class Tools extends PageComponent {

    state = {
        showBox: [],
        successMsgs: []
    }

    _onClick = ({target}) => {
        let number = target.getAttribute('data-block');
        let {showBox} = this.state;
        showBox[number] = !showBox[number];
        this.setState(showBox)
    };

    blockManagement = (blockNumber, successMsg = null) => {
        let {showBox, successMsgs} = this.state;
        showBox[blockNumber] = !showBox[blockNumber];
        if (successMsg) {
            successMsgs[blockNumber] = successMsg
        }
        this.setState({showBox, successMsg})
    }

    render() {
        return (
            <div className="settings-item">
                <ToolWrapper block={1} successMsg={this.state.successMsgs[1]}
                             showBox={this.state.showBox[1]} onClick={this._onClick} label='Сменить пароль'>
                    <ChangePassword blockManagement={this.blockManagement} block={1}/>
                </ToolWrapper>
                <ToolWrapper block={2} successMsg={this.state.successMsgs[2]}
                             showBox={this.state.showBox[2]} onClick={this._onClick} label='Сменить ФИО'>
                    <SetProfile blockManagement={this.blockManagement} block={2}/>
                </ToolWrapper>
            </div>
        );
    }
}

export default (PageLayout(Tools))

