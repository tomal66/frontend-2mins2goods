import React from 'react'
import HeroSection from './components/HeroSection'
import HomeCategories from './components/HomeCategories'
import HomeSeller from './components/HomeSeller'

const Home = () => {
  const data = {
    name : "2mins2goods",
  }
  return (
    <>
      <HeroSection myData={data}/>
      <HomeCategories/>
      <HomeSeller/>
    </>
  )
}


export default Home