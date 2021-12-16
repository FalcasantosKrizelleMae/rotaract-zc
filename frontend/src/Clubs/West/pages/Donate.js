import React, { useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { PageHeader } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';
import Axios from 'axios';
import Swal from 'sweetalert2';

const Donate = () => {
   const [amount, setAmount] = useState('');
   const location = useLocation();
   const { chapter } = location.state;
   let history = useHistory();

   return (
      <div>
         <div className="container">
            <div className="my-5 ">
               <PageHeader
                  className="site-page-header"
                  onBack={() => history.goBack()}
                  title="Back to Payment"
                  // subTitle="View and update account"
               />
            </div>
            <h5>Donate Amount</h5>
            <input
               type="text"
               onChange={(e) => setAmount(e.target.value)}
               className="form-control col-sm-3"
            />
            <div className="mt-5">
               Donate with: <br />
               <br />
               <PayPalButton
                  options={{
                     clientId:
                        'AcltDSmw1GGXyyHYnoH95j59iCfCH9isXlKAZRXwkYw83wFL2VMkQ9Pze-xWcnpH9Wu8r0__ME8VNbAX',
                     currency: 'PHP',
                  }}
                  amount={amount}
                  onSuccess={(details, data) => {
                     Axios.post('http://localhost:5000/payment/save_payment', {
                        details: details,
                        chapter: chapter,
                        amount: amount,
                     }).then((response) => {
                        history.goBack();
                     });
                  }}
                  onError={() =>
                     Swal.fire({
                        title: 'Error!',
                        text: 'Error',
                        icon: 'error',
                        confirmButtonText: 'Okay',
                     })
                  }
               />
            </div>
         </div>
      </div>
   );
};

export default Donate;
