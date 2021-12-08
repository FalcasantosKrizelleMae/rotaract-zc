import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import SouthernHome from './pages/SouthernHome';

const Home = () => {
   const location = useLocation();
   
   return (
      <div>
         <Navbar />
         <SouthernHome />
         
      </div>
   );
};

export default Home;
