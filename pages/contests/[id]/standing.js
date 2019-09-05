import React, { Component } from 'react';
import { withRouter } from 'next/router';
import InContestLayout from '../../../components/contest/inContestLayout';
import Standings from '../../../components/contest/standing';
import {connect} from 'react-redux';
import {deauthenticate} from '../../../redux/actions/authActions';
import {fetchStanding, updateStanding} from '../../../redux/actions/contestActions';
import init from '../../../utils/initialize';
import Layout from '../../../components/main/layout';
import Loading from '../../../components/loading';



class ContestStanding extends Component {

    constructor(props) {
        super(props);

        this.id = props.router.query.id;
        this.state = {
            remained: ''
        };
        this.duration = this.duration.bind(this);
    }

    static getInitialProps(ctx) {
        init(ctx);
    }

    /**
     * @description computes the duration of the contest
     * @param date1 
     * @param date2 
     */
    duration(date1, date2) {
        // Get 1 day in milliseconds
        const one_day = 1000 * 60 * 60 * 24;

        // Convert both dates to milliseconds
        const date1_ms = date1.getTime();
        const date2_ms = date2.getTime();

        // Calculate the difference in milliseconds
        let difference_ms = date2_ms - date1_ms;
        // take out milliseconds
        difference_ms = difference_ms/1000;

        let seconds = Math.floor(difference_ms % 60);
        difference_ms = difference_ms/60; 
        let minutes = Math.floor(difference_ms % 60);
        difference_ms = difference_ms/60; 
        const hours = Math.floor(difference_ms % 24);  
        const days = Math.floor(difference_ms/24);

        let duration = "";
        if (days > 0) {
            if (days == 1)
                duration += days + " day";
            else
                duration += days + " days";
        }
        if (hours > 0) {
            if (days > 0)
                duration += ", ";
            if (hours == 1) 
                duration += hours + " hour";
            else
                duration +=  hours + " hours";
        }
        if (minutes > 0) {
            if (days > 0 || hours > 0)
                duration += ", ";
            if (minutes < 2)
                duration += minutes + " minute";
            else
                duration += minutes + " minutes";
        }
        if (seconds > 0) {
            if (days > 0 || hours > 0 || minutes > 0) {
                duration += " and ";
            }
            if (seconds < 2) {
                duration += seconds + " second";
            }
            else {
                duration += seconds + " seconds";
            }
        }

        this.setState({
            remained: duration
        });

    }

    async componentDidMount() {
        await this.props.updateStanding(this.id);

        if (this.props.contests.standing) {
            let date = new Date(this.props.contests.standing.standing.contestID.endDate);

            this.time = setInterval(() => this.duration(new Date(), new Date(this.props.contests.standing.standing.contestID.endDate)), 1000);

            if (this.props.contests.standing.standing.contestID.type === 1 && date.getTime() > Date.now() ) {
                this.interval = setInterval(() => this.props.updateStanding(this.id), 180000);
            }
            else if(date.getTime() > Date.now()) {
                this.interval = setInterval(() => this.props.updateStanding(this.id), 300000);
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        clearInterval(this.time);
    }

    render () {
        if (this.props.contests.standingError && !this.props.contests.isLoading) {
            const title = "Practice Coding OJ";
            return (
                <Layout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title}>
                    <div className="info container">
                        <div className="error row justify-content-center">
                            <p className="error">{this.props.contests.standingError}</p>
                        </div>
                    </div>
                </Layout>
            );
        }
        else if (this.props.contests.standing && !this.props.contests.isLoading) {
            const title = "Standing | Practice Coding OJ";
            const description = "Standing for this contest";

            return (
                <>
                    <InContestLayout contest={this.props.contests.standing.standing.contestID} auth={this.props.auth} deauthenticate={this.props.deauthenticate} id={this.id} title={title} description={description} >
                        <br />
                        <div className="container">
                            <div className="card-text row justify-content-center">
                                <span style={{fontSize: "20px"}}>Time remaining: {this.state.remained}</span>
                            </div>
                            <br />
                            <Standings problems={this.props.contests.standing.problems} standing={this.props.contests.standing.standing} />
                        </div>
                    </InContestLayout>
                </>
            );
        }
        else {
            return (
                <Loading auth={this.props.auth} deauthenticate={this.props.deauthenticate} />
            );
        }
    }
}

const mapStateToProps = state => ({
        auth: state.authentication,
        contests: state.contests
    }
);

export default withRouter(connect(
    mapStateToProps,
    {deauthenticate, fetchStanding, updateStanding}
)(ContestStanding));