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

      Axios.get('http://localhost:5000/funds/all').then((response) => {
         if (response) {
            setList(response.data);
         }
      });
   }, []);

   return (
      <>
         <Navbar />
         <div className="container main">
            <div className="bg-pink p-3 rounded fs-4 text-white ps-4 mt-2 container">
               CLUB FUNDS
            </div>

            <div className="row container d-flex justify-content-center">
               {list.map((val) => {
                  return (
                     <Card
                        className="col-lg-3 mx-3 mt-5 shadow-sm "
                        title={val.club_name}
                        style={{ height: 300, width: 500 }}
                        headStyle={{ backgroundColor: '#eee' }}
                     >
                        <div className="p-4 ">
                           <h6 className="float-end">
                              Total Expenses: <br />
                              <h4>{val.expenses}</h4>
                           </h6>
                           <h6>
                              TOTAL FUNDS: <br />
                              <h4>{val.total_funds}</h4>
                           </h6>
                           <br />
                           <h6>
                              Donations receieved: <br />
                              <h4>{val.donations}</h4>
                           </h6>
                        </div>
                     </Card>
                  );
               })}
            </div>
         </div>
      </>
   );
};

export default Funds;
