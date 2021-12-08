import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import NorthHome from './pages/NorthHome';

const Home = () => {
   const location = useLocation();
   
   return (
      <div>
         <Navbar />
         <NorthHome />
         
      </div>
   );
};

export default Home;
