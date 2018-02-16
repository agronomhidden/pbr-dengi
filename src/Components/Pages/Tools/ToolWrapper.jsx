import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export const ToolWrapper = ({block, onClick, successMsg, showBox, children, label}) =>
    <div className="settings-item">
        <label className="settings-item_name -dotted" data-block={block} onClick={onClick}>
            {label}
        </label>
        {successMsg && <span className='settings-item_successMsgs'>
                    {successMsg}
                    </span>}
        <ReactCSSTransitionGroup transitionName="settings-item_transition"
                                 transitionEnterTimeout={500}
                                 transitionLeaveTimeout={500}>
            {showBox && <div className="settings-item_content">
                {children}
            </div>}
        </ReactCSSTransitionGroup>
    </div>



