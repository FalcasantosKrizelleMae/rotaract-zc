import React from 'react';
import { useLocation } from 'react-router-dom';

const MemberPage = () => {
   const location = useLocation();
   const { member_id } = location.state;
   return (
      <div>
         <h1>{member_id}</h1>
      </div>
   );
};

export default MemberPage;
