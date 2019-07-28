import React, { Component } from 'react';
import { withRouter } from 'next/router';
import InContestLayout from '../../../components/contest/inContestLayout';
import Problems from '../../../components/contest/problems';


class ContestProblems extends Component {

    constructor(props) {
        super(props);

        this.id = props.router.query.id;
    }

    render () {
        const title = "Test Problems | Practice Coding OJ";
        const description = "Problems for this contest";

        return (
            <>
                <br />
                <InContestLayout id={this.id} title={title} description={description} >
                    <br /><br />
                    <div>
                        <Problems />
                    </div>
                </InContestLayout>
            </>
        );
    }
}

export default withRouter(ContestProblems);