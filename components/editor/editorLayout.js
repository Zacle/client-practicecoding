import React from 'react';
import Link from 'next/link';
import Layout from '../main/layout';


const EditorLayout = (props) => {
    const {title, description, auth, deauthenticate, children } = props;
    return (
        <>
            <Layout auth={auth} deauthenticate={deauthenticate} title={title} description={description} >
                <div className="sub-nav container">
                    <div className="row justify-content-left ">
                        {auth.isLoggedIn && (<div className="links col-12 text-left">
                            <Link prefetch href="/editor"><a href="/editor">New Code {' '}</a></Link>
                            <Link prefetch href="/editor/my"><a href="/editor/my">My Codes{' '}</a></Link>
                        </div>)}
                    </div>
                </div>
                {children}
            </Layout>
        </>
    );
}

export default EditorLayout;