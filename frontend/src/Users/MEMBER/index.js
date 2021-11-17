import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';

const MemberPage = () => {
   const location = useLocation();
   // const { member_id } = location.state;
   return (
      <div>
         <Navbar />
         {/* <h1>{member_id}</h1> */}
      </div>
   );
};

export default MemberPage;
