import React from 'react';
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

const Dashboard = () => {
   const data1 = [
      {
         name: 'Zamboanga City West',
         Collection: 4000,
         Expenses: 2400,
         amt: 2400,
      },
      {
         name: 'Zamboanga City North',
         Collection: 4000,
         Expenses: 2400,
         amt: 2210,
      },
      {
         name: 'Zamboanga City East',
         Collection: 4000,
         Expenses: 2400,
         amt: 2290,
      },
      {
         name: 'Metro Zamboanga',
         Collection: 4000,
         Expenses: 2400,
         amt: 2000,
      },
      {
         name: 'Western Mindanao State Universisty',
         Collection: 4000,
         Expenses: 2400,
         amt: 2181,
      },
      {
         name: 'Universidad de Zamboanga',
         Collection: 4000,
         Expenses: 2400,
         amt: 2500,
      },
      {
         name: 'Colosa Community',
         Collection: 4000,
         Expenses: 2400,
         amt: 2100,
      },
      {
         name: 'Southern City Colleges',
         Collection: 4000,
         Expenses: 2400,
         amt: 2100,
      },
   ];

   const data = [
      {
         name: 'Zamboanga City West',
         uv: 50,
      },
      {
         name: 'Zamboanga City North',
         uv: 30,
      },
      {
         name: 'Zamboanga City East',
         uv: 24,
      },
      {
         name: 'Metro Zamboanga',
         uv: 50,
      },
      {
         name: 'Western Mindanao State Universisty',
         uv: 45,
      },
      {
         name: 'Universidad de Zamboanga',
         uv: 12,
      },
      {
         name: 'Colosa Community',
         uv: 56,
      },
      {
         name: 'Southern City Colleges',
         uv: 25,
      },
   ];

   //  const getIntroOfPage = (label) => {
   //     if (label === 'Zamboanga City West') {
   //        return "Page A is about men's clothing";
   //     }
   //     if (label === 'Zamboanga City North') {
   //        return "Page B is about women's dress";
   //     }
   //     if (label === 'Zamboanga City East ') {
   //        return "Page C is about women's bag";
   //     }
   //     if (label === 'Metro Zamboanga') {
   //        return 'Page D is about household goods';
   //     }
   //     if (label === 'Western Mindanao State Universisty ') {
   //        return 'Page E is about food';
   //     }
   //     if (label === 'Universidad de Zamboanga') {
   //        return 'Page F is about baby food';
   //     }
   //     if (label === 'Colosa Community') {
   //        return 'Page F is about baby food';
   //     }
   //     if (label === 'Southern City Colleges') {
   //        return 'Page F is about baby food';
   //     }
   //     return '';
   //  };

   //  const CustomTooltip = ({ active, payload, label }) => {
   //     if (active && payload && payload.length) {
   //        return (
   //           <div className="custom-tooltip">
   //              <p className="label">{`${label} : ${payload[0].value}`}</p>
   //              <p className="intro">{getIntroOfPage(label)}</p>
   //              <p className="desc">Anything you want can be displayed here.</p>
   //           </div>
   //        );
   //     }

   //     return null;
   //  };

   return (
      <>
         <Navbar />
         <div className="main">
            <div className="bg-pink p-3 rounded fs-4 text-white ps-4 mb-5 mt-2 container">
               DASHBOARD
            </div>
            <div className="container">
               <div class="row ">
                  <div className="col-lg border p-4 rounded mx-2 mb-3 ">
                     <h4 className="text-center">Fund Collection per Club</h4>
                     <div style={{ height: 300 }}>
                        <ResponsiveContainer>
                           <BarChart width={730} height={250} data={data1}>
                              <CartesianGrid strokeDasharray="5 5" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="Collection" fill="#8884d8" />
                              <Bar dataKey="Expenses" fill="#82ca9d" />
                           </BarChart>
                        </ResponsiveContainer>
                     </div>
                  </div>
                  <div className="col-lg border p-4 mx-2 mb-3">
                     <h4 className="text-center">Total Members per Club</h4>
                     <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                           <BarChart width={600} height={300} data={data}>
                              <XAxis dataKey="name" stroke="#E30B5C" />
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
               </div>
            </div>
         </div>
      </>
   );
};

export default Dashboard;
