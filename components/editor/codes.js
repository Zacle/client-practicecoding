import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const Code = ({code, remove}) => {
    return (
        <>
            <tr className="text-center">
                <td><Link prefetch href="/editor/[id]" as={"/editor/" + code.uri} ><a href={"/editor/" + code.uri}>{code.name || "Test"}</a></Link></td>
                <td><button className="btn" onClick={() => remove(code._id)}><span data-toggle="tooltip" data-placement="top" title="Click to remove this code"><FontAwesomeIcon icon="trash-alt" /></span></button></td>
            </tr>
        </>
    );
}

const Codes = ({codes = [], remove}) => {

    if (codes.length === 0) {
        return (
            <>
                <div className="row justify-content-center">
                    No source code saved yet.
                </div>
            </>
        );
    }

    const map = codes.map((code, i) => {
        return (
            <Code key={i+1} code={code} remove={remove} />
        );
    });

    return (
        <>
            <div className="table-responsive-md">
                <table className="table table-sm table-bordered table-striped table-hover table-fixed">
                    <thead className="thead-dark">
                        <tr className="text-center">
                            <th>Name</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {map}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Codes;