import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import WmsuHome from './pages/WmsuHome';

const Home = () => {
   const location = useLocation();
   
   return (
      <div>
         <Navbar />
         <WmsuHome />
         
      </div>
   );
};

export default Home;
