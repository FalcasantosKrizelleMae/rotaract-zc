import Axios from 'axios';
import React, { useEffect, useState } from 'react';

const Success = () => {
   const [list, setList] = useState([]);

   useEffect(() => {
      Axios.get('http://localhost:5000/payment/success').then((response) => {
         if (response) {
            setList(response.data);
         }
      });
   }, []);
   return (
      <div className="fs-3">
         Successful payment! <br /> <br />
         Payment details: <br />
         {list.map((item) => {
            return <h4>{item.id}</h4>;
         })}
      </div>
   );
};

export default Success;
