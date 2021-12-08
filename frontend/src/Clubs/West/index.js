import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import WestHome from './pages/WestHome';

const Home = () => {
   const location = useLocation();
   
   return (
      <div>
         <Navbar />
         <WestHome />
         
      </div>
   );
};

export default Home;
