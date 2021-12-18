import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Axios from 'axios';
import { Collapse, Table, Button, Select } from 'antd';

const AttendanceList = () => {
   const [events, setEvents] = useState([]);
   const [list, setList] = useState([]);
   // const [body, setBody] = useState(false);
   const chapter = localStorage.getItem('chapter');
   const { Panel } = Collapse;

   useEffect(() => {
      Axios.get(`http://localhost:5000/sect/getEvent/${chapter}`, {}).then(
         (result) => {
            if (result) {
               setEvents(result.data);
            }
         }
      );
   });

   const getAttendance = (event_id) => {
      Axios.get(`http://localhost:5000/sect/getAttendance`, {
         params: {
            event_id: event_id,
         },
      }).then((result) => {
         if (result) {
            setList(result.data);
         }
      });
   };

   const columns = [
      {
         title: 'Member ID',
         dataIndex: 'member_id',
         key: 'member_id',
      },
      {
         title: 'First name',
         dataIndex: 'first_name',
         key: 'first_name',
      },
      {
         title: 'Last name',
         dataIndex: 'last_name',
         key: 'last_name',
      },
      {
         title: 'Status',
         dataIndex: 'status',
         key: 'status',
      },
   ];

   return (
      <>
         <Navbar />
         <div className="main container">
            <div className="shadow p-5 rounded">
               <div className="row">
                  <div className="col-sm">
                     {' '}
                     <h3 className="text-pink mb-5">Attendance</h3>
                  </div>
                  {events.length === 0 ? (
                     <div>
                        <div className="container bg-pink text-white p-4 rounded">
                           No Events
                        </div>
                     </div>
                  ) : (
                     events.map((val) => {
                        return (
                           <>
                              <Collapse>
                                 <Panel
                                    header={
                                       val.title +
                                       ' (' +
                                       val.participants +
                                       ' participants)'
                                    }
                                    extra={
                                       <Button
                                          onClick={() => {
                                             getAttendance(val.event_id);
                                          }}
                                       >
                                          Click here to view attendance for this
                                          event
                                       </Button>
                                    }
                                 >
                                    <Table
                                       dataSource={list}
                                       columns={columns}
                                    />
                                 </Panel>
                              </Collapse>
                              <br />
                           </>
                        );
                     })
                  )}
               </div>
            </div>
         </div>
      </>
   );
};

export default AttendanceList;
