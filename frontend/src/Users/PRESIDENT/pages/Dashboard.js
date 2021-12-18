import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import {
   ResponsiveContainer,
   PieChart,
   Pie,
   Cell,
   BarChart,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
} from 'recharts';

import Axios from 'axios';

const PresDashboard = () => {
   const [event, setEvent] = useState([]);
   const [data, setData] = useState([]);
   const [funds, setFunds] = useState([]);
   const chapter = localStorage.getItem('chapter');

   const COLORS = ['darkgrey', '#d91b5c'];

   useEffect(() => {
      Axios.get(`http://localhost:5000/events/pres/${chapter}`).then(
         (response) => {
            if (response) {
               setEvent(response.data);

               Axios.get(`http://localhost:5000/web/selectEvent`, {
                  params: {
                     event_id: response.data[0].event_id,
                  },
               }).then((response) => {
                  if (response) {
                     setData(response.data);
                  }
               });
            }
         }
      );

      Axios.get('http://localhost:5000/web/funds_chapter', {
         params: {
            chapter: chapter,
         },
      }).then((response) => {
         if (response) {
            setFunds(response.data);
         }
      });
   });

   return (
      <div>
         <Navbar />
         <div className="mt-5">
            <div className="bg-pink p-3 rounded fs-4 text-white ps-4 mb-4 mt-2 container">
               DASHBOARD
            </div>
            {/* <div class="row d-flex justify-content-center">
               <div class="col-sm-3 ">
                  <Card title="Total Members" imageUrl="" body="18" />
               </div>
               <div class="col-sm-3">
                  <Card title="Fund Balance " imageUrl="" body="20,000" />
               </div>

               <div class="col-sm-3">
                  <Card title="Total Expenses" imageUrl="" body="18" />
               </div>
            </div> */}
            <div class="container">
               <div className="row">
                  <div className="col-lg shadow p-5 rounded mx-2">
                     <h3>Attendance</h3> <br />
                     <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                           <PieChart>
                              <Pie
                                 dataKey="attendees"
                                 data={data}
                                 nameKey="status"
                                 label
                              >
                                 {data.map((entry, index) => (
                                    <Cell
                                       fill={COLORS[index % COLORS.length]}
                                    />
                                 ))}
                              </Pie>
                              <Tooltip />
                              <Legend
                                 layout="horizontal"
                                 verticalAlign="bottom"
                                 align="center"
                              />
                           </PieChart>
                        </ResponsiveContainer>
                     </div>
                  </div>

                  <div className="col-lg shadow py-5 pr-5 rounded mx-2 ">
                     <h4 className="text-center">Funds per Club</h4>
                     <div style={{ height: 300 }}>
                        <ResponsiveContainer>
                           <BarChart width={730} height={250} data={funds}>
                              <CartesianGrid strokeDasharray="5 5" />
                              <XAxis dataKey="club_name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="total_funds" fill="#d91b5c" />
                              <Bar dataKey="collections" fill="#82ca9d" />
                              <Bar dataKey="expenses" fill="red" />
                              <Bar dataKey="donations" fill="grey" />`
                           </BarChart>
                        </ResponsiveContainer>
                        `
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default PresDashboard;
