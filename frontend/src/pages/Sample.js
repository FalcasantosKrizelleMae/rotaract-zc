import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import Axios from 'axios';

function Sample() {
   const [first_name, setFirst_name] = useState('');
   const [last_name, setLast_name] = useState('');
   const [chapter, setChapter] = useState('');
   const [memberList, setMemberList] = useState([]);

   //Display all data
   useEffect(() => {
      Axios.get('http://localhost:5000/api/list').then((response) => {
         setMemberList(response.data);
      });
   }, []);

   //Insert to database
   const insert_member = () => {
      Axios.post('http://localhost:5000/api/member', {
         first_name: first_name,
         last_name: last_name,
         chapter: chapter,
      });

      //Interactive data display
      setMemberList([
         ...memberList,
         {
            first_name: first_name,
            last_name: last_name,
            chapter: chapter,
         },
      ]);
   };

   const delete_member = (member_id) => {
      Axios.delete(`http://localhost:5000/api/delete./${member_id}`);
   };

   return (
      <div className="row">
         <div className="mt-5 col-sm">
            <Form className="p-5 border rounded">
               <Form.Group className="mb-2">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                     type="text"
                     name="first_name"
                     onChange={(e) => {
                        setFirst_name(e.target.value);
                     }}
                  />
               </Form.Group>

               <Form.Group className="mb-2">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                     type="text"
                     name="last_name"
                     onChange={(e) => {
                        setLast_name(e.target.value);
                     }}
                  />
               </Form.Group>

               <Form.Group className="mb-3">
                  <Form.Label>Chapter</Form.Label>
                  <Form.Control
                     tye="text"
                     name="chapter"
                     onChange={(e) => {
                        setChapter(e.target.value);
                     }}
                  />
               </Form.Group>

               <Button variant="primary" onClick={insert_member}>
                  Submit
               </Button>
            </Form>
         </div>

         <div className="mt-5 col-sm-6">
            <Table striped bordered hover responsive>
               <thead>
                  <tr>
                     <th>Name</th>

                     <th>Chapter</th>
                     <th className="text-center">Action</th>
                  </tr>
               </thead>
               <tbody>
                  {memberList.map((val) => {
                     return (
                        <tr>
                           <td>{val.first_name + ' ' + val.last_name}</td>

                           <td>{val.chapter}</td>
                           <td className="text-center">
                              <Button variant="warning">Edit</Button> &nbsp;
                              <Button variant="danger" onClick={delete_member}>
                                 Remove
                              </Button>
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </Table>
         </div>
      </div>
   );
}

export default Sample;
