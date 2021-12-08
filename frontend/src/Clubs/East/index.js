import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import EastHome from './pages/EastHome';

const Home = () => {
   const location = useLocation();
   
   return (
      <div>
         <Navbar />
         <EastHome />
         
      </div>
   );
};

export default Home;
