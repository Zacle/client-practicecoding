import React from 'react'
import Link from 'next/link'
import Layout from '../components/main/layout';
import MyCaroussel from '../components/main/caroussel';
import IndexMenu from '../components/main/indexMain';

const Home = () => (
  <>
    <Layout title="Practice Coding OJ" description="A website that helps software engineer across the world to improve their programming skills through contest">
      <MyCaroussel />
      <IndexMenu />
    </Layout>
  </>
)

export default Home;
