import React from 'react';

const Option = ({index, number, start, end}) => {
    let array = [];
    if (start) {
        index = start;
        for (let i = start; i <= end; i++) {
            array.push(i);
        }
    }
    else {
        for (let i = index; i <= number; i++) {
            array.push(i);
        }
    }

    const map = array.map((num, i) => {
        let opt = "";
        if (num < 10) {
            opt = "0" + num;
        }
        else {
            opt = num;
        }
        return (
            <option value={num} key={i+1}>{opt}</option>
        );
    });

    return map;
}

export default Option;