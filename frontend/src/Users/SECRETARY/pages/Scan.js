import React, { useState, useEffect } from 'react';
import QrReader from 'react-qr-reader';
import Axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import { Button, Table, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { PageHeader } from 'antd';
function Scan() {
   const location = useLocation();
   const { event_id, title, chapter } = location.state;
   const [data, setData] = useState([]);
   const [member_id, setMemberId] = useState();
   const [mark, setMark] = useState('present');
   const id = localStorage.getItem('member_id');
   const [attendanceList, setAttendanceList] = useState([]);
   let history = useHistory();
   const [scanResultWebCam, setScanResultWebCam] = useState('');

   const handleErrorWebCam = (error) => {
      console.log(error);
   };

   const handleScanWebCam = (result) => {
      if (result) {
         setScanResultWebCam(result);
      }
   };

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
   //Display all data
   useEffect(() => {
      Axios.get(`http://localhost:5000/sect/scan/${scanResultWebCam}`).then(
         (response) => {
            if (response) {
               const getchapter = response.data[0].chapter;

               if (getchapter === chapter) {
                  setData(response.data);
                  setMemberId(response.data[0].member_id);

                  // Axios.post(`http://localhost:5000/sect/add_attendance`, {
                  //    event_id: event,
                  //    member_id: member_id,
                  // }).then((result) => {});
               } else {
                  setData([
                     {
                        member_id: 'Invalid QR code',
                        first_name: '',
                        last_name: '',
                     },
                  ]);
               }
            }
         }
      );

      Axios.get(`http://localhost:5000/sect/getAttendance`, {
         params: {
            event_id: event_id,
         },
      }).then((result) => {
         if (result) {
            setAttendanceList(result.data);
         }
      });
   });

   return (
      <div className="container mt-5">
         <PageHeader
            className="site-page-header"
            onBack={() => history.goBack()}
            title="Scan QR Code"
            // subTitle="View and update account"
         />{' '}
         <div className="row">
            <div className="col-lg-5 bg-light p-5">
               <h3>Event ID: {event_id}</h3>
               <h3>Event title: {title}</h3>

               <QrReader
                  className="col-lg"
                  delay={300}
                  style={{ width: '100%' }}
                  onError={handleErrorWebCam}
                  onScan={handleScanWebCam}
                  facingMode
               />
            </div>

            <div className="col-lg m-5 p-5 bg-white">
               <h3>RESULT: </h3>
               {data.length === 0 ? (
                  <p></p>
               ) : (
                  data.map((val) => {
                     return (
                        <>
                           <div className="container bg-light rounded p-2 pb-0">
                              <Table
                                 size="sm"
                                 className="fs-6"
                                 responsive
                                 borderless
                              >
                                 <tbody>
                                    <tr>
                                       <td width="30%">
                                          {' '}
                                          <input
                                             type="type"
                                             name="member_id"
                                             className="form-control "
                                             value={val.member_id}
                                          />
                                       </td>
                                       <td>
                                          <b className="ps-5">
                                             {val.first_name +
                                                ' ' +
                                                val.last_name}
                                          </b>
                                       </td>
                                       {val.member_id !== 'Invalid QR code' ? (
                                          <div className="row mx-0">
                                             <Form.Group className="mb-3 fs-6 col">
                                                <input
                                                   type="radio"
                                                   value="present"
                                                   name="status"
                                                   defaultChecked
                                                   onChange={(e) =>
                                                      setMark(e.target.value)
                                                   }
                                                   required
                                                />{' '}
                                                Present
                                             </Form.Group>
                                             <Form.Group className="mb-3 fs-6 col">
                                                <input
                                                   name="status"
                                                   type="radio"
                                                   value="late"
                                                   onChange={(e) =>
                                                      setMark(e.target.value)
                                                   }
                                                   //  required
                                                />{' '}
                                                Late
                                             </Form.Group>
                                          </div>
                                       ) : (
                                          ''
                                       )}
                                    </tr>
                                 </tbody>
                              </Table>
                           </div>
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
                     );
                  })
               )}
            </div>
         </div>
         <div className="container col-lg shadow-sm p-5 mt-4 px-5 mx-2">
            <h4>Attendance List</h4>
            <Table bordered className="bg-white">
               <thead>
                  <tr className="">
                     <th>Member ID</th>
                     <th>Name</th>
                     <th>Status</th>
                  </tr>
               </thead>
               <tbody>
                  {attendanceList.map((val) => {
                     return (
                        <tr>
                           <td>{val.member_id}</td>
                           <td>{val.first_name + ' ' + val.last_name}</td>
                           <td>
                              {val.status === 'present' ? (
                                 <>
                                    <span className="badge bg-success rounded-pill">
                                       {val.status}
                                    </span>
                                 </>
                              ) : (
                                 <span className="badge bg-warning rounded-pill">
                                    {val.status}
                                 </span>
                              )}
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </Table>
         </div>
      </div>
   );
}

export default Scan;
