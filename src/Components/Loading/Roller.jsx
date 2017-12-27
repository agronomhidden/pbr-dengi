import React from 'react';
import roller from '../../../public/img/roller.gif';

export const Roller = ({width, modifier, parentClass}) =>
    <div className={parentClass}>
        <img src={roller} width={width ? width : '100px'} className={modifier} alt="Загрузка"/>
    </div>
