import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import AdminHome from './src/ADMIN/AdminHome';
import MemberHome from './src/MEMBER/MemberHome';

export default function Main() {
   const [role, setRole] = useState('');

   Axios.defaults.withCredentials = true;
   useEffect(() => {
      Axios.get('http://localhost:5000/api/login').then((response) => {
         if (response.data.loggeIn === true) {
            setRole(response.data.user[0].role);
         }
      });
   }, []);

   return (
      <div>
         {role === 'admin' && <AdminHome />}
         {role === 'member' && <MemberHome />}
      </div>
   );
}
