import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import MetroHome from './pages/MetroHome';

const Home = () => {
   const location = useLocation();
   
   return (
      <div>
         <Navbar />
         <MetroHome />
         
      </div>
   );
};

export default Home;
