import React from 'react';
import Link from 'next/link';
import Layout from '../main/layout';


const ContestLayout = (props) => {
    const {title, description, auth, deauthenticate, children } = props;
    return (
        <>
            <Layout auth={auth} deauthenticate={deauthenticate} title={title} description={description} >
                <div className="sub-nav container">
                    <div className="row justify-content-left ">
                        <div className="links col-12 text-left">
                            <Link prefetch href="/contests/running"><a href="/contests/running">Running {' '}</a></Link>
                            <Link prefetch href="/contests/coming"><a href="/contests/coming">Coming{' '}</a></Link>
                            <Link prefetch href="/contests/past"><a href="/contests/past">Past{' '}</a></Link>
                            <Link prefetch href="/contests/create"><a href="/contests/create">Create</a></Link>
                        </div>
                    </div>
                </div>
                {children}
            </Layout>
        </>
    );
}

export default ContestLayout;