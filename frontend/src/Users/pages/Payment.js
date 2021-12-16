import { PayPalButton } from 'react-paypal-button-v2';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import { PageHeader } from 'antd';

export default function Payment() {
   let history = useHistory();
   const chapter = localStorage.getItem('chapter');
   const amount = localStorage.getItem('balance');
   const member_id = localStorage.getItem('member_id');
   const balance = '' + amount;

   const initialOptions = {
      'client-id':
         chapter === 'Metro Zamboanga'
            ? 'AeUH-TloPaiFneY_xxZboERWqyxCQpX1hQEgXXkyfS7SiUd2Gbf8jfTEW8K7tMgUEwjri74vYeQF79iN'
            : chapter === 'Western Mindanao State University (WMSU)'
            ? 'AZbmJPYtB1DsCgR5tAeF_bm8JxvwUYgDx_xitzoh30dIhrYqgYwEm2GVn5BjEhyN53AhatcOoXj1ykti'
            : chapter === 'Southern City Colleges'
            ? 'AcltDSmw1GGXyyHYnoH95j59iCfCH9isXlKAZRXwkYw83wFL2VMkQ9Pze-xWcnpH9Wu8r0__ME8VNbAX'
            : '',
   };

   return (
      <div className="container">
         <div className="my-5">
            <PageHeader
               className="site-page-header"
               onBack={() => history.goBack()}
               title="Back to Payment"
               // subTitle="View and update account"
            />
         </div>

         <PayPalButton
            options={{
               clientId: initialOptions['client-id'],
               currency: 'PHP',
            }}
            amount={balance}
            onSuccess={(details, data) => {
               Axios.post('http://localhost:5000/payment/save_payment', {
                  details: details,
                  member_id: member_id,
                  chapter: chapter,
                  amount: balance,
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
   );
}
