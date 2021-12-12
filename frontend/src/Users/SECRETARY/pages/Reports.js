import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Navbar from '../components/Navbar';
import * as AiIcons from 'react-icons/ai';
import { Button, Table } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';

const Reports = () => {
   const [list, setList] = useState([]);
   const chapter = localStorage.getItem('chapter');
   //Display all data
   useEffect(() => {
      Axios.get(`http://localhost:5000/sect/getEvent/${chapter}`).then(
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
         <div className="main container">
            <div className="shadow p-5 rounded">
               <div className="row">
                  <div className="col-sm">
                     {' '}
                     <h3 className="text-pink mb-5">Reports</h3>
                  </div>

                  <div className="col-sm">
                     <Button className="float-end" variant="outline-secondary">
                        + Add new report
                     </Button>
                  </div>
               </div>
               <Table borderless hover>
                  <thead className="text-center text-white bg-pink text-uppercase">
                     <td>Report ID</td>
                     <td>Date(s)</td>
                     <td>Date Requested</td>
                     <td>Date Reviewed</td>
                     <td>status</td>
                  </thead>

                  <tbody>
                     <tr>
                        <td></td>
                     </tr>
                  </tbody>
               </Table>
            </div>
         </div>
      </>
   );
};

export default Reports;
