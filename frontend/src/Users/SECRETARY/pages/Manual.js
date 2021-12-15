import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Table } from 'react-bootstrap';
import { PageHeader, Button } from 'antd';
import Axios from 'axios';

import { useLocation, useHistory, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { wholeDivideDurations } from '@fullcalendar/react';

const Manual = () => {
   const location = useLocation();
   const chapter = localStorage.getItem('chapter');
   const [list, setList] = useState([]);
   const { event_id, title } = location.state;
   const [member_id, setMemberId] = useState();
   const [isTrue, setIsTrue] = useState(false);
   const [status, setStatus] = useState('Input the member id in the field');
   const id = localStorage.getItem('member_id');
   let history = useHistory();
   const [mark, setMark] = useState('present');

   useEffect(() => {
      Axios.get(`http://localhost:5000/sect/check/${chapter}`, {
         params: {
            member_id: member_id,
         },
      }).then((response) => {
         if (response.data.length === 1) {
            setIsTrue(true);
            setStatus('');
            setList(response.data);
         } else {
            setIsTrue(false);
         }
      });
   });

   const check = () => {
      Axios.post(`http://localhost:5000/sect/addAttendance`, {
         member_id: member_id,
         event_id: event_id,
         mark: mark,
      }).then((response) => {
         if (response.data.message === 'success') {
            Swal.fire({
               title: 'Attendance checked!',
               icon: 'success',
            });
         } else if (response.data.message === 'exist') {
            Swal.fire({
               title: 'Error!',
               text: 'Attendance already checked',
               icon: 'error',
               confirmButtonText: 'Okay',
            });
         }
         setMemberId('');
      });
   };

   return (
      <>
         <div className="container mt-5">
            <PageHeader
               className="site-page-header"
               onBack={() => history.push(`/secretary/${id}`)}
               title="Back to Dashboard"
               // subTitle="View and update account"
            />{' '}
            <h4 className="text-center my-5 text-uppercase">
               Manual Checking attendance
            </h4>
            <div className="bg-light pt-4 pb-3 px-5 rounded container col-lg-6">
               <wholeDivideDurations classname="col">
                  <h5 className="text-pink">
                     EVENT: {''}
                     {title} - {event_id}
                  </h5>{' '}
                  <Link
                     to={{
                        pathname: `/attendance/${chapter}`,
                     }}
                     classname="btn"
                  >
                     View attendance
                  </Link>{' '}
               </wholeDivideDurations>
            </div>
            <div className="container bg-white shadow-sm border p-5 mt-4 col-lg-6">
               <Form.Group>
                  <Form.Label>
                     <h5> MEMBER ID</h5>
                  </Form.Label>
                  <input
                     name="member_id"
                     className="form-control"
                     value={member_id}
                     onChange={(e) => setMemberId(e.target.value)}
                     required
                  />
               </Form.Group>
               {isTrue === true ? (
                  <>
                     <Form.Group className="mb-3 fs-6">
                        <input
                           type="radio"
                           value="present"
                           name="status"
                           defaultChecked
                           onChange={(e) => setMark(e.target.value)}
                           required
                        />{' '}
                        Present <div className="me-3"></div>
                        <input
                           name="status"
                           type="radio"
                           value="late"
                           onChange={(e) => setMark(e.target.value)}
                           //  required
                        />{' '}
                        Late
                     </Form.Group>
                  </>
               ) : (
                  status
               )}

               {isTrue === true ? (
                  <>
                     <h5>RESULT: </h5>
                     {list.map((val) => {
                        return (
                           <div className="container bg-light rounded p-2 pb-0">
                              <Table
                                 size="sm"
                                 className="fs-6"
                                 responsive
                                 borderless
                              >
                                 <tbody>
                                    <tr>
                                       <td>{val.member_id}</td>
                                       <td>
                                          {val.first_name + ' ' + val.last_name}
                                       </td>
                                       {
                                          <td>
                                             <span className="badge bg-info pill rounded">
                                                unchecked
                                             </span>
                                          </td>
                                       }
                                    </tr>
                                 </tbody>
                              </Table>
                           </div>
                        );
                     })}
                     <Button
                        type="primary"
                        style={{
                           background: 'green',
                           borderColor: 'green',
                           borderRadius: 50,
                           marginTop: 30,
                        }}
                        onClick={check}
                     >
                        Mark attendance
                     </Button>
                  </>
               ) : (
                  ''
               )}
               <br />
            </div>
         </div>
      </>
   );
};

export default Manual;
