import React from 'react';
import { Card, CardImg, CardBody, CardText,Container } from 'reactstrap';
import Link from 'next/link';

const FirstMenu = ()=> {
    return (
        <>
            <div className = "col-12 col-md m-1">
                <Card>
                    <CardImg width="100%" src={"../static/images/contest.jpg"} />
                    <CardBody>
                        <CardText className = "text-center">
                            Make contests
                        </CardText>
                    </CardBody>
                </Card>
            </div>
            <div className = "col-12 col-md m-1">
                <Card>
                    <CardImg width="100%" src={"../static/images/groups.jpg"} />
                    <CardBody>
                        <CardText className = "text-center">
                            Manage groups and group contests
                        </CardText>
                    </CardBody>
                </Card>
            </div>
            <div className = "col-12 col-md m-1">
                <Card>
                    <CardImg width="100%" src={"../static/images/discussions.png"} />
                    <CardBody>
                        <CardText className = "text-center">
                            Engage discussions between members
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

const SecondMenu = () => {
    return (
        <>
            <div className = "col-12 col-md m-1">
                <h1 className="text-center">Want to train?</h1>
                <p className="text-center">You can improve your coding skills by solving problems from various online Platforms that match your current level.</p>
                <p className="text-center">Go ahead and <Link prefetch href="/"><a style={{textDecoration: "none"}} href="#">train </a></Link>
                    to improve yourself
                </p>
            </div>
            <div className = "col-12 col-md m-1">
                <h1 className="text-center">Want to compete?</h1>
                <p className="text-center">Compete against each other individually or other teams. You can as well compete in your group contests</p>
                <p className="text-center">Go ahead and <Link prefetch href="/contests/create"><a style={{textDecoration: "none"}} href="/contests/create">create </a></Link>
                    or participate to a <Link prefetch href="/contests/running"><a style={{textDecoration: "none"}} href="/contests/running">contest</a></Link>
                </p>
            </div>
            <div className = "col-12 col-md m-1">
                <h1 className="text-center">Need help?</h1>
                <p className="text-center">If you're stuck in any problems you can request help in our public chat room. You can as well help each other during a team contest</p>
                <p className="text-center">Join our public <Link prefetch href="/"><a style={{textDecoration: "none"}} href="#">chat room</a></Link>
                </p>
            </div>
        </>
    );
}

/**
 * This component is used to display menu in the main page
 */
const IndexMenu = () => {
    return (
        <>
            <br />
            <div className = "container">
                <div className="row align-items-start">
                    <FirstMenu />
                </div>
                <hr />
                <div className="row align-items-start">
                    <SecondMenu />
                </div>
            </div>
        </>
    );
}

export default IndexMenu;