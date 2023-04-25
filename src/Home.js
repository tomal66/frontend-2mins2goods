import React from 'react'
import HeroSection from './components/HeroSection'
import HomeCategories from './components/HomeCategories'
import HomeSeller from './components/HomeSeller'
import FeaturedProducts from './components/FeaturedProducts'

const Home = () => {
  const data = {
    name : "2mins2goods",
  }
  return (
    <>
      <HeroSection myData={data}/>
      <FeaturedProducts/>
      <HomeCategories/>
      <HomeSeller/>
    </>
  )
}


export default Home