import React from 'react';
import Link from 'next/link';
import Layout from '../main/layout';


const TrainLayout = ({title, description, auth, deauthenticate, children}) => {
    return (
        <>
            <Layout auth={auth} deauthenticate={deauthenticate} title={title} description={description} >
                <div className="sub-nav container">
                    <div className="row justify-content-left ">
                        <div className="links col-12 text-left">
                            <Link prefetch href="/train/"><a href="/train">Train</a></Link>
                            <Link prefetch href="/train/filter"><a href="/train/filter">Filter problems</a></Link>
                        </div>
                    </div>
                </div>
                {children}
            </Layout>
        </>
    );
}

export default TrainLayout;