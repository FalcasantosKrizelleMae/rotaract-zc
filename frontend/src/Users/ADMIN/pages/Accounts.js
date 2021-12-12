import React, { useState, useEffect } from 'react';

import { Form, Button, Container, Table, Modal } from 'react-bootstrap';
import Axios from 'axios';
import Swal from 'sweetalert2';
import '../css/main.css';
import * as BiIcons from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import QrCode from 'qrcode';
import { Avatar, Image } from 'antd';
import Navbar from '../components/Navbar';
import moment from 'moment';

function Accounts() {
   const [qrcode, setQrcode] = useState('');

   const [member_id, setMember_id] = useState(0);
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [role, setRole] = useState('');
   const [chapter, setChapter] = useState('');
   const [email, setEmail] = useState('');
   const [list, setList] = useState([]);
   const [date_joined, setDateJoined] = useState('');
   const [dataList, setNewDataList] = useState({
      newmember_id: '',
      newfirstName: '',
      newlastName: '',
      newemail: '',
      newrole: '',
      newchapter: '',
      date_started: '',
   });

   const generateQrCode = async () => {
      try {
         const response = await QrCode.toDataURL(member_id);
         setQrcode(response);
      } catch (error) {
         console.log(error);
      }
   };

   const {
      newmember_id,
      newfirstname,
      newlastname,
      newemail,
      newrole,
      newchapter,
      date_started,
   } = dataList;

   const onInputChange = (e) => {
      setNewDataList({ ...dataList, [e.target.name]: e.target.value });
   };

   const [show, setShow] = useState(false);

   const handleClose = () => {
      setShow(false);
   };

   const getData = (id) => {
      Axios.get(`http://localhost:5000/admin/getData/${id}`).then((result) => {
         setNewDataList({
            newmember_id: result.data[0].member_id,
            newfirstname: result.data[0].first_name,
            newlastname: result.data[0].last_name,
            newemail: result.data[0].email,
            newrole: result.data[0].role,
            newchapter: result.data[0].chapter,
            date_started: moment(result.data[0].date_started).format(),
         });
      });
   };

   const handleShow = () => setShow(true);

   const { handleSubmit } = useForm();

   const onSubmit = (data) => {
      Axios.post('http://localhost:5000/admin/add_account', {
         member_id: member_id,
         qrcode: qrcode,
         firstName: firstName,
         lastName: lastName,
         email: email,
         role: role,
         chapter: chapter,
         date_joined: date_joined,
      })
         .then((response) => {
            if (response.data.message === 'success') {
               Swal.fire({
                  title: 'Member Registered!',
                  icon: 'success',
               });
               clear();
            } else if (response.data.message === 'exists') {
               Swal.fire({
                  title: 'Error!',
                  text: 'This Member ID already exists',
                  icon: 'warning',
                  confirmButtonText: 'Okay',
               });
            } else {
               Swal.fire({
                  title: 'Error!',
                  text: 'Registration unsuccessful',
                  icon: 'error',
                  confirmButtonText: 'Okay',
               });
            }
         })
         .then(() => {
            setList([
               ...list,
               {
                  member_id: member_id,
                  first_name: firstName,
                  last_name: lastName,
                  email: email,
                  role: role,
                  chapter: chapter,
               },
            ]);
         });
   };

   const updateAccount = (id) => {
      Axios.put(
         `http://localhost:5000/admin/update_account/${id}`,
         dataList
      ).then((response) => {
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
      });
   };

   //DELETE ACCOUNT
   const deleteAccount = (id) => {
      Swal.fire({
         title: `Are you sure you want to remove this
               from the list?`,
         showDenyButton: true,

         confirmButtonText: 'Remove',
         denyButtonText: `Cancel`,
      }).then((result) => {
         /* Read more about isConfirmed, isDenied below */
         if (result.isConfirmed) {
            Axios.delete(
               `http://localhost:5000/admin/delete_account/${id}`
            ).then((response) => {
               if (response.data.message === 'success') {
                  Swal.fire(
                     `You just removed the member
               from the list`,
                     '',
                     'success'
                  );
               } else {
                  Swal.fire({
                     title: 'Error!',
                     text: 'ERROR',
                     icon: 'error',
                     confirmButtonText: 'Okay',
                  });
               }
            });
         } else {
            if (result.isDenied) {
               Swal.fire('Action cancelled ', '', 'info');
            }
         }
      });
   };

   //Display all data
   useEffect(() => {
      Axios.get('http://localhost:5000/admin/list').then((response) => {
         if (response) {
            setList(response.data);
         }
      });
   });

   function clear(e) {
      document.getElementById('add-account-form').reset();
   }

   return (
      <>
         <Navbar />
         <div className="mx-5 main">
            <div className="container-fluid bg-pink p-3  rounded">
               <h5 className="m-0 text-white">ACCOUNTS</h5>
            </div>
            <div className="col-sm-7  py-5 ps-4 mt-5 bg-white shadow-sm">
               <h5 className="ms-5 mb-4">ADD NEW USER</h5>
               <div className="col-sm">
                  <Form
                     onSubmit={handleSubmit(onSubmit)}
                     id="add-account-form"
                     className="mx-4"
                  >
                     {/* Member id */}
                     <Form.Group className="mb-3">
                        {/* <Form.Label>Member ID</Form.Label> */}
                        <input
                           className="form-control"
                           type="tel"
                           placeholder="Member ID"
                           pattern="[0-9]{8}"
                           onChange={(e) => setMember_id(e.target.value)}
                           required
                        />
                     </Form.Group>

                     {/* Full name */}
                     <div className="row">
                        <Form.Group className="mb-3 col-sm">
                           <input
                              className="form-control"
                              type="text"
                              name="firstName"
                              placeholder="First name"
                              onChange={(e) => setFirstName(e.target.value)}
                              required
                           />
                        </Form.Group>

                        <Form.Group className="mb-3 col-sm">
                           {/* <Form.Label>First name</Form.Label> */}
                           <input
                              className="form-control col"
                              type="text"
                              name="lastName"
                              placeholder="Last name"
                              onChange={(e) => setLastName(e.target.value)}
                              required
                           />
                        </Form.Group>
                     </div>
                     {/* role */}

                     <Form.Group className="mb-3 ">
                        <input
                           className="form-control"
                           type="email"
                           name="email"
                           placeholder="Email"
                           onChange={(e) => setEmail(e.target.value)}
                           required
                        />
                     </Form.Group>

                     <select
                        className="form-select mb-3"
                        name="role"
                        onChange={(e) => setRole(e.target.value)}
                        required
                     >
                        <option value="">Select position</option>
                        <option name="Member" value="Member">
                           Member
                        </option>

                        <option name="President" value="President">
                           President
                        </option>
                        <option name="Secretary" value="Secretary">
                           Secretary
                        </option>
                        <option name="Finance" value="Finance">
                           Finance
                        </option>
                     </select>

                     {/* chapter */}

                     <select
                        className="form-select mb-4"
                        name="chapter"
                        onChange={(e) => setChapter(e.target.value)}
                        required
                     >
                        <option value="">Select chapter</option>
                        <option value="Zamboanga City West">
                           Zamboanga City West
                        </option>
                        <option value="Zamboanga City North">
                           Zamboanga City North
                        </option>
                        <option value="Zamboanga City East">
                           Zamboanga City East
                        </option>
                        <option value="Metro Zamboanga">Metro Zamboanga</option>
                        <option value="Western Mindanao State University (WMSU)">
                           Western Mindanao State University (WMSU)
                        </option>
                        <option value="Universidad De Zamboanga - CES">
                           Universidad De Zamboanga - CES
                        </option>
                        <option value="Tolosa Community">
                           Tolosa Community
                        </option>
                        <option value="Southern City Colleges">
                           Southern City Colleges
                        </option>
                     </select>

                     <Form.Group className="mb-3 ">
                        <Form.Label>Date started</Form.Label>
                        <input
                           className="form-control"
                           type="date"
                           name="date_joined"
                           placeholder="Date Joined"
                           onChange={(e) => setDateJoined(e.target.value)}
                           required
                        />
                     </Form.Group>

                     <div className="d-flex justify-content-end ">
                        <Button variant="outline-danger" onClick={clear}>
                           Clear
                        </Button>
                        &nbsp; &nbsp;
                        <Button
                           type="submit"
                           variant="primary"
                           onClick={() => {
                              generateQrCode();
                           }}
                        >
                           Add account
                        </Button>
                     </div>
                  </Form>
               </div>

               {/* right column */}
               <div className="col-sm"></div>
            </div>

            <div className=" mt-5 shadow-sm rounded p-5 col">
               <h5 className="text-uppercase mb-4">List of Users</h5>
               <Table responsive="lg">
                  <thead height="60" className="bg-pink text-white">
                     <tr>
                        <th>Member ID</th>
                        <th>Name</th>
                        <th>Date started</th>
                        <th>Email</th>
                        <th>QR Code</th>
                        <th>Position</th>
                        <th>Chapter</th>

                        <th className="text-center">Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {list.length === 0 ? (
                        <tr className="border">
                           <div className="p-3">No records available</div>
                        </tr>
                     ) : (
                        list.map((val) => {
                           return (
                              <tr>
                                 <td>{val.member_id}</td>
                                 <td>{val.first_name + ' ' + val.last_name}</td>
                                 <td>
                                    {moment(val.date_started).format('ll')}
                                 </td>
                                 <td>{val.email}</td>
                                 <td>
                                    {' '}
                                    <Avatar
                                       className="bg-white"
                                       size={70}
                                       shape="square"
                                       src={<Image src={val.qrcode} />}
                                    ></Avatar>
                                 </td>
                                 <td>{val.role}</td>
                                 <td>{val.chapter}</td>

                                 <td className="text-center">
                                    <Button
                                       variant="outline-primary"
                                       onClick={() => {
                                          handleShow();
                                          getData(
                                             val.member_id,
                                             val.first_name
                                          );
                                       }}
                                    >
                                       <BiIcons.BiEdit />
                                    </Button>
                                    &nbsp;
                                    <Button
                                       variant="danger"
                                       onClick={() => {
                                          deleteAccount(val.member_id);
                                       }}
                                    >
                                       <BiIcons.BiTrash />
                                    </Button>
                                 </td>
                              </tr>
                           );
                        })
                     )}
                  </tbody>
               </Table>
            </div>
         </div>

         {/* MODAL */}
         <Modal
            size="lg"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
         >
            <Modal.Header closeBtn>
               <Modal.Title className="ms-4">UPDATE ACCOUNT</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form className=" m-3">
                  <Container className="">
                     <Form.Group className="mb-3">
                        {/* <Form.Label>Member ID</Form.Label> */}
                        <input
                           className="form-control"
                           type="text"
                           name="member_id"
                           placeholder="Member ID"
                           value={newmember_id}
                        />
                     </Form.Group>

                     {/* Full name */}
                     <div className="row">
                        <Form.Group className="mb-3 col-sm">
                           {/* <Form.Label>First name</Form.Label> */}
                           <input
                              className="form-control"
                              type="text"
                              name="newfirstname"
                              placeholder="First name"
                              value={newfirstname}
                              onChange={(e) => onInputChange(e)}
                           />
                        </Form.Group>

                        <Form.Group className="mb-3 col-sm">
                           {/* <Form.Label>First name</Form.Label> */}
                           <input
                              className="form-control col"
                              type="text"
                              name="newlastname"
                              placeholder="Last Name"
                              value={newlastname}
                              onChange={(e) => onInputChange(e)}
                           />
                        </Form.Group>
                     </div>

                     <Form.Group className="mb-3">
                        {/* <Form.Label>First name</Form.Label> */}
                        <input
                           className="form-control"
                           type="email"
                           name="newemail"
                           placeholder="Email"
                           value={newemail}
                           onChange={(e) => onInputChange(e)}
                        />
                     </Form.Group>

                     {/* role */}
                     {/* <Form.Label>User type</Form.Label> */}
                     <select
                        className="form-select mb-3"
                        name="newrole"
                        value={newrole}
                        onChange={(e) => onInputChange(e)}
                     >
                        <option disabled selected>
                           Position
                        </option>
                        <option name="Member" value="Member">
                           Member
                        </option>

                        <option name="President" value="President">
                           President
                        </option>
                        <option name="Secretary" value="Secretary">
                           Secretary
                        </option>
                        <option name="Finance" value="Finance">
                           Finance
                        </option>
                     </select>

                     {/* chapter */}
                     {/* <Form.Label>Chapter</Form.Label> */}
                     <select
                        className="form-select mb-4"
                        name="newchapter"
                        value={newchapter}
                        onChange={(e) => onInputChange(e)}
                     >
                        <option disabled>Select chapter</option>
                        <option value="Zamboanga City West">
                           Zamboanga City West
                        </option>
                        <option value="Zamboanga City North">
                           Zamboanga City North
                        </option>
                        <option value="Zamboanga City East">
                           Zamboanga City East
                        </option>
                        <option value="Metro Zamboanga">Metro Zamboanga</option>
                        <option value="Western Mindanao State University (WMSU)">
                           Western Mindanao State University (WMSU)
                        </option>
                        <option value="Universidad De Zamboanga - CES">
                           Universidad De Zamboanga - CES
                        </option>
                        <option value="Colosa Community">
                           Colosa Community
                        </option>
                        <option value="Southern City Colleges">
                           Southern City Colleges
                        </option>
                     </select>

                     <Form.Group className="mb-3">
                        <Form.Label>Date started</Form.Label>
                        <input
                           className="form-control"
                           type="date"
                           name="date_started"
                           value={date_started}
                           onChange={(e) => onInputChange(e)}
                        />
                     </Form.Group>
                  </Container>
               </Form>
            </Modal.Body>
            <Modal.Footer className="me-4">
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>

               <Button
                  variant="outline-success"
                  onClick={() => {
                     updateAccount(newmember_id);
                  }}
               >
                  Save changes
               </Button>
            </Modal.Footer>
         </Modal>

         <div className="row"></div>
      </>
   );
}

export default Accounts;
