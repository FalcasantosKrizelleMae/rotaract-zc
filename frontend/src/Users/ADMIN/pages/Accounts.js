import React, { useState, useEffect } from 'react';
import Navbar from '../components/Sidebar';
import { Form, Button, Container, Table, Modal } from 'react-bootstrap';
import Axios from 'axios';
import Swal from 'sweetalert2';
import '../css/main.css';
import * as BiIcons from 'react-icons/bi';
import { useForm } from 'react-hook-form';

function Accounts() {
   const [member_id, setMember_id] = useState(0);
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [role, setRole] = useState('');
   const [chapter, setChapter] = useState('');
   const [list, setList] = useState([]);
   const [dataList, setNewDataList] = useState({
      newmember_id: '',
      newfirstName: '',
      newlastName: '',
      newrole: '',
      newchapter: '',
   });

   const { newmember_id, newfirstname, newlastname, newrole, newchapter } =
      dataList;

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
            newrole: result.data[0].role,
            newchapter: result.data[0].chapter,
         });
      });
   };

   const handleShow = () => setShow(true);

   const { handleSubmit } = useForm();

   const onSubmit = (data) => {
      Axios.post('http://localhost:5000/admin/add_account', {
         member_id: member_id,
         firstName: firstName,
         lastName: lastName,
         role: role,
         chapter: chapter,
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
   const deleteAccount = (id, name) => {
      Swal.fire({
         title: `Remove MEMBER ${name}
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
                     `You just removed ${id}
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
         <div className="main">
            <div className="container-fluid bg-pink p-3  rounded">
               <h5 className="m-0 text-white">ACCOUNTS</h5>
            </div>
            <div className="col-sm-7 p-5 mt-5 bg-light shadow-sm">
               <h5 className="ms-3 mb-4">ADD NEW USER</h5>
               <div className="col-sm">
                  <Form onSubmit={handleSubmit(onSubmit)} id="add-account-form">
                     <Container className="">
                        {/* Member id */}
                        <Form.Group className="mb-3">
                           {/* <Form.Label>Member ID</Form.Label> */}
                           <input
                              className="form-control"
                              type="tel"
                              name="member_id"
                              placeholder="Member ID"
                              onChange={(e) => setMember_id(e.target.value)}
                              maxLength="5"
                              pattern="[0-9]{5}"
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
                                 placeholder="Last Name"
                                 onChange={(e) => setLastName(e.target.value)}
                                 required
                              />
                           </Form.Group>
                        </div>
                        {/* role */}

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

                        <div className="d-flex justify-content-end ">
                           <Button variant="outline-danger" onClick={clear}>
                              Clear
                           </Button>
                           &nbsp; &nbsp;
                           <input
                              type="submit"
                              className="btn btn-outline-primary"
                              value=" Add new account"
                           />
                        </div>
                     </Container>
                  </Form>
               </div>

               {/* right column */}
               <div className="col-sm"></div>
            </div>

            <div className=" mt-5 bg-light p-5 col">
               <h5 className="text-uppercase mb-4">List of Users</h5>
               <Table responsive="lg">
                  <thead height="60" className="bg-secondary text-white">
                     <tr>
                        <th>Member ID</th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Chapter</th>

                        <th className="text-center">Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {list.map((val) => {
                        return (
                           <tr>
                              <td>{val.member_id}</td>
                              <td>{val.first_name + ' ' + val.last_name}</td>
                              <td>{val.role}</td>
                              <td>{val.chapter}</td>

                              <td className="text-center">
                                 <Button
                                    variant="outline-primary"
                                    onClick={() => {
                                       handleShow();
                                       getData(val.member_id, val.first_name);
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
                     })}
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
