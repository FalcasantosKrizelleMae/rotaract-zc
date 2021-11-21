import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Member from './pages/Profile';

const MemberPage = () => {
   const location = useLocation();
   // const { member_id } = location.state;
   return (
      <div>
         <Navbar />
         <Member />
         {/* <h1>{member_id}</h1> */}
      </div>
   );
};

export default MemberPage;
