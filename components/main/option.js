import React from 'react';


const Option = ({options = []}) => {
    const map = options.map((option, i) => {
        return <option key={i} value={option}> {option} </option>
    });

    return map;
}

export default Option;