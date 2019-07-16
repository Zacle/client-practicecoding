import React from 'react';
import Link from 'next/link';
import Layout from './layout';


const ContestLayout = (props) => {
    const {title, description, children } = props;
    return (
        <>
            <Layout title={title} description={description} >
                <br /><br />
                <div className="container">
                    <div className="row justify-content-left ">
                        <div className="col-6 text-left">
                            <Link prefetch href="/contests/running"><a href="/contests/running">Running {' '}</a></Link>
                            <Link prefetch href="/contests/coming"><a href="/contests/coming">Coming{' '}</a></Link>
                            <Link prefetch href="/contests/past"><a href="/contests/past">Past{' '}</a></Link>
                            <Link prefetch href="/contests/past"><a href="/contests/create">Create</a></Link>
                        </div>
                    </div>
                </div>
                {children}
            </Layout>
        </>
    );
}

export default ContestLayout;