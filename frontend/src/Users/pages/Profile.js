import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as BiIcons from 'react-icons/bi';
import { Avatar, Image, Card, PageHeader, Table, Button } from 'antd';
import { Form, InputGroup } from 'react-bootstrap';
import { Input } from 'reactstrap';
import Swal from 'sweetalert2';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import moment from 'moment';

function Profile() {
   useForm();
   let history = useHistory();
   const [dataList, setDataList] = useState([]);
   const [payments, setPayments] = useState([]);
   const chapter = localStorage.getItem('chapter');
   const id = localStorage.getItem('member_id');
   const name = localStorage.getItem('name');
   const bal = localStorage.getItem('balance');

   const [newPassword, setNewPassword] = useState('');
   const [oldPassword, setOldPassword] = useState('');
   const [list, setList] = useState([]);

   const updatePass = (id) => {
      Axios.put(`http://localhost:5000/admin/update_pass`, {
         oldPassword: oldPassword,
         newPassword: newPassword,
         member_id: id,
      }).then((response) => {
         if (response.data.message === 'success') {
            Swal.fire({
               title: 'Password has changed!',
               icon: 'success',
            });
            localStorage.setItem('status', 'old');
         } else {
            Swal.fire({
               title: 'Error!',
               text: 'Password is invalid',
               icon: 'error',
               confirmButtonText: 'Okay',
            });
         }
      });
   };

   useEffect(() => {
      Axios.get(`http://localhost:5000/auth/get_user/${id}`).then(
         (response) => {
            if (response) {
               setList(response.data);
            }
         }
      );
      Axios.get(`http://localhost:5000/payment/get_payment/${chapter}`).then(
         (response) => {
            if (response) {
               // console.log(response.data);
               setDataList(response.data);
            }
         }
      );

      Axios.get(`http://localhost:5000/payment/get_transaction`, {
         params: {
            member_id: id,
         },
      })
         .then((response) => {
            if (response) {
               // console.log(response.data);
               setPayments(response.data);
            }
         })

         .catch((error) => console.log(error));
   });

   const tabListNoTitle = [
      {
         key: 'account',
         tab: 'Account',
      },
      {
         key: 'history',
         tab: 'Payment History',
      },
   ];

   const [isHidden, setHidden] = useState(true);

   const togglePasswordVisibility = () => {
      setHidden(!isHidden);
   };

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

   const contentListNoTitle = {
      account: (
         <div className="container mt-3 ps-4">
            <h4>CHANGE PASSWORD</h4>
            <div className="mt-5 col-sm-10 col-md-10 col-lg-9">
               <Form action="">
                  <Form.Group className="">
                     <Form.Label className="text-secondary">
                        Old Password
                     </Form.Label>
                     <InputGroup className="">
                        <Input
                           className="text-secondary border-end-0"
                           type={isHidden ? 'password' : 'text'}
                           onChange={(e) => setOldPassword(e.target.value)}
                        ></Input>
                        <InputGroup.Text className="bg-white ">
                           <span className="btn-white m-0 p-0 bg-white">
                              <i
                                 className={
                                    !isHidden ? 'bi-eye' : 'bi-eye-slash'
                                 }
                                 onClick={togglePasswordVisibility}
                              ></i>
                           </span>
                        </InputGroup.Text>
                     </InputGroup>
                  </Form.Group>
                  <Form.Group className="my-4">
                     <Form.Label className="text-secondary">
                        New Password
                     </Form.Label>
                     <InputGroup className="">
                        <Input
                           className="border-end-0"
                           type={isHidden ? 'password' : 'text'}
                           onChange={(e) => setNewPassword(e.target.value)}
                        ></Input>
                        <InputGroup.Text className="bg-white ">
                           <span className="btn-white m-0 p-0 bg-white">
                              <i
                                 className={
                                    !isHidden ? 'bi-eye' : 'bi-eye-slash'
                                 }
                                 onClick={togglePasswordVisibility}
                              ></i>
                           </span>
                        </InputGroup.Text>
                     </InputGroup>
                  </Form.Group>

                  <Button
                     className="my-4"
                     variant="outline-success"
                     onClick={() => {
                        updatePass(id);
                     }}
                  >
                     Save changes
                  </Button>
               </Form>
            </div>
         </div>
      ),
      history: (
         <>
            <Table dataSource={payments} columns={columns} />
         </>
      ),
   };

   const [activeTabKey, setActiveTabKey] = useState('transactions');

   const onTabChange = (key) => {
      setActiveTabKey(key);
   };

   return (
      <div>
         <div className="container my-5 ">
            <PageHeader
               className="site-page-header"
               onBack={() => history.goBack()}
               title="My Account"
               // subTitle="View and update account"
            />
            ,
            <div className="row">
               <div className="col-lg-4 mt-3">
                  {' '}
                  <Card
                     className="rounded shadow-sm"
                     actions={[
                        <BiIcons.BiEditAlt size="17px" />,
                        <BiIcons.BiSave size="17px" />,
                     ]}
                     cover={
                        <Avatar
                           alt="example"
                           style={{ width: '100%', height: '100%' }}
                           shape="square"
                           className="img-fluid img-responsive bg-light"
                           src={
                              <Image src="https://joeschmoe.io/api/v1/random" />
                           }
                        />
                     }
                  >
                     <div className="info">
                        <h6 className="text-secondary mb-4">MEMBER ID: {id}</h6>
                        <h4>{name}</h4>
                        <h6 className="price mt-2 text-secondary">{chapter}</h6>
                     </div>
                  </Card>
               </div>
               <div className="col shadow-sm px-4 py-0 mt-0">
                  <div className="container  rounded p-4">
                     {list.map((item) => {
                        return (
                           <>
                              <div className="float-start">
                                 <h6>BALANCE: {''} </h6>
                                 <br />

                                 <h2>{bal} php</h2>
                              </div>

                              {bal === '0' ? (
                                 ' '
                              ) : (
                                 <Button
                                    className="float-end"
                                    type="primary"
                                    onClick={() => {
                                       history.push('/pay-mem');
                                    }}
                                 >
                                    Pay now
                                 </Button>
                              )}
                           </>
                        );
                     })}
                     {dataList.map((item) => {
                        return (
                           <h6 className="mt-5">
                              Payment for this month ({moment().format('MMMM')}
                              ): <br />
                              <h6> {item.amount} php</h6>
                              <br />
                              <div className="text-danger fs-6">
                                 Due Date: <br />
                                 {moment(item.due_date).format('llll')}
                              </div>
                              <br />
                              <br />
                           </h6>
                        );
                     })}
                  </div>

                  <Card
                     className="rounded shadow-sm"
                     style={{ width: '100%', marginTop: 20 }}
                     bordered={false}
                     tabList={tabListNoTitle}
                     activeTabKey={activeTabKey}
                     onTabChange={(key) => {
                        onTabChange(key);
                     }}
                  >
                     {contentListNoTitle[activeTabKey]}
                  </Card>
               </div>
               {/* <div className="col-lg-8  d-flex justify-content-center mt-2">
                  <Card style={{ width: '100%' }} className="rounded shadow-sm">
                     <Card.Grid hoverable={false} style={{ width: '100%' }}>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                     </Card.Grid>
                     <Card.Grid hoverable={false} style={{ width: '100%' }}>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                     </Card.Grid>
                     <Card.Grid hoverable={false} style={{ width: '100%' }}>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                     </Card.Grid>
                  </Card>
               </div> */}
            </div>
         </div>
      </div>
   );
}

export default Profile;
