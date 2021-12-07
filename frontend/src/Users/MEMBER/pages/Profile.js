import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as BiIcons from 'react-icons/bi';
import { Avatar, Image, Card, PageHeader } from 'antd';
import { Form, Button, InputGroup } from 'react-bootstrap';
// import { Input } from 'reactstrap';
// import Axios from 'axios';
import { useForm } from 'react-hook-form';

function Profile() {
   useForm();
   let history = useHistory();
   const chapter = localStorage.getItem('chapter');
   const id = localStorage.getItem('member_id');
   const name = localStorage.getItem('name');
   const [newPassword, setNewPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');

   const change_pass = (id) => {
      alert(newPassword + confirmPassword);
      // Axios.post(`http://localhost:5000/auth/change_password/${id}`, {
      //    newPassword: newPassword,
      //    confirmPassword: confirmPassword,
      // }).then((response) => {
      //    alert(response.data.message);
      // });
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
   const [isHidden2, setHidden2] = useState(true);

   const togglePasswordVisibility = () => {
      setHidden(!isHidden);
   };

   const togglePasswordVisibility2 = () => {
      setHidden2(!isHidden2);
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
            <div className="mt-5 col-sm-10 col-md-10 col-lg-6">
               <Form action="">
                  <InputGroup className="mb-3">
                     <input
                        className="form-control text-secondary border-end-0 "
                        type={isHidden ? 'password' : 'text'}
                        onChange={(e) => setNewPassword(e.target.value)}
                     />
                     <InputGroup.Text className="bg-white ">
                        <span className=" m-0 p-0 bg-white">
                           <i
                              className={!isHidden ? 'bi-eye' : 'bi-eye-slash'}
                              onClick={togglePasswordVisibility}
                           ></i>
                        </span>
                     </InputGroup.Text>
                  </InputGroup>
                  <InputGroup>
                     <input
                        className="form-control text-secondary border-end-0 "
                        type={isHidden2 ? 'password' : 'text'}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                     />
                     <InputGroup.Text className="bg-white ">
                        <span className=" m-0 p-0 bg-white">
                           <i
                              className={!isHidden2 ? 'bi-eye' : 'bi-eye-slash'}
                              onClick={togglePasswordVisibility2}
                           ></i>
                        </span>
                     </InputGroup.Text>
                  </InputGroup>
                  <button className="mt-3 btn btn-outline-danger mr-3">
                     Cancel
                  </button>{' '}
                  <Button type="submit" variant="primary" onClick={change_pass}>
                     Change password
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
         <div className="container my-2 ">
            <PageHeader
               className="site-page-header"
               onBack={() => history.push(`/member/${id}`)}
               title="My Account"
               // subTitle="View and update account"
            />
            ,
            <div className="row">
               <div className="col mt-2">
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

               <div className="col-lg-8  d-flex justify-content-center mt-2">
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
               </div>
            </div>
            <div className="col px-0 pb-5 pt-2">
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
         </div>
      </div>
   );
}

export default Profile;
