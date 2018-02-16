import React from 'react';

export function Button({onClick, children, modifier, disabled}) {
    return <button className={modifier} onClick={onClick} disabled={disabled}>{children}</button>
}