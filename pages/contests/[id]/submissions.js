import React, { Component } from 'react';
import { withRouter } from 'next/router';
import InContestLayout from '../../../components/contest/inContestLayout';
import Submissions from '../../../components/contest/submissions';


class ContestSubmissions extends Component {

    constructor(props) {
        super(props);

        this.id = props.router.query.id;
    }

    render () {
        const title = "Test Registrants | Practice Coding OJ";
        const description = "Registrants for this contest";

        return (
            <>
                <br />
                <InContestLayout id={this.id} title={title} description={description} >
                    <br /><br />
                    <div>
                        <Submissions />
                    </div>
                </InContestLayout>
            </>
        );
    }
}

export default withRouter(ContestSubmissions);