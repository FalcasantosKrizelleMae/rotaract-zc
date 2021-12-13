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

   return (
      <>
         <Navbar />
         <div className="main mx-5">
            <div className="shadow p-5 rounded">
               <div className="row mb-3">
                  <div className="col-sm">
                     {' '}
                     <div className="text-pink mb-3">
                        <div className="fs-4">List of Members</div>
                     </div>
                  </div>

                  <div className="col-sm-3">
                     {' '}
                     <h6>{chapter}</h6>
                  </div>
               </div>
               <Table responsive="lg" className="">
                  <thead height="60" className="bg-pink text-white">
                     <tr>
                        <th>Member ID</th>
                        <th>Name</th>
                        <th>Date started</th>
                        <th>Email</th>
                        <th>Position</th>
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
                              </tr>
                           );
                        })
                     )}
                  </tbody>
               </Table>
            </div>
         </div>
      </>
   );
};

export default Accounts;
