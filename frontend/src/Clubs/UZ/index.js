import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import UZHome from './pages/UZHome';

const Home = () => {
   const location = useLocation();
   
   return (
      <div>
         <Navbar />
         <UZHome />
         
      </div>
   );
};

export default Home;
