// import Axios from 'axios';
import React from 'react';
import { Result, Button } from 'antd';

const Success = () => {
   return (
      <>
         <Result
            status="success"
            title="Successfully Purchased Cloud Server ECS!"
            subTitle="Thank you for donating! Have a wonderful day ahead."
            extra={[<Button key="buy">Buy Again</Button>]}
         />
         ,
      </>
   );
};

export default Success;
