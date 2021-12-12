import React, { useState, useEffect } from 'react';

import {} from 'react-bootstrap';
import moment from 'moment';
import Moment from 'react-moment';
import * as GrIcons from 'react-icons/gr';
import * as BiIcons from 'react-icons/bi';
import { Modal, Button } from 'antd';
import { Form } from 'react-bootstrap';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

const Payments = () => {
   let history = useHistory();
   const [amount, setAmount] = useState(0);
   const [list, setList] = useState([]);
   const chapter = localStorage.getItem('chapter');
   const { handleSubmit } = useForm();

   //Current time
   const [dateState, setDateState] = useState(new Date());

   useEffect(() => {
      setInterval(() => setDateState(new Date()), 1000);
   }, []);

   //MODAL SETTINGS
   const [isModalVisible, setIsModalVisible] = useState(false);
   const showModal = () => {
      setIsModalVisible(true);
   };

   const handleCancel = () => {
      setIsModalVisible(false);
   };
   //MODAL SETTINGS

   const due_date = moment().add(1, 'month');
   const due = due_date.toISOString();

   //SET PAYMENT
   const onSubmit = (data) => {
      Axios.post('http://localhost:5000/payment/set_payment', {
         amount: amount,
         due_date: due,
         chapter: chapter,
      })
         .then((response) => {
            if (response.data.message === 'success') {
               Swal.fire({
                  title: 'Record updated',
                  icon: 'success',
               });
               setIsModalVisible(false);
            } else {
               Swal.fire({
                  title: 'Error!',
                  text: 'Action unsuccessful',
                  icon: 'warning',
                  confirmButtonText: 'Okay',
               });
            }
         })
         .then(() => {
            setList([
               ...list,
               {
                  amount: amount,
                  due_date: due_date,
               },
            ]);
         });
   };

   useEffect(() => {
      Axios.get(`http://localhost:5000/payment/get_payment/${chapter}`)
         .then((response) => {
            if (response) {
               setList(response.data);
            }
         })

         .catch((error) => console.log(error));
   });

   const logout = () => {
      localStorage.clear();
      history.push('/login');
   };

   return (
      <div className="container mt-5">
         <div className="row d-flex align-items-center mb-3">
            <div className="col-sm-7">
               <h4>Payment page</h4>
               <h6 className="text-uppercase">{chapter}</h6>
            </div>
            <h5 className="col">
               <Moment format="ll LTS (dddd) ">{dateState}</Moment>
            </h5>
         </div>

         <div className="shadow-sm rounded bg-light border col-sm-12 col-md-12 col-lg-8 col-xxl-6 p-4 mt-5">
            <div className="row">
               <div className="col">
                  <h5>
                     THIS MONTH'S PAYMENT <br />({moment().format('MMMM')}){' '}
                  </h5>
               </div>
               <div className="col">
                  {list.length === 0 ? (
                     <Button
                        variant="outline-dark"
                        className="float-end"
                        onClick={showModal}
                     >
                        Add payment
                     </Button>
                  ) : (
                     ''
                  )}
               </div>
            </div>
            <br />

            {list.map((item) => {
               return (
                  <h6>
                     <GrIcons.GrMoney className="mr-3" />
                     Php {item.amount}
                     <br />
                     <br />
                     <BiIcons.BiCalendar className="mr-3" />
                     {moment(item.due_date).format('llll')}
                     <br />
                     <br />
                     <BiIcons.BiUser className="mr-3" />
                     {item.no_of_payers} paid
                  </h6>
               );
            })}
         </div>

         <Modal
            title="Add new payment"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
         >
            <Form className="mx-3" onSubmit={handleSubmit(onSubmit)}>
               <div className="row">
                  <div className="col">
                     <Form.Group>
                        <Form.Label> Amount</Form.Label>
                        <input
                           type="number"
                           min="0"
                           className="form-control"
                           style={{ width: 150 }}
                           onChange={(e) => setAmount(e.target.value)}
                           required
                        />
                     </Form.Group>
                  </div>

                  <div className="col text-danger">
                     DUE DATE:
                     <br />
                     <br />
                     <Moment format="ddd ll">{due_date}</Moment>
                  </div>
               </div>
               <div className="mt-4">
                  <Button
                     type="primary"
                     danger
                     ghost
                     className="col-sm-4
                     "
                     onClick={handleCancel}
                  >
                     Cancel
                  </Button>{' '}
                  <Button
                     htmlType="submit"
                     type="primary"
                     className="col-sm-7 float-end
                     "
                  >
                     Submit
                  </Button>
               </div>
            </Form>
         </Modal>

         <Button onClick={logout} type="primary" className="mt-5">
            Logout
         </Button>
      </div>
   );
};

export default Payments;
