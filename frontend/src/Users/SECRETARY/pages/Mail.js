import React, { useState, useRef } from 'react';
import { PageHeader, Button } from 'antd';
import Axios from 'axios';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';

const Mail = () => {
   let history = useHistory();
   const [email, setEmail] = useState('');
   const [description, setDescription] = useState('');
   const [file, setFile] = useState();

   const sendmail = () => {
      Axios.post(`http://localhost:5000/reports/send-mail`, {
         email: email,
         description: description,
         file: __dirname + file.name,
      }).then((response) => {
         console.log(response);
      });
   };
   return (
      <div className="container mt-4 col-lg-6">
         <PageHeader
            className="site-page-header col-lg-10"
            onBack={() => history.goBack()}
            title="Send mail"
         />{' '}
         <div className="container mt-5 shadow-sm p-5">
            <Form>
               <Form.Group className="mb-5" controlId="formBasicEmail">
                  <Form.Label>Recipient address</Form.Label>
                  <Form.Control
                     type="email"
                     placeholder="Enter email"
                     onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Text className="text-muted">Email address</Form.Text>
               </Form.Group>

               <Form.Group
                  className="mb-5"
                  controlId="exampleForm.ControlTextarea1"
               >
                  <Form.Label>Example textarea</Form.Label>
                  <Form.Control
                     as="textarea"
                     rows={3}
                     onChange={(e) => setDescription(e.target.value)}
                  />
               </Form.Group>

               <Form.Group controlId="formFileMultiple" className="mb-5">
                  <Form.Label>Upload file</Form.Label>
                  <Form.Control
                     type="file"
                     onChange={(e) => setFile(e.target.files[0])}
                  />
               </Form.Group>

               <Button
                  shape="round"
                  icon={
                     <>
                        <AiIcons.AiOutlineSend />{' '}
                     </>
                  }
                  size="large"
                  className="mt-4"
                  onClick={sendmail}
               >
                  Submit
               </Button>
            </Form>
         </div>
      </div>
   );
};

export default Mail;
