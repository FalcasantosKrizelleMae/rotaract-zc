import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
   ResponsiveContainer,
} from 'recharts';
import Axios from 'axios';

const Dashboard = () => {
   const [data, setData] = useState([]);
   const [funds, setFunds] = useState([]);

   useEffect(() => {
      Axios.get('http://localhost:5000/web/totalMembers').then((response) => {
         if (response) {
            setData(response.data);
         }
      });
      Axios.get('http://localhost:5000/web/funds').then((response) => {
         if (response) {
            setFunds(response.data);
         }
      });
   }, []);

   return (
      <>
         <Navbar />
         <div className="container main">
            <div className="bg-pink p-3 rounded fs-3 text-white ps-4 mb-5 mt-2 container">
               DASHBOARD
            </div>
            <div className="">
               <div class="row">
                  <div className="col-lg-5 shadow py-5 pr-5 rounded mx-2 ">
                     <h4 className="text-center">Total Members per Club</h4>
                     <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                           <BarChart width={600} height={300} data={data}>
                              <XAxis dataKey="chapter" stroke="#E30B5C" />
                              <YAxis />
                              <Tooltip />
                              <CartesianGrid
                                 stroke="#E30B5C"
                                 strokeDasharray="5 5"
                              />
                              <Bar dataKey="uv" fill="#E30B5C" barSize={30} />
                           </BarChart>
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
                              <Bar dataKey="total_funds" fill="#8884d8" />
                              <Bar dataKey="collections" fill="#82ca9d" />
                              <Bar dataKey="expenses" fill="red" />
                              <Bar dataKey="donations" fill="grey" />
                           </BarChart>
                        </ResponsiveContainer>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Dashboard;
