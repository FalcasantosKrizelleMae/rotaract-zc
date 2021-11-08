import { Form, Button, Container } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Register() {
   useEffect(() => {
      if (localStorage.getItem('user-info')) {
         history.push('/member');
      }
   });

   const [member_id, setMember_id] = useState('');
   const [password, setPassword] = useState('');
   const [role, setRole] = useState('');
   const history = useHistory();

   const signUp = () => {
      Axios.post('http://localhost:5000/auth/api/register', {
         member_id: member_id,
         password: password,
         role: role,
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

   return (
      <div className="p-5">
         <Link to="/" className="btn btn-primary">
            Back
         </Link>
         <Form className="p-5">
            <Container>
               <Form.Group className="mb-3">
                  <Form.Label>Member ID</Form.Label>
                  <Form.Control
                     type="text"
                     name="member_id"
                     onChange={(e) => setMember_id(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                     <small>
                        We'll never share your email with anyone else.
                     </small>
                  </Form.Text>
               </Form.Group>

               <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                     tye="password"
                     name="password"
                     onChange={(e) => setPassword(e.target.value)}
                  />
               </Form.Group>

               <Form.Label>User type</Form.Label>
               <select
                  className="form-select mb-5"
                  name="role"
                  onChange={(e) => setRole(e.target.value)}
               >
                  <option disabled>Select type of user</option>
                  <option name="member" value="member">
                     member
                  </option>
                  <option name="admin" value="admin">
                     admin
                  </option>
                  <option name="president" value="president">
                     president
                  </option>
                  <option naem="secretary" value="secretary">
                     secretary
                  </option>
                  <option name="finance" value="finance">
                     finance
                  </option>
               </select>

               <Button variant="primary" onClick={signUp}>
                  Submit
               </Button>
            </Container>
         </Form>
      </div>
   );
}

export default Register;
