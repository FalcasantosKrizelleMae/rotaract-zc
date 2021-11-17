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
   const [list, setList] = useState([]);
   const [account, setAccount] = useState({
      acc_num: '',
      password: '',
   });

   const { newacc_num, newpassword } = account;

   const [show, setShow] = useState(false);
   const handleShow = () => setShow(true);

   const handleClose = () => {
      setShow(false);
   };

   const onInputChange = (e) => {
      setAccount({ ...account, [e.target.name]: e.target.value });
   };

   const updateAdmin = (id) => {
      Axios.put(`http://localhost:5000/admin/update_admin/${id}`, account).then(
         (response) => {
            if (response.data.message === 'success') {
               Swal.fire({
                  title: 'Record updated!',
                  icon: 'success',
               });
               handleClose(true);
            } else {
               Swal.fire({
                  title: 'Error!',
                  text: 'Registration unsuccessful',
                  icon: 'error',
                  confirmButtonText: 'Okay',
               });
            }
         }
      );
   };

   const getAdmin = () => {
      Axios.get(`http://localhost:5000/admin/getAdmin`).then((response) => {
         setAccount({
            newacc_num: response.data[0].member_id,
            newpassword: response.data[0].password,
         });
      });
   };

   const { handleSubmit } = useForm();
   const onSubmit = (data) => {};

   const [isHidden, setHidden] = useState(true);

   const togglePasswordVisibility = () => {
      setHidden(!isHidden);
   };

   useEffect(() => {
      Axios.get('http://localhost:5000/admin/getAdmin').then((response) => {
         setList(response.data);
      });
   });

   return (
      <>
         <Navbar />
         <div className="main mx-5">
            <div className="container-fluid bg-pink p-3  rounded">
               <h5 className="m-0 text-white">SETTINGS</h5>
            </div>

            <div className="mt-5 col-sm-6">
               <Card>
                  <Card.Header>
                     <Nav variant="tabs" defaultActiveKey="#first">
                        <Nav.Item>
                           <Nav.Link href="#first">Account</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                           <Nav.Link href="#Other">Other</Nav.Link>
                        </Nav.Item>
                     </Nav>
                  </Card.Header>
                  <Container className="m-5">
                     <Form
                        onSubmit={handleSubmit(onSubmit)}
                        id="add-account-form"
                     >
                        {list.map((val) => {
                           return (
                              <Card.Body>
                                 <Card.Title className="mb-5">
                                    <h3>ADMIN ACCOUNT</h3>
                                 </Card.Title>

                                 <Card.Text>
                                    {/* Member id */}

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

                                    <Form.Group className="mb-5">
                                       <Form.Label className="text-secondary">
                                          Password
                                       </Form.Label>
                                       <InputGroup className="">
                                          <Input
                                             name="password"
                                             className="text-secondary border-end-0 col-sm-7"
                                             type={
                                                isHidden ? 'password' : 'text'
                                             }
                                             value={val.password}
                                             disabled
                                          ></Input>
                                          <InputGroup.Text className="bg-light ">
                                             <span className="btn m-0 p-0 bg-light">
                                                <i
                                                   className={
                                                      !isHidden
                                                         ? 'bi-eye'
                                                         : 'bi-eye-slash'
                                                   }
                                                   onClick={
                                                      togglePasswordVisibility
                                                   }
                                                ></i>
                                             </span>
                                          </InputGroup.Text>
                                       </InputGroup>
                                    </Form.Group>
                                 </Card.Text>

                                 <Button
                                    variant="outline-primary"
                                    className="mt-3"
                                    onClick={() => {
                                       handleShow();
                                       getAdmin(val.member_id);
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
            size="lg"
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
                  <Form
                     onSubmit={handleSubmit(onSubmit)}
                     id="add-account-form"
                     className="m-4"
                  >
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
                           value={newacc_num}
                           onChange={(e) => onInputChange(e)}
                        />
                     </Form.Group>

                     <Form.Group className="">
                        <Form.Label className="text-secondary">
                           Password
                        </Form.Label>
                        <InputGroup className="">
                           <Input
                              name="password"
                              className="text-secondary border-end-0"
                              type={isHidden ? 'password' : 'text'}
                              value={newpassword}
                           ></Input>
                           <InputGroup.Text className="bg-white ">
                              <span className="btn m-0 p-0 bg-white">
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
                           Confirm Password
                        </Form.Label>
                        <InputGroup className="">
                           <Input
                              name="password"
                              className="border-end-0"
                              type={isHidden ? 'password' : 'text'}
                           ></Input>
                           <InputGroup.Text className="bg-white ">
                              <span className="btn m-0 p-0 bg-white">
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
                  </Form>
               </Container>
            </Modal.Body>
            <Modal.Footer className="me-4">
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>

               <Button
                  variant="outline-success"
                  onClick={() => {
                     updateAdmin(newacc_num);
                  }}
               >
                  Save changes
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
}

export default ProfileAdmin;
