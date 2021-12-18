// import Axios from 'axios';
import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';

const Success = () => {
   let history = useHistory();
   return (
      <>
         <Result
            status="success"
            title="You have succesfully paid your monthly due!"
            subTitle="Thank you for paying! Have a wonderful day ahead."
            extra={[
               <Button
                  key="back"
                  onClick={() => {
                     history.push('/profile');
                  }}
               >
                  Go back
               </Button>,
            ]}
         />
         ,
      </>
   );
};

export default Success;
