import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import Swal from 'sweetalert2';

const PresEvents = () => {
   const [event, setEvent] = useState([]);

   const [newData, setNewData] = useState({
      newid: '',
      newtitle: '',
      newstart: '',
      newstatus: '',
   });

   //MODAL
   const [show, setShow] = useState(false);

   const handleClose = () => {
      setShow(false);
   };

   const handleShow = () => setShow(true);

   useEffect(() => {
      Axios.get('http://localhost:5000/events/sect/all')
         .then((response) => {
            if (response) {
               setEvent(response.data);
            }
         })
         .catch((error) => console.log(error));
   }, []);

   //GET EVENT
   const getData = (id) => {
      Axios.get(`http://localhost:5000/events/getData/${id}`).then(
         (response) => {
            setNewData({
               newid: response.data[0].id,
               newtitle: response.data[0].title,
               newstart: response.data[0].start,
               newstatus: response.data[0].status,
            });
         }
      );
   };

   const { newid, newtitle, newstart, newstatus } = newData;

   const onInputChange = (e) => {
      setNewData({ ...newData, [e.target.name]: e.target.value });
   };

   //CANCEL EVENT
   const cancelEvent = (id) => {
      Swal.fire({
         title: `Are you sure you want to cancel this event?`,
         showDenyButton: true,

         confirmButtonText: 'Yes',
         denyButtonText: `No`,
      }).then((result) => {
         /* Read more about isConfirmed, isDenied below */
         if (result.isConfirmed) {
            Axios.get(`http://localhost:5000/events/cancel_event/${id}`).then(
               (response) => {
                  if (response.data.message === 'success') {
                     Swal.fire({
                        title: 'Event cancelled!',
                        icon: 'success',
                     });
                     handleClose(true);
                  } else if (response.data.message === 'today') {
                     Swal.fire({
                        title: 'Error!',
                        text: "Today's event cannot be cancelled",
                        icon: 'warning',
                        confirmButtonText: 'Okay',
                     });
                  } else {
                     Swal.fire({
                        title: 'Error!',
                        text: 'Event cannot be cancelled',
                        icon: 'error',
                        confirmButtonText: 'Okay',
                     });
                  }
               }
            );
         } else {
            if (result.isDenied) {
               Swal.fire('No action ', '', 'info');
            }
         }
      });
   };

   return (
      <div>
         <div className="container my-5">
            <h5 className="text-pink">List of Events</h5>
            <div className="mt-4 container shadow-sm p-5 rounded">
               <Table striped>
                  <thead className="text-center">
                     <th>Event Name</th>
                     <th>Event Date/Time</th>
                     <th>Status</th>
                     <th>Action</th>
                  </thead>
                  <tbody>
                     {event.map((row) => {
                        return (
                           <tr className="text-center">
                              <td>{row.title}</td>
                              <td>{row.start}</td>
                              <td>
                                 {row.status === 'cancelled' ? (
                                    <span className="badge pill badge bg-danger">
                                       {row.status}
                                    </span>
                                 ) : (
                                    <span className="badge pill badge bg-info">
                                       {row.status}
                                    </span>
                                 )}
                              </td>
                              <td>
                                 <Button
                                    variant="white"
                                    onClick={() => {
                                       getData(row.id);
                                       handleShow();
                                    }}
                                    data-tip
                                    data-for="view"
                                    className="text-success"
                                 >
                                    <AiIcons.AiFillEye />
                                 </Button>

                                 <Link
                                    to="/sect/attendance"
                                    className=" text-dark"
                                    data-tip
                                    data-for="check"
                                 >
                                    <AiIcons.AiFillCalendar />
                                 </Link>

                                 <Button
                                    variant="white"
                                    onClick={() => {
                                       cancelEvent(row.id);
                                    }}
                                    data-tip
                                    data-for="cancel"
                                 >
                                    <AiIcons.AiOutlineStop className="text-danger" />
                                 </Button>

                                 {/* view event */}
                                 <ReactTooltip
                                    id="view"
                                    place="top"
                                    effect="solid"
                                 >
                                    View event
                                 </ReactTooltip>

                                 {/* Cancel event */}
                                 <ReactTooltip
                                    id="cancel"
                                    place="right"
                                    effect="solid"
                                 >
                                    Cancel Event
                                 </ReactTooltip>

                                 {/* Check Attendance */}
                                 <ReactTooltip
                                    id="check"
                                    place="top"
                                    effect="solid"
                                 >
                                    Check Attendance
                                 </ReactTooltip>
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </Table>
            </div>
         </div>

         <Modal
            size="lg"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
         >
            <Modal.Header>View</Modal.Header>

            <Modal.Body>
               <Form>
                  <Form.Group className="mb-3">
                     <input
                        className="form-control"
                        type="text"
                        name="title"
                        value={newtitle}
                        onChange={(e) => onInputChange(e)}
                        required
                     />
                  </Form.Group>
               </Form>
            </Modal.Body>

            <Modal.Footer>
               <Button variant="danger" onClick={handleClose}>
                  Close
               </Button>
            </Modal.Footer>
         </Modal>
      </div>
   );
};

export default PresEvents;
