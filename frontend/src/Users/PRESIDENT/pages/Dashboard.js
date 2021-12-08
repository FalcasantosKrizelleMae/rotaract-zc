import React from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { PieChart, Pie} from 'recharts';


const PresDashboard = () => {
   const data1 = [
      {
        name: 'EVENT 1', Present: 4000, Absent: 2400, 
      },
      {
        name: 'EVENT 2',Present: 4000, Absent: 2400, 
      },
      {
        name: 'EVENT 3',Present: 4000, Absent: 2400,  
      },
      {
        name: 'EVENT 4', Present: 4000, Absent: 2400,  
      },
      {
        name: 'EVENT 5',Present: 4000, Absent: 2400, 
      },
      {
        name: 'EVENT 6',Present: 4000, Absent: 2400,  
      },
      {
        name: 'EVENT 7', Present: 4000, Absent: 2400,  
      },
      {
         name: 'EVENT 8',Present: 4000, Absent: 2400, 
       },
    ];
    const data5 = [
      {name: 'Geeksforgeeks', students: 400},
      {name: 'Technical scripter', students: 700},
    ];
   return (
      <div>
         <Navbar />
         <div className="main container">DASHBOARD</div>
         <div class="row justify-content-center ">
            <div class="col-sm-6 col-md-3 item">
               <Card
                  title="Total Members"
                  imageUrl=""
                  body="18"
               />
               </div>
               <div class="col-sm-6 col-md-3 item">
               <Card
                  title="Fund Balance "
                  imageUrl=""
                  body="20,000"
               />
               </div>
               <div class="col-sm-6 col-md-3 item">
               <Card
                  title="Example"
                  imageUrl=""
                  body="Lorem"
               /> 
               </div>
      </div>
        
      <div class="row justify-content-center ">
      <div style={{ width: '90%', height: 300 }}>
      <ResponsiveContainer>
      <BarChart width={730} height={250} data={data1}>
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="name" />
               <YAxis />
               <Tooltip />
               <Legend />
               <Bar dataKey="Present" fill="#8884d8" />
               <Bar dataKey="Absent" fill="#82ca9d" />
         </BarChart>
         </ResponsiveContainer>
      </div>

      <div style={{ width: '90%', height: 300 }}>
         <ResponsiveContainer>
            <div class="col-sm-5 col-md-2 item">
             <PieChart width={400} height={250}>
                 <Tooltip />
             <Pie data={data5} dataKey="students" outerRadius={100} innerRadius={50} fill="#E1578A" />
            </PieChart>
           </div>
        </ResponsiveContainer>
     </div> 
  </div>
      </div>
   );
};

export default PresDashboard;
