import React from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
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

const PresDashboard = () => {
   const data1 = [
      {
         name: 'EVENT 1',
         Present: 20,
         Absent: 5,
      },
      {
         name: 'EVENT 2',
         Present: 35,
         Absent: 5,
      },
      {
         name: 'EVENT 3',
         Present: 50,
         Absent: 2,
      },

      {
         name: 'EVENT 3',
         Present: 40,
         Absent: 10,
      },
   ];

   return (
      <div>
         <Navbar />
         <div className="mt-5">
            <div className="bg-pink p-3 rounded fs-4 text-white ps-4 mb-4 mt-2 container">
               DASHBOARD
            </div>
            <div class="row d-flex justify-content-center">
               <div class="col-sm-3 ">
                  <Card title="Total Members" imageUrl="" body="18" />
               </div>
               <div class="col-sm-3">
                  <Card title="Fund Balance " imageUrl="" body="20,000" />
               </div>

               <div class="col-sm-3">
                  <Card title="Total Expenses" imageUrl="" body="18" />
               </div>
            </div>
            <div class="container">
               <h3>Monitor attendance</h3> <br />
               <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                     <BarChart width={730} height={250} data={data1}>
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Present" fill="#028a0f" />
                        <Bar dataKey="Absent" fill="#d6212e" />
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>
         </div>
      </div>
   );
};

export default PresDashboard;
