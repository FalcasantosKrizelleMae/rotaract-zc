import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Axios from 'axios';
import { Table } from 'react-bootstrap';

const AttendanceList = () => {
   const [events, setEvents] = useState([]);
   const [list, setList] = useState([]);
   // const [body, setBody] = useState(false);
   const chapter = localStorage.getItem('chapter');
   //Display all data
   useEffect(() => {
      Axios.get(`http://localhost:5000/events/${chapter}`).then((response) => {
         if (response) {
            setEvents(response.data);
            Axios.get(`http://localhost:5000/sect/getAttendance`, {
               params: {
                  event_id: response.data.event_id,
               },
            }).then((result) => {
               if (result) {
                  setList(result.data);
               }
            });
         }
      });
   });

   return (
      <>
         <Navbar />
         <div className="main container">
            <h1>Attendance list</h1>

            {/* <Accordion>
               <Accordion.Item eventKey="0">
                  <Accordion.Header>Header 1</Accordion.Header>
                  <Accordion.Body>Body 1</Accordion.Body>
               </Accordion.Item>
            </Accordion> */}

            {events.length === 0 ? (
               <>
                  <div className="container bg-pink text-white p-4 rounded">
                     No Events
                  </div>
               </>
            ) : (
               events.map((val) => {
                  return (
                     <>
                        <div className="accordion">
                           <div className="accordion-item p-4">
                              <div className="accordion-header">
                                 <div className="fs-5 float-start">
                                    {val.event_id} <b className="ms-5"></b>
                                    {val.title}
                                 </div>

                                 <div className="float-end">
                                    <span className="badge rounded-pill bg-info">
                                       {val.type}
                                    </span>
                                 </div>
                              </div>
                              <div className="accordion-body p-5"> </div>
                           </div>
                        </div>
                     </>
                  );
               })
            )}
         </div>
      </>
   );
};

export default AttendanceList;
