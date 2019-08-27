import React from 'react';
import Link from 'next/link';
import Layout from '../main/layout';
import { useRouter } from 'next/router';


const InContestLayout = (props) => {
    const {title, id, description, auth, contest, deauthenticate, children } = props;
    let isAdmin = false;
    if (contest && auth.user) {
        isAdmin = contest.owner.username === auth.user.username;
    }
    return (
        <>
            <Layout auth={auth} deauthenticate={deauthenticate} title={title} description={description} >
                <div className="sub-nav container">
                    <div className="row justify-content-left ">
                        <div className="links col-12 text-left">
                            <Link prefetch href="/contests/[id]/problems" as={`/contests/${id}/problems`}><a href={`/contests/${id}/problems`}>Problems {' '}</a></Link>
                            <Link prefetch href="/contests/[id]/registrants" as={`/contests/${id}/registrants`}><a href={`/contests/${id}/registrants`}>Registrants{' '}</a></Link>
                            <Link prefetch href="/contests/[id]/submissions" as={`/contests/${id}/submissions`}><a href={`/contests/${id}/submissions`}>Submissions{' '}</a></Link>
                            <Link prefetch href="/contests/[id]/standing" as={`/contests/${id}/standing`}><a href={`/contests/${id}/standing`}>Standing{' '}</a></Link>
                            <Link prefetch href="/contests/[id]/register" as={`/contests/${id}/register`}><a href={`/contests/${id}/register`}>Register{' '}</a></Link>
                            {isAdmin && (<Link prefetch href="/contests/[id]/edit" as={`/contests/${id}/edit`}><a href={`/contests/${id}/edit`}>Edit{' '}</a></Link>)}
                        </div>
                    </div>
                </div>
                {children}
            </Layout>
        </>
    );
}

export default InContestLayout;