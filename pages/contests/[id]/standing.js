import React, { Component } from 'react';
import { withRouter } from 'next/router';
import InContestLayout from '../../../components/contest/inContestLayout';
import Standings from '../../../components/contest/standing';


class ContestStanding extends Component {

    constructor(props) {
        super(props);

        this.id = props.router.query.id;
    }

    render () {
        const title = "Test Standing | Practice Coding OJ";
        const description = "Standing for this contest";

        return (
            <>
                <br />
                <InContestLayout id={this.id} title={title} description={description} >
                    <br /><br />
                    <div>
                        <Standings />
                    </div>
                </InContestLayout>
            </>
        );
    }
}

export default withRouter(ContestStanding);