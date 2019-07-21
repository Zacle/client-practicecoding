import React from 'react';
import Link from 'next/link';
import Layout from '../main/layout';


const InGroupLayout = (props) => {
    const {title, description, id, children } = props;
    return (
        <>
            <Layout title={title} description={description} >
                <br /><br />
                <div className="container">
                    <div className="row justify-content-left ">
                        <div className="col-12 text-left">
                            <Link prefetch href="/groups/[id]/members" as={`/groups/${id}/members`} ><a href={`/groups/${id}/members`}>Members {' '}</a></Link>
                            <Link prefetch href="/groups/[id]/contests" as={`/groups/${id}/contests`}><a href={`/groups/${id}/contests`}>Contests {' '}</a></Link>
                            <Link prefetch href="/groups/[id]/messages" as={`/groups/${id}/messages`}><a href={`/groups/${id}/messages`}>Messages {' '}</a></Link>
                            <Link prefetch href="/groups/[id]/invite" as={`/groups/${id}/invite`}><a href={`/groups/${id}/invite`}>Invite {' '}</a></Link>
                            <Link prefetch href="/groups/[id]/edit" as={`/groups/${id}/edit`}><a href={`/groups/${id}/edit`}>Edit {` `}</a></Link>
                            <Link prefetch href="/groups/[id]/createcontest" as={`/groups/${id}/createcontest`}><a href={`/groups/${id}/createcontest`}>Create Contest</a></Link>
                        </div>
                    </div>
                </div>
                {children}
            </Layout>
        </>
    );
}

export default InGroupLayout;