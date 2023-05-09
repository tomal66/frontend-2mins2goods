import React from 'react';
import HeroSection from './components/HeroSection';
import HomeCategories from './components/HomeCategories';
import HomeSeller from './components/HomeSeller';
import FeaturedProducts from './components/FeaturedProducts';
import { useEffect } from 'react';
import { useAuthContext } from './context/auth_context';

const Home = () => {
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    document.title = "2mins2goods";
  }, []);

  const data = {
    name: "2mins2goods",
  };

  return (
    <>
      <HeroSection myData={data} />
      <FeaturedProducts />
      <HomeCategories />
      {!isAuthenticated && <HomeSeller />}
    </>
  );
};

export default Home;
