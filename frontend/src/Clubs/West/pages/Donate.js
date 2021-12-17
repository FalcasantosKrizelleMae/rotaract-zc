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
      <>
         <div className="container col-lg-6">
            <div className="my-4">
               <PageHeader
                  className="site-page-header"
                  onBack={() => history.goBack()}
                  title="Back to Previous page"
                  // subTitle="View and update account"
               />
            </div>
            <div className="container shadow-sm rounded p-5">
               <h3>DONATION PAGE</h3>
               <h6 className="mb-5">{chapter}</h6>
               <p>Enter the amount you want to donate: </p>
               <input
                  type="text"
                  name="amount"
                  onChange={(e) => setAmount(e.target.value)}
                  className="form-control col-lg-6 mb-2
                  "
               />{' '}
               <div className="mt-5">
                  <br />
                  {amount !== '' ? (
                     <>
                        <h6>
                           Donate with: <br />{' '}
                        </h6>
                        <PayPalButton
                           style={{
                              color: 'gold',
                              shape: 'pill',
                           }}
                           options={{
                              clientId:
                                 'AcltDSmw1GGXyyHYnoH95j59iCfCH9isXlKAZRXwkYw83wFL2VMkQ9Pze-xWcnpH9Wu8r0__ME8VNbAX',
                              currency: 'PHP',
                           }}
                           amount={amount}
                           onSuccess={(details, data) => {
                              Axios.post(
                                 'http://localhost:5000/donations/save_donation',
                                 {
                                    details: details,
                                    chapter: chapter,
                                    amount: amount,
                                 }
                              ).then((response) => {
                                 if (response) {
                                    alert(response.data[0].status);
                                 } else {
                                    alert('error');
                                 }
                              });
                           }}
                           onError={() => {
                              Swal.fire({
                                 title: 'Error!',
                                 text: 'Error',
                                 icon: 'error',
                                 confirmButtonText: 'Okay',
                              });
                           }}
                        />
                        <button
                           onClick={() => history.goBack()}
                           className="text-danger col-sm btn-white btn"
                        >
                           Cancel
                        </button>
                     </>
                  ) : (
                     ''
                  )}
               </div>
            </div>
         </div>
      </>
   );
};

export default Donate;
