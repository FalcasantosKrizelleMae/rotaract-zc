import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Axios from 'axios';
import { Collapse, Table } from 'antd';

const { Panel } = Collapse;

const AttendanceList = () => {
   const [events, setEvents] = useState([]);
   const [list, setList] = useState([]);
   // const [body, setBody] = useState(false);
   const chapter = localStorage.getItem('chapter');

   useEffect(() => {
      Axios.get(`http://localhost:5000/sect/getAll`, {
         params: {
            chapter: chapter,
         },
      }).then((result) => {
         if (result) {
            setList(result.data);
         }
      });
   });

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
                              <Collapse
                                 bordered={false}
                                 className="site-collapse-custom-collapse bg-white shadow-sm"
                              >
                                 <Panel
                                    header={val.title}
                                    className="site-collapse-custom-panel "
                                 >
                                    <Table
                                       dataSource={list}
                                       columns={columns}
                                    />
                                 </Panel>
                              </Collapse>
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
