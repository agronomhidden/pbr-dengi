import React from 'react';

export function Button({onClick, children, modifier, title}) {
    return <button className={modifier} title={title} onClick={onClick}>{children}</button>
}