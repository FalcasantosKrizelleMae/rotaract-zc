import React, { useState, useEffect } from 'react';

import { Form, Button, Container, Table, Modal } from 'react-bootstrap';
import Axios from 'axios';
import Swal from 'sweetalert2';
import * as BiIcons from 'react-icons/bi';
import moment from 'moment';

// import { Avatar, Image } from 'antd';
import Navbar from '../components/Navbar';
import { useForm } from 'react-hook-form';
import QrCode from 'qrcode';

const Accounts = () => {
   const [list, setList] = useState([]);
   const chapter = localStorage.getItem('chapter');
   const [qrcode, setQrcode] = useState('');

   const [dataList, setNewDataList] = useState({
      newmember_id: '',
      newfirstName: '',
      newlastName: '',
      newemail: '',
      newrole: '',
      newchapter: '',
   });

   const { handleSubmit } = useForm();
   const handleShow = () => setShow(true);
   const handleShowModal = () => setShowModal(true);
   const [show, setShow] = useState(false);
   const [showModal, setShowModal] = useState(false);

   const [member_id, setMember_id] = useState(0);
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [role, setRole] = useState('');
   const [email, setEmail] = useState('');
   const [date_joined, setDateJoined] = useState('');

   const handleClose = () => {
      setShow(false);
      setShowModal(false);
   };

   const onInputChange = (e) => {
      setNewDataList({ ...dataList, [e.target.name]: e.target.value });
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

   const generateQrCode = async () => {
      try {
         const response = await QrCode.toDataURL(member_id);
         setQrcode(response);
      } catch (error) {
         console.log(error);
      }
   };
   //insert member
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

   //Display all data
   useEffect(() => {
      Axios.get(`http://localhost:5000/admin/list/${chapter}`).then(
         (response) => {
            if (response) {
               setList(response.data);
            }
         }
      );
   });

   const getData = (id) => {
      Axios.get(`http://localhost:5000/admin/getData/${id}`).then((result) => {
         setNewDataList({
            newmember_id: result.data[0].member_id,
            newfirstname: result.data[0].first_name,
            newlastname: result.data[0].last_name,
            newemail: result.data[0].email,
            newrole: result.data[0].role,
            newchapter: result.data[0].chapter,
            date_started: result.data[0].date_started,
         });
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

   function clear(e) {
      document.getElementById('add-account-form').reset();
   }

   return (
      <>
         <Navbar />
         <div className="main mx-5">
            <div className="shadow p-5 rounded">
               <div className="row">
                  <div className="col-sm">
                     {' '}
                     <div className="text-pink mb-4 ">
                        <div className="fs-4">List of Members</div>
                        <p>{chapter}</p>
                     </div>
                  </div>

                  <div className="col-sm">
                     <Button
                        className="float-end"
                        variant="outline-dark"
                        onClick={handleShowModal}
                     >
                        + Add new member
                     </Button>
                  </div>
               </div>
               <Table responsive="lg" className="border">
                  <thead height="60" className="bg-pink text-white">
                     <tr>
                        <th>Member ID</th>
                        <th>Name</th>
                        <th>Date started</th>
                        <th>Email</th>
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
                              <tr className="">
                                 <td>{val.member_id}</td>
                                 <td>{val.first_name + ' ' + val.last_name}</td>
                                 <td>
                                    {moment(val.date_started).format('ll')}
                                 </td>
                                 <td>{val.email}</td>

                                 <td>{val.role}</td>
                                 <td>{val.chapter}</td>

                                 <td className="text-center">
                                    {val.role === 'Secretary' ||
                                    val.role === 'President' ||
                                    val.role === 'Finance' ? (
                                       '--'
                                    ) : (
                                       <Button
                                          variant="btn-white text-primary"
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
                                    )}
                                    &nbsp;
                                 </td>
                              </tr>
                           );
                        })
                     )}
                  </tbody>
               </Table>
            </div>

            {/* //UPDATE MODAL */}
            <Modal
               size="lg"
               show={showModal}
               onHide={handleClose}
               backdrop="static"
               keyboard={false}
            >
               <Modal.Header closeButton>
                  <Modal.Title className="ms-4">Add member</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Form
                     onSubmit={handleSubmit(onSubmit)}
                     id="add-account-form"
                     className="mx-4  my-3"
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
                        value={chapter}
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
               </Modal.Body>
            </Modal>

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
                           <option value="Metro Zamboanga">
                              Metro Zamboanga
                           </option>
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
                              value={moment(date_started).format()}
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
         </div>
      </>
   );
};

export default Accounts;
