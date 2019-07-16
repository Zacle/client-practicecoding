import React from 'react'
import Link from 'next/link'
import Layout from '../components/layout';
import MyCaroussel from '../components/caroussel';
import IndexMenu from '../components/indexMain';

const Home = () => (
  <>
    <Layout title="Practice Coding OJ" description="A website that helps software engineer across the world to improve their programming skills through contest">
      <MyCaroussel />
      <IndexMenu />
    </Layout>
  </>
)

export default Home;
