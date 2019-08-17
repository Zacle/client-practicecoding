import React from 'react';
import Link from 'next/link';
import Layout from '../main/layout';


const GroupLayout = (props) => {
    const {title, description, auth, deauthenticate, children } = props;
    return (
        <>
            <Layout title={title} description={description} auth={auth} deauthenticate={deauthenticate} >
                <div className="sub-nav container">
                    <div className="row justify-content-left ">
                        <div className="links col-12 text-left">
                            <Link prefetch href="/groups"><a href="/groups">Available Groups</a></Link>
                            <Link prefetch href="/groups/create"><a href="/groups/create">Create</a></Link>
                        </div>
                    </div>
                </div>
                {children}
            </Layout>
        </>
    );
}

export default GroupLayout;