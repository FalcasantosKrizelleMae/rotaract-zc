import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import * as AiIcons from 'react-icons/ai';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import Swal from 'sweetalert2';

const Reports = () => {
   const [list, setList] = useState([]);
   let history = useHistory();
   const chapter = localStorage.getItem('chapter');

   //Display all data
   useEffect(() => {
      Axios.get(`http://localhost:5000/reports/chapter/${chapter}`).then(
         (response) => {
            if (response) {
               setList(response.data);
            }
         }
      );
   });

   const sent = (report_id) => {
      Axios.post(`http://localhost:5000/reports/sent`, {
         report_id: report_id,
      }).then((response) => {
         if (response) {
            if (response.data.message === 'success') {
               Swal.fire({
                  title: 'Success!',
                  text: 'Record updated successfully!',
                  icon: 'success',
               });
            } else if (response.data.message === 'exist') {
               Swal.fire({
                  title: 'Error!',
                  text: 'Unsuccessful',
                  icon: 'error',
                  confirmButtonText: 'Okay',
               });
            }
         }
      });
   };

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
               </div>
               <Table className="border">
                  <thead className="text-center text-white bg-pink text-uppercase">
                     <tr>
                        {' '}
                        <td>Report ID</td>
                        <td>status</td>
                        <td>Date Requested</td>
                        <td>Date Reviewed</td>
                        <td>Action</td>
                     </tr>
                  </thead>

                  <tbody>
                     {list.map((val) => {
                        return (
                           <tr className="text-center">
                              <td>{val.report_id}</td>
                              <td>
                                 {val.status === 'requested' ? (
                                    <>
                                       <span className="badge bg-warning rounded-pill">
                                          {val.status}
                                       </span>
                                    </>
                                 ) : val.status === 'declined' ? (
                                    <span className="badge bg-danger rounded-pill">
                                       {val.status}
                                    </span>
                                 ) : (
                                    <span className="badge bg-success rounded-pill">
                                       {val.status}
                                    </span>
                                 )}
                              </td>
                              <td>{moment(val.date_created).format('llll')}</td>
                              {val.status === 'requested' ? (
                                 <>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                 </>
                              ) : val.status === 'sent' ? (
                                 <>
                                    <td>
                                       {moment(val.date_reviewed).format(
                                          'llll'
                                       )}
                                    </td>

                                    <td>---</td>
                                 </>
                              ) : (
                                 <>
                                    <td>
                                       {moment(val.date_reviewed).format(
                                          'llll'
                                       )}
                                    </td>

                                    <td>
                                       {''}
                                       <Button
                                          size="sm"
                                          onClick={() =>
                                             history.push({
                                                pathname: `/send`,
                                                state: {
                                                   event_id: val.event_id,
                                                },
                                             })
                                          }
                                       >
                                          View report
                                       </Button>{' '}
                                       <Button
                                          type="primary"
                                          size="sm"
                                          onClick={sent(val.report_id)}
                                       >
                                          Sent
                                       </Button>
                                    </td>
                                 </>
                              )}
                           </tr>
                        );
                     })}
                  </tbody>
               </Table>
            </div>
         </div>
      </>
   );
};

export default Reports;
