import React from 'react'
import Layout from '../components/main/layout';
import MyCaroussel from '../components/main/caroussel';
import IndexMenu from '../components/main/indexMain';
import {connect} from 'react-redux';
import {deauthenticate} from '../redux/actions/authActions';
import init from '../utils/initialize';


const Home = ({auth, deauthenticate}) => (
  <>
    <Layout title="Practice Coding OJ" description="A website that helps software engineer across the world to improve their programming skills through contest" auth={auth} deauthenticate={deauthenticate}>
      <MyCaroussel />
      <IndexMenu />
    </Layout>
  </>
)

Home.getInitialProps = ctx => {
  init(ctx);
}

const mapStateToProps = state => ({auth: state.authentication});

export default connect(
  mapStateToProps,
  {deauthenticate}
)(Home);
