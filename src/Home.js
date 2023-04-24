import React from 'react'
import HeroSection from './components/HeroSection'

const Home = () => {
  const data = {
    name : "2mins2goods",
  }
  return (
    <HeroSection myData={data}/>
  )
}


export default Home