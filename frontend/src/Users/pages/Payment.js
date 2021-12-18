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
   const bal = '' + amount;

   const initialOptions = {
      'client-id':
         chapter === 'Metro Zamboanga'
            ? 'AeUH-TloPaiFneY_xxZboERWqyxCQpX1hQEgXXkyfS7SiUd2Gbf8jfTEW8K7tMgUEwjri74vYeQF79iN'
            : chapter === 'Western Mindanao State University (WMSU)'
            ? 'AW5H_GNDYl-Ks55_qLd17uJEe1xt60TR7gbdWuAjdu84PsVY8E9sXxrZseZ4FTlcolUb9V3EYCVjDLyC'
            : chapter === 'Southern City Colleges'
            ? 'AcltDSmw1GGXyyHYnoH95j59iCfCH9isXlKAZRXwkYw83wFL2VMkQ9Pze-xWcnpH9Wu8r0__ME8VNbAX'
            : chapter === 'Tolosa Community'
            ? 'AQ3QDLqKGgbFYC1oZCETIPH3jJt9cXgtTvRpsBpb5MUtpe2My-KyZ6rLfFqANCoxZQCcsyM2cPgx_54Q'
            : chapter === 'Universidad De Zamboanga - CES'
            ? 'AerHO7nMcxTgj7jYOoREnnFFf3pM8hwzi0ws6zb5heYpJIcQJCL1b9jUN6-FR3BBk3HGGaKkr1tkaZqE'
            : chapter === 'Zamboanga City West'
            ? 'AZDKK95i32yH9BDsfoAga126ET4nQp-1WWmON07qSkTUj75_CDGi5owVITonp4uIY3S5eLcXaZM4AdWS'
            : chapter === 'Zamboanga City North'
            ? 'AZcYVJrdRsjmC0p0XOIsi6U23brJ7rOq-nlb4FsnTI9cBM5cZ4dJCqWhtOBZdEP2QHM2zZ3WLpbwlGt2'
            : chapter === 'Zamboanga City East'
            ? 'AYGkV7VtOZLWwfUNMIGRzEueE2aOwEywWpdhrP_q3j82LnsnEPc9QD4RPtdPwSiO5u0vbtcac9OarFoV'
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

         <h4>
            Select Payment Method: <br /> <br />
         </h4>

         <PayPalButton
            options={{
               clientId: initialOptions['client-id'],
               currency: 'PHP',
            }}
            amount={bal}
            onSuccess={(details, data) => {
               Axios.post('http://localhost:5000/payment/save_payment', {
                  details: details,
                  member_id: member_id,
                  chapter: chapter,
                  amount: bal,
               }).then((response) => {
                  if (response) {
                     history.push('/success');

                     localStorage.setItem('balance', 0);
                  }
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
