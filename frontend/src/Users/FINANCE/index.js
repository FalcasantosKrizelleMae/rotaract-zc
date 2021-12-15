import { Button } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';

const Finance = () => {
   const id = localStorage.getItem('member_id');
   const name = localStorage.getItem('name');
   const status = localStorage.getItem('status');
   const chapter = localStorage.getItem('chapter');

   return (
      <div>
         <Navbar />
         <div className="main mx-5">
            <h1>{id}</h1>
            <h1>{name}</h1>
            <h1>{status}</h1>
            <Link
               to={{
                  pathname: `/payments/${id}`,
               }}
            >
               <Button>Payments</Button>
            </Link>
         </div>
      </div>
   );
};

export default Finance;
