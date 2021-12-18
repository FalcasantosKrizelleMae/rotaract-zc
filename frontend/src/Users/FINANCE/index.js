import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Axios from 'axios';
import Card from './components/Card';

const Finance = () => {
   const id = localStorage.getItem('member_id');
   const name = localStorage.getItem('name');
   const status = localStorage.getItem('status');
   const chapter = localStorage.getItem('chapter');
   const [list, setList] = useState([]);
   const [total_donation, setDonation] = useState();
   const [expenses, setExpenses] = useState();
   const [total_funds, setTotalFunds] = useState();

   const columns = [
      {
         title: 'Payment ID',
         dataIndex: 'order_id',
         key: 'order_id',
      },
      {
         title: 'Name',
         dataIndex: 'name',
         key: 'name',
      },

      {
         title: 'Date',
         dataIndex: 'date',
         key: 'date',
      },
      {
         title: 'Status',
         dataIndex: 'status',
         key: 'status',
      },
   ];

   useEffect(() => {
      Axios.get(
         `http://localhost:5000/payment/get_transaction/${chapter}`
      ).then((response) => {
         if (response) {
            setList(response.data);
         }
      });

      Axios.get(`http://localhost:5000/web/funds_chapter`, {
         params: {
            chapter: chapter,
         },
      }).then((response) => {
         if (response) {
            setTotalFunds(response.data[0].total_funds);
            setExpenses(response.data[0].expenses);
            setDonation(response.data[0].donations);
         }
      });
   });

   return (
      <div>
         <Navbar />
         <div className="main container">
            <div class="row d-flex justify-content-center">
               {}
               <div class="col-sm-4">
                  <Card
                     title="Fund Balance "
                     imageUrl=""
                     className="bg-dark mb-4 shadow-sm "
                     body={total_funds + ' php'}
                  />
               </div>

               <div class="col-sm-4">
                  <Card
                     title="Expenses"
                     imageUrl=""
                     className="bg-dark mb-4 shadow-sm "
                     body={expenses + ' php'}
                  />
               </div>

               <div class="col-sm-4">
                  <Card
                     title="Donations received"
                     imageUrl=""
                     className="bg-dark mb-4 shadow-sm "
                     body={total_donation + ' php'}
                  />
               </div>
            </div>
            <div className="container ">
               <h4 className="float-start text-uppercase text-pink">
                  List of Payments
               </h4>
               <Link
                  to={{ pathname: `/payments/${chapter}` }}
                  className="float-end"
               >
                  View payment
               </Link>
               <Table dataSource={list} columns={columns} />
            </div>
         </div>
      </div>
   );
};

export default Finance;
