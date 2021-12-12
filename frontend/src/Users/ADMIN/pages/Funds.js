import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Card } from 'antd';
import Navbar from '../components/Navbar';

const Funds = () => {
   const [list, setList] = useState([]);

   useEffect(() => {
      Axios.get('http://localhost:5000/funds/all').then((response) => {
         if (response) {
            setList(response.data);
         }
      });
   }, []);

   return (
      <>
         <Navbar />
         <div className="main mx-5">
            <div className="bg-pink p-3 rounded fs-4 text-white ps-4 mt-2 container">
               CLUB FUNDS
            </div>

            <div className="row d-flex justify-content-center">
               {list.map((val) => {
                  return (
                     <Card
                        className="col-lg-5 mx-3 mt-4 rounded "
                        title={val.club_name}
                        //     extra={<a href="#">More</a>}
                        style={{ width: 400 }}
                        headStyle={{ backgroundColor: '#eee' }}
                     >
                        <p className="col-lg-5 float-end">
                           Total Expenses: <br />
                           <b>{val.expenses}</b>
                        </p>
                        <p>
                           {' '}
                           TOTAL FUNDS: <br />
                           <b>{val.total_funds}</b>
                        </p>
                        <p className="col-lg-5 float-end">
                           No of donations: <br />
                           <b>{val.no_of_donations}</b>
                        </p>{' '}
                        <p>
                           Donations receieved: <br />
                           <b>{val.donations}</b>
                        </p>
                     </Card>
                  );
               })}
            </div>
         </div>
      </>
   );
};

export default Funds;
