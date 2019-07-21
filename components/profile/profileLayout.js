import React from 'react';
import Link from 'next/link';
import Layout from '../main/layout';


const ProfileLayout = (props) => {
    const {title, description, username, children } = props;
    return (
        <>
            <Layout title={title} description={description} >
                <br /><br />
                <div className="container">
                    <div className="row justify-content-left ">
                        <div className="col-12 text-left">
                            <Link prefetch href="/profile/[username]" as={`/profile/${username}`}><a href={`/profile/${username}`}>{username} {' '}</a></Link>
                            <Link prefetch href="../teams/with/[username]" as={`../teams/with/${username}`}><a href={`../teams/with/${username}`}>Teams{' '}</a></Link>
                            <Link prefetch href="../groups/with/[username]" as={`../groups/with/${username}`}><a href={`../groups/with/${username}`}>Groups{' '}</a></Link>
                            <Link prefetch href="../contests/with/[username]" as={`../contests/with/${username}`}><a href={`../contests/with/${username}`}>Contests</a></Link>
                        </div>
                    </div>
                </div>
                {children}
            </Layout>
        </>
    );
}

export default ProfileLayout;