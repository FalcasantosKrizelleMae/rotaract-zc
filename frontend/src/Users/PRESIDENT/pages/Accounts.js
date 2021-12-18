import React, { useState, useEffect } from 'react';

import { Table } from 'react-bootstrap';
import Axios from 'axios';

import moment from 'moment';

// import { Avatar, Image } from 'antd';
import Navbar from '../components/Navbar';

const Accounts = () => {
   const [list, setList] = useState([]);
   const chapter = localStorage.getItem('chapter');

   //Display all data
   useEffect(() => {
      Axios.get(`http://localhost:5000/admin/list/${chapter}`).then(
         (response) => {
            if (response) {
               setList(response.data);
            }
         }
      );
   });

   return (
      <>
         <Navbar />
         <div className="main mx-5">
            <div className="shadow p-5 rounded">
               <div className="row mb-3">
                  <div className="col-sm">
                     {' '}
                     <div className="text-pink mb-3">
                        <div className="fs-4">List of Members</div>
                     </div>
                  </div>

                  <div className="col-sm-3">
                     {' '}
                     <h6>{chapter}</h6>
                  </div>
               </div>
               <Table responsive="lg" className="">
                  <thead height="60" className="bg-pink text-white">
                     <tr>
                        <th>Member ID</th>
                        <th>Name</th>
                        <th>Date started</th>
                        <th>Email</th>
                        <th>Position</th>
                     </tr>
                  </thead>
                  <tbody>
                     {list.length === 0 ? (
                        <tr className="border">
                           <div className="p-3">No records available</div>
                        </tr>
                     ) : (
                        list.map((val) => {
                           return (
                              <tr className="">
                                 <td>{val.member_id}</td>
                                 <td>{val.first_name + ' ' + val.last_name}</td>
                                 <td>
                                    {moment(val.date_started).format('ll')}
                                 </td>
                                 <td>{val.email}</td>

                                 <td>{val.role}</td>
                              </tr>
                           );
                        })
                     )}
                  </tbody>
               </Table>
            </div>
         </div>
      </>
   );
};

export default Accounts;
