import React from 'react';
import Link from 'next/link';
import Layout from '../main/layout';


const GroupLayout = (props) => {
    const {title, description, children } = props;
    return (
        <>
            <Layout title={title} description={description} >
                <br /><br />
                <div className="container">
                    <div className="row justify-content-left ">
                        <div className="col-12 text-left">
                            <Link prefetch href="/groups/create"><a href="/groups/create">Create {' '}</a></Link>
                        </div>
                    </div>
                </div>
                {children}
            </Layout>
        </>
    );
}

export default GroupLayout;