import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import React, { useState } from 'react';
import '../css/login.css';
import logo from '../images/logo.png';
import Axios from 'axios';
import { useHistory } from 'react-router';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { IconContext } from 'react-icons';
import { BiUser, BiLockAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { Input } from 'reactstrap';

function Login() {
   let history = useHistory();
   const [member_id, setMember_id] = useState();
   const [password, setPassword] = useState();
   const [status, setStatus] = useState('');

   // const [role, setRole] = useState("");
   const login = () => {
      Axios.post('http://localhost:5000/auth/api/login', {
         member_id: member_id,
         password: password,
      }).then((response) => {
         if (response.data.message) {
            setStatus(response.data.message);
         } else {
            localStorage.setItem('auth', true);

            if (response.data.role === 'Member') {
               localStorage.setItem('member_id', member_id);
               localStorage.setItem('chapter', response.data.chapter);
               localStorage.setItem('name', response.data.name);
               localStorage.setItem('status', response.data.status);
               localStorage.setItem('balance', response.data.balance);
               localStorage.setItem('role', response.data.role);
               history.push({
                  pathname: `/member/${member_id}`,
               });
            } else if (response.data.role === 'admin') {
               localStorage.setItem('role', response.data.role);
               history.push('/admin');
            } else if (response.data.role === 'Secretary') {
               localStorage.setItem('member_id', member_id);
               localStorage.setItem('chapter', response.data.chapter);
               localStorage.setItem('name', response.data.name);
               localStorage.setItem('status', response.data.status);
               localStorage.setItem('balance', response.data.balance);
               localStorage.setItem('role', response.data.role);
               history.push({
                  pathname: `/secretary/${member_id}`,
               });
            } else if (response.data.role === 'President') {
               localStorage.setItem('member_id', member_id);
               localStorage.setItem('chapter', response.data.chapter);
               localStorage.setItem('name', response.data.name);
               localStorage.setItem('status', response.data.status);
               localStorage.setItem('balance', response.data.balance);
               localStorage.setItem('role', response.data.role);
               history.push({
                  pathname: `/president/${member_id}`,
               });
            } else if (response.data.role === 'Finance') {
               localStorage.setItem('member_id', member_id);
               localStorage.setItem('chapter', response.data.chapter);
               localStorage.setItem('name', response.data.name);
               localStorage.setItem('status', response.data.status);
               localStorage.setItem('balance', response.data.balance);
               localStorage.setItem('role', response.data.role);
               history.push({
                  pathname: `/finance/${member_id}`,
               });
            }
         }
      });
   };

   const [isHidden, setHidden] = useState(true);

   const togglePasswordVisibility = () => {
      setHidden(!isHidden);
   };

   return (
      <div className="container ">
         <Row className="mt-5 pt-5">
            <Col md={9} lg={5} sm={12} className="m-auto">
               <Form className="">
                  <div className="text-center my-3 mb-5">
                     <Link to="/">
                        <img
                           src={logo}
                           height="50vh"
                           className="img-responsive"
                           alt="Rotaract logo"
                        />
                     </Link>
                  </div>

                  <Container>
                     <IconContext.Provider
                        value={{
                           color: 'gray',
                           className: 'global-class-name',
                        }}
                     >
                        {status === '' ? (
                           ' '
                        ) : (
                           <>
                              <div class="alert small alert-danger alert-dismissible fade show p-2 px-3">
                                 {status}
                                 <button
                                    class="btn-close pt-2 px-2 mx-1 small text-danger"
                                    data-bs-dismiss="alert"
                                 ></button>
                              </div>
                           </>
                        )}

                        <Form.Group className="mb-4 mt-3">
                           <Form.Label className="text-secondary">
                              Member ID
                           </Form.Label>
                           <InputGroup className="">
                              <InputGroup.Text>
                                 <BiUser />
                              </InputGroup.Text>
                              <Input
                                 className="text-secondary "
                                 type="text"
                                 onChange={(e) => setMember_id(e.target.value)}
                              />
                           </InputGroup>

                           <small>
                              Input the Member ID that was sent in your Email
                           </small>
                           <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-5">
                           <Form.Label className="text-secondary">
                              Password
                           </Form.Label>
                           <InputGroup className="">
                              <InputGroup.Text>
                                 <BiLockAlt />
                              </InputGroup.Text>
                              <Input
                                 className="text-secondary border-end-0"
                                 type={isHidden ? 'password' : 'text'}
                                 onChange={(e) => setPassword(e.target.value)}
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
                        <style type="text/css">
                           {`
                  .btn-pink {
                      background-color:#d91b5c;
                    color: #d91b5c;
                    border: 2px solid #d91b5c;
                        border-radius: 100px;
                        color: white;
                  }

                  .bg-pink{
                     background: #d91b5c;
                  }

                  .btn-pink:hover {
                     background-color: rgb(217, 27, 92,0.8);
                    
                     color: white;
                  }

                  .btn-close{
                     font-size: 8px;
                  
                  }

                  .alert{
                     font-size: 13px;
   
                    
                  }

                  
                  `}
                        </style>
                        <div className="d-flex justify-content-center mb-5">
                           <Button
                              variant="pink"
                              className="w-75 py-2 btn-login"
                              onClick={login}
                           >
                              LOGIN
                           </Button>
                        </div>
                        {/* <div className="row text-center mt">
                           <Link
                              to="./register"
                              className="text-dark text-decoration-none"
                           >
                              Forgot Password?
                           </Link>
                        </div> */}
                     </IconContext.Provider>
                  </Container>
               </Form>
            </Col>
         </Row>
      </div>
   );
}

export default Login;
