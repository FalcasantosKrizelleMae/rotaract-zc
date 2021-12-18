import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as BiIcons from 'react-icons/bi';
import { Avatar, Image, Card, PageHeader } from 'antd';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Input } from 'reactstrap';
import Swal from 'sweetalert2';
import Axios from 'axios';
import { useForm } from 'react-hook-form';

function Profile() {
   useForm();
   let history = useHistory();
   const chapter = localStorage.getItem('chapter');
   const id = localStorage.getItem('member_id');
   const name = localStorage.getItem('name');
   const balance = localStorage.getItem('balance');
   const [newPassword, setNewPassword] = useState('');
   const [oldPassword, setOldPassword] = useState('');

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

   const tabListNoTitle = [
      {
         key: 'transactions',
         tab: 'Transactions',
      },
      {
         key: 'account',
         tab: 'Account',
      },
      {
         key: 'history',
         tab: 'History',
      },
   ];

   const [isHidden, setHidden] = useState(true);

   const togglePasswordVisibility = () => {
      setHidden(!isHidden);
   };

   const contentListNoTitle = {
      transactions: (
         <div>
            <h3>Transactions</h3>
         </div>
      ),
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
      history: <p>project content</p>,
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
               onBack={() => history.push(`/member/${id}`)}
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
               <div className="col px-4 py-0 mt-0">
                  <h4>Balance: {balance}</h4>
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
