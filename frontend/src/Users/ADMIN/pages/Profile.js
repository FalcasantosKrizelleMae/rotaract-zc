import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Input } from 'reactstrap';
import {
   Card,
   Nav,
   Button,
   Container,
   Form,
   InputGroup,
   Modal,
} from 'react-bootstrap';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

import '../css/main.css';

function ProfileAdmin() {
   const [newPassword, setNewPassword] = useState('');
   const [oldPassword, setOldPassword] = useState('');
   const [account, setAccount] = useState([]);

   const [show, setShow] = useState(false);
   const handleShow = () => setShow(true);

   const handleClose = () => {
      setShow(false);
   };

   const updateAdmin = () => {
      Axios.put(`http://localhost:5000/admin/update_admin`, {
         oldPassword: oldPassword,
         newPassword: newPassword,
      }).then((response) => {
         if (response.data.message === 'success') {
            Swal.fire({
               title: 'Password has changed!',
               icon: 'success',
            });
            handleClose(true);
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

   const [isHidden, setHidden] = useState(true);

   const togglePasswordVisibility = () => {
      setHidden(!isHidden);
   };

   useEffect(() => {
      Axios.get('http://localhost:5000/admin/getAdmin').then((response) => {
         setAccount(response.data);
      });
   });

   return (
      <>
         <Navbar />
         <div className="container main ">
            <div className="bg-pink p-3 rounded fs-3 text-white ps-4 mb-5 mt-2 ">
               SETTINGS
            </div>

            <div className=" container mt-5 ">
               <Card>
                  <Card.Header>
                     <Nav variant="tabs" defaultActiveKey="#first">
                        <Nav.Item>
                           <Nav.Link href="#first">Account</Nav.Link>
                        </Nav.Item>
                     </Nav>
                  </Card.Header>
                  <Container className="m-5">
                     <Form>
                        {account.map((val) => {
                           return (
                              <Card.Body>
                                 <Card.Title className="mb-5">
                                    <h3>ADMIN ACCOUNT</h3>
                                 </Card.Title>

                                 <Card.Text>
                                    <Form.Group className="mb-3">
                                       <Form.Label className="text-secondary">
                                          Account number
                                       </Form.Label>
                                       <input
                                          className="form-control col-sm-7"
                                          type="tel"
                                          name="member_id"
                                          value={val.member_id}
                                          disabled
                                       />
                                    </Form.Group>
                                 </Card.Text>

                                 <Button
                                    variant="outline-primary"
                                    className="mt-3"
                                    onClick={() => {
                                       handleShow();
                                    }}
                                 >
                                    Change password
                                 </Button>
                              </Card.Body>
                           );
                        })}
                     </Form>
                  </Container>
               </Card>
            </div>
         </div>

         <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
         >
            <Modal.Header closeBtn className="">
               <Modal.Title className="ms-4">ADMIN ACCOUNT</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Container>
                  {account.map((val) => {
                     return (
                        <Form id="add-account-form" className="m-4">
                           {/* Member id */}
                           <Form.Group className="mb-4 ">
                              <Form.Label className="text-secondary">
                                 Account number
                              </Form.Label>
                              {/* <Form.Label>Member ID</Form.Label> */}
                              <input
                                 className="form-control "
                                 type="text"
                                 name="acc_num"
                                 placeholder="Account Number"
                                 value={val.member_id}
                              />
                           </Form.Group>
                           <Form.Group className="">
                              <Form.Label className="text-secondary">
                                 Old Password
                              </Form.Label>
                              <InputGroup className="">
                                 <Input
                                    name="oldPassword"
                                    className="text-secondary border-end-0"
                                    type={isHidden ? 'password' : 'text'}
                                    onChange={(e) =>
                                       setOldPassword(e.target.value)
                                    }
                                 ></Input>
                                 <InputGroup.Text className="bg-white ">
                                    <span className="btn-white m-0 p-0 bg-white">
                                       <i
                                          className={
                                             !isHidden
                                                ? 'bi-eye'
                                                : 'bi-eye-slash'
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
                                    name="newPassword"
                                    className="border-end-0"
                                    type={isHidden ? 'password' : 'text'}
                                    onChange={(e) =>
                                       setNewPassword(e.target.value)
                                    }
                                 ></Input>
                                 <InputGroup.Text className="bg-white ">
                                    <span className="btn-white m-0 p-0 bg-white">
                                       <i
                                          className={
                                             !isHidden
                                                ? 'bi-eye'
                                                : 'bi-eye-slash'
                                          }
                                          onClick={togglePasswordVisibility}
                                       ></i>
                                    </span>
                                 </InputGroup.Text>
                              </InputGroup>
                           </Form.Group>
                           <Button variant="secondary" onClick={handleClose}>
                              Close
                           </Button>{' '}
                           <Button
                              variant="outline-success"
                              onClick={updateAdmin}
                           >
                              Save changes
                           </Button>
                           {''}
                        </Form>
                     );
                  })}
               </Container>
            </Modal.Body>
         </Modal>
      </>
   );
}

export default ProfileAdmin;
