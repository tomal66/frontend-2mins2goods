import React from 'react';
import HeroSection from './components/HeroSection';
import HomeCategories from './components/HomeCategories';
import HomeSeller from './components/HomeSeller';
import FeaturedProducts from './components/FeaturedProducts';
import { useEffect } from 'react';
import { useAuthContext } from './context/auth_context';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const { isAuthenticated, role } = useAuthContext();
  const nav = useNavigate();
  
  useEffect(() => {
    document.title = "2mins2goods";
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if(role==="ROLE_SELLER")
      {
        nav("/seller-dashboard");
      }
      else if(role==="ROLE_ADMIN"){
        nav("/admin-dashboard");
      }
      else{
        nav("/");
      }

    }
  }, [isAuthenticated, nav]);

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
