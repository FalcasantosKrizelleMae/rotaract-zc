import React, { useState, useEffect } from 'react';
import QrCode from 'qrcode';
import { Button, Table, Form } from 'react-bootstrap';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { Avatar, Image } from 'antd';

function Qrcode() {
   const [member_id, setMember_id] = useState(0);
   const [qrcode, setQrcode] = useState('');

   const generateQrCode = async () => {
      try {
         const response = await QrCode.toDataURL(member_id);
         setQrcode(response);
      } catch (error) {
         console.log(error);
      }
   };

   const [list, setList] = useState([]);

   const onSubmit = (data) => {
      Axios.post('http://localhost:5000/auth/insert_qr', {
         member_id: member_id,
         qrcode: qrcode,
      }).then((response) => {
         if (response.data.message === 'success') {
            Swal.fire({
               title: 'Member Registered!',
               icon: 'success',
            });
         } else {
            Swal.fire({
               title: 'Error!',
               text: { response },
               icon: 'error',
               confirmButtonText: 'Okay',
            });
         }
      });
   };

   //Display all data
   useEffect(() => {
      Axios.get('http://localhost:5000/auth/list').then((response) => {
         if (response) {
            setList(response.data);
         }
      });
   });

   const { handleSubmit } = useForm();
   return (
      <div className="container col-lg-5 mt-5">
         QR CODE generator
         <div className="container">
            <Form onSubmit={handleSubmit(onSubmit)}>
               <input
                  type="tel"
                  pattern="[0-9]{6}"
                  minLength="6"
                  onChange={(e) => setMember_id(e.target.value)}
               />

               <Button
                  type="submit"
                  variant="primary"
                  onClick={() => {
                     generateQrCode();
                  }}
               >
                  Generate
               </Button>
            </Form>

            <br />

            {qrcode ? (
               <a href={qrcode} download>
                  <img src={qrcode} alt="" />
               </a>
            ) : null}
         </div>
         <Table responsive="lg">
            <thead height="60" className="bg-pink text-white">
               <tr>
                  <th>Member ID</th>
                  <th>QR CODE</th>
                  <th>Status</th>
               </tr>
            </thead>
            <tbody>
               {list.map((val) => {
                  return (
                     <tr>
                        <td>{val.id}</td>
                        <td>
                           <Avatar
                              className="bg-white"
                              size={70}
                              shape="square"
                              src={<Image src={val.img} />}
                           ></Avatar>
                        </td>
                        <td>{val.status}</td>
                     </tr>
                  );
               })}
            </tbody>
         </Table>
      </div>
   );
}

export default Qrcode;
