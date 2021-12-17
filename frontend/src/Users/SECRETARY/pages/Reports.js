import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Navbar from '../components/Navbar';
import * as AiIcons from 'react-icons/ai';
import { Button, Table } from 'react-bootstrap';
import moment from 'moment';

const Reports = () => {
   const [list, setList] = useState([]);

   //Display all data
   useEffect(() => {
      Axios.get(`http://localhost:5000/reports/all`).then((response) => {
         if (response) {
            setList(response.data);
         }
      });
   });

   const download = () => {
      alert('donwload here');
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

                  <div className="col-sm">
                     <Button className="float-end" variant="outline-secondary">
                        + Add new report
                     </Button>
                  </div>
               </div>
               <Table borderless hover className="border">
                  <thead className="text-center text-white bg-pink text-uppercase">
                     <tr>
                        {' '}
                        <td>Report ID</td>
                        <td>status</td>
                        <td>Date Requested</td>
                        <td>Date Reviewed</td>
                        <td>Date Sent</td>
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
                                    <td>---</td>
                                 </>
                              ) : val.status === 'sent' ? (
                                 <>
                                    <td>
                                       {moment(val.date_reviewed).format(
                                          'llll'
                                       )}
                                    </td>
                                    <td>
                                       {' '}
                                       {moment(val.date_sent).format('llll')}
                                    </td>
                                    <td>---</td>
                                 </>
                              ) : (
                                 <>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                    <td>
                                       <Button
                                          variant="white"
                                          data-tip
                                          data-for="view"
                                          className="text-primary"
                                       >
                                          <AiIcons.AiFillEye />
                                       </Button>
                                       <Button
                                          variant="white"
                                          onClick={download}
                                       >
                                          <AiIcons.AiOutlineDownload />
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
