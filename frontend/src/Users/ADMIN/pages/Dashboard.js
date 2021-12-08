import React from 'react';
import Navbar from '../components/Navbar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const Dashboard = () => {
   const data1 = [
      {
        name: 'Zamboanga City West', Collection: 4000, Expenses: 2400, amt: 2400, 
      },
      {
        name: 'Zamboanga City North',Collection: 4000, Expenses: 2400, amt: 2210,
      },
      {
        name: 'Zamboanga City East',Collection: 4000, Expenses: 2400,amt: 2290,
      },
      {
        name: 'Metro Zamboanga', Collection: 4000, Expenses: 2400,  amt: 2000,
      },
      {
        name: 'Western Mindanao State Universisty',Collection: 4000, Expenses: 2400, amt: 2181,
      },
      {
        name: 'Universidad de Zamboanga',Collection: 4000, Expenses: 2400, amt: 2500,
      },
      {
        name: 'Colosa Community', Collection: 4000, Expenses: 2400,amt: 2100,
      },
      {
         name: 'Southern City Colleges',Collection: 4000, Expenses: 2400,amt: 2100,
       },
    ];
   const data = [
      {
        name: 'Zamboanga City West',  uv: 4000, pv: 2400, amt: 2400,
      },
      {
        name: 'Zamboanga City North',  uv: 3000,pv: 1398,amt: 2210,
      },
      {
        name: 'Zamboanga City East',uv: 2000, pv: 9800,  amt: 2290,
      },
      {
        name: 'Metro Zamboanga',uv: 2780, pv: 3908,amt: 2000,
      },
      {
        name: 'Western Mindanao State Universisty', uv: 1890,pv: 4800,amt: 2181,
      },
      {
         name: 'Universidad de Zamboanga', uv: 1890,pv: 4800,amt: 2181,
      },
      {
         name: 'Colosa Community', uv: 1890,pv: 4800,amt: 2181,
      },
      {
         name: 'Southern City Colleges', uv: 1890,pv: 4800,amt: 2181,
      },
    ];
    const getIntroOfPage = (label) => {
      if (label === 'Zamboanga City West') {
        return "Page A is about men's clothing";
      }
      if (label === 'Zamboanga City North') {
        return "Page B is about women's dress";
      }
      if (label === 'Zamboanga City East ') {
        return "Page C is about women's bag";
      }
      if (label === 'Metro Zamboanga') {
        return 'Page D is about household goods';
      }
      if (label === 'Western Mindanao State Universisty ') {
        return 'Page E is about food';
      }
      if (label === 'Universidad de Zamboanga') {
        return 'Page F is about baby food';
      }
      if (label === 'Colosa Community') {
         return 'Page F is about baby food';
       }
       if (label === 'Southern City Colleges') {
         return 'Page F is about baby food';
       }
      return '';
    };
    
    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <div className="custom-tooltip">
            <p className="label">{`${label} : ${payload[0].value}`}</p>
            <p className="intro">{getIntroOfPage(label)}</p>
            <p className="desc">Anything you want can be displayed here.</p>
          </div>
        );
      }
    
      return null;
    };
   
   return (
      <div>
         <Navbar />
         <div className="main container">DASHBOARD</div>
         <div class="row justify-content-center ">
        
        <h1>FUNDS</h1>
        <div style={{ width: '90%', height: 300 }}>
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
         <h1>Total Members per Clubs</h1>
         <div style={{ width: '90%', height: 300 }}>
           <ResponsiveContainer>
            <BarChart width={600} height={300} data={data}>
               <XAxis dataKey="name" stroke="#E30B5C" />
               <YAxis />
               <Tooltip />
               <CartesianGrid stroke="#E30B5C" strokeDasharray="5 5" />
               <Bar dataKey="uv" fill="#E30B5C" barSize={30} />
            </BarChart>
            </ResponsiveContainer>

            </div> 
         
      </div>
      </div>
   );
};

export default Dashboard;
