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
   const [total_mem, setTotalMem] = useState();
   const [data, setData] = useState([]);
   const [funds, setFunds] = useState([]);
   const [expenses, setExpenses] = useState();
   const [total_funds, setTotalFunds] = useState();
   const chapter = localStorage.getItem('chapter');

   const COLORS = ['darkgrey', '#d91b5c'];

   useEffect(() => {
      Axios.get(`http://localhost:5000/web/selectEvent`).then((response) => {
         if (response) {
            setData(response.data);
         }
      });

      Axios.get('http://localhost:5000/web/funds_chapter', {
         params: {
            chapter: chapter,
         },
      }).then((response) => {
         if (response) {
            setFunds(response.data);
         }
      });

      Axios.get(`http://localhost:5000/web/total_mem/chapter`, {
         params: {
            chapter: chapter,
         },
      }).then((response) => {
         if (response) {
            setTotalMem(response.data[0].total_mem);
         }
      });

      Axios.get(`http://localhost:5000/web/funds_chapter`, {
         params: {
            chapter: chapter,
         },
      }).then((response) => {
         if (response) {
            setTotalFunds(response.data[0].total_funds);
            setExpenses(response.data[0].expenses);
         }
      });
   });

   return (
      <div>
         <Navbar />
         <div className="container mt-5">
            {/* <div className="bg-pink p-3 rounded fs-4 text-white ps-4 mb-4 mt-2 container">
               DASHBOARD
            </div> */}
            <div class="row d-flex justify-content-center">
               <div class="col-lg-4">
                  <Card
                     title="Total no. of embers"
                     imageUrl=""
                     className="bg-dark mb-4 shadow-sm "
                     body={total_mem + ' members'}
                  />
               </div>
               {}
               <div class="col-lg-4">
                  <Card
                     title="Fund Balance "
                     imageUrl=""
                     className="bg-dark mb-4 shadow-sm "
                     body={total_funds + ' php'}
                  />
               </div>

               <div class="col-lg-4">
                  <Card
                     title="Expenses"
                     imageUrl=""
                     className="bg-dark mb-4 shadow-sm "
                     body={expenses + ' php'}
                  />
               </div>
            </div>
            <div class="container">
               <div className="row">
                  <div className="col-lg shadow p-5 rounded mx-2">
                     <h4>Attendance graph for all events</h4>
                     <br />
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
