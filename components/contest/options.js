import React from 'react';


export const CodeforcesOption = ({options = []}) => {
    const map = options.map((option, i) => {
        return <option key={i+1} value={option.id}> {option.name} </option>
    });

    return map;
}

export const UvaOption = ({options = []}) => {

    const filter = options.filter(option => option.problems.length !== 0);

    const map = filter.map((option, i) => {
        return <option key={i+1} value={option.id}> {option.name} </option>
    });

    return map;
}

export const RegisterOption = ({options = []}) => {
    const map = options.map((option, i) => {
        return <option key={i+1} value={option._id}> {option.name} </option>
    });

    return map;
}