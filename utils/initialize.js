import Router from 'next/router';
import { reauthenticate } from '../redux/actions/authActions';
import { getCookie } from './cookie';


const init = (ctx, isSecured = false) => {
    
    if (ctx.isServer) {
        if (ctx.req.headers.cookie) {
            ctx.store.dispatch(reauthenticate(getCookie('auth', ctx.req)));
        }
        else if (isSecured) {
            ctx.res.writeHead(302, { Location: '/login' });
            ctx.res.end();
            return;
        }
        else {
            return;
        }
    }
    else {
        const token = ctx.store.getState().authentication.token;

        if (!token && isSecured) {
            Router.push('/login')
        }

        if (token && (ctx.pathname === '/login' || ctx.pathname === '/register')) {
            setTimeout(function() {
              Router.push('/');
            }, 0);
        }
    }

    return ctx.store.getState().authentication;
}

export default init;