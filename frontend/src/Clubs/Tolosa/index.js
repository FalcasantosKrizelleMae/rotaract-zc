import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import TolosaHome from './pages/TolosaHome';

const Home = () => {
   const location = useLocation();
   
   return (
      <div>
         <Navbar />
         <TolosaHome />
         
      </div>
   );
};

export default Home;
