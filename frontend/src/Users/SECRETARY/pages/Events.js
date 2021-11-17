import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Container } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import Axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import dateFormat from 'dateformat';
import Navbar from '../components/Navbar';

const SectEvent = () => {
   const chapter = localStorage.getItem('chapter');
   const [event, setEvent] = useState([]);
   let history = useHistory();

   const [show, setShow] = useState(false);

   const [title, setTitle] = useState();
   const [start, setStart] = useState();
   const [end, setEnd] = useState();
   const [description, setDescription] = useState();
   const [code, setCode] = useState();
   useForm();

   const handleClose = () => {
      setShow(false);
   };
   const handleShow = () => setShow(true);

   //CLEAR FORM
   function clear(e) {
      document.getElementById('add-event-form').reset();
   }

   // const [newData, setNewData] = useState({
   //    newid: '',
   //    newtitle: '',
   //    newstart: '',
   //    newstatus: '',
   // });

   useEffect(() => {
      Axios.get(`http://localhost:5000/events/${chapter}`)
         .then((response) => {
            if (response) {
               setEvent(response.data);
            }
         })

         .catch((error) => console.log(error));
   });

   // //GET EVENT
   // const getData = (id) => {
   //    Axios.get(`http://localhost:5000/events/getData/${id}`).then(
   //       (response) => {
   //          setNewData({
   //             newid: response.data[0].id,
   //             newtitle: response.data[0].title,
   //             newstart: response.data[0].start,
   //             newstatus: response.data[0].status,
   //          });
   //       }
   //    );
   // };

   const { handleSubmit } = useForm();

   const onSubmit = (data) => {
      Axios.post('http://localhost:5000/events/add_event', {
         title: title,
         start: start,
         end: end,
         description: description,
         chapter: chapter,
         code: code,
      })
         .then((response) => {
            if (response.data.message === 'success') {
               Swal.fire({
                  title: 'Event Added',
                  icon: 'success',
               });
               clear();
               handleClose();
            } else if (response.data.message === 'exists') {
               Swal.fire({
                  title: 'Error!',
                  text: 'This day is is occupied',
                  icon: 'warning',
                  confirmButtonText: 'Okay',
               });
            } else {
               Swal.fire({
                  title: 'Error!',
                  text: 'Event not added',
                  icon: 'error',
                  confirmButtonText: 'Okay',
               });
            }
         })
         .then(() => {
            setEvent([
               ...event,
               {
                  title: title,
                  start: start,
                  end: end,
                  chapter: chapter,
               },
            ]);
         });
   };

   // const { newid, newtitle, newstart, newstatus } = newData;

   // const onInputChange = (e) => {
   //    setNewData({ ...newData, [e.target.name]: e.target.value });
   // };

   //CANCEL EVENT
   const cancelEvent = (id) => {
      Swal.fire({
         title: `Are you sure you want to cancel this event?`,
         showDenyButton: true,

         confirmButtonText: 'Yes',
         denyButtonText: `No`,
      }).then((result) => {
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
         <Navbar />
         <div className=" main mx-5">
            <div className="shadow p-5 rounded">
               <div className="row">
                  <div className="col-sm">
                     {' '}
                     <h3 className="text-pink mb-5">List of Events</h3>
                  </div>

                  <div className="col-sm">
                     <Button
                        className="float-end"
                        variant="outline-secondary"
                        onClick={handleShow}
                     >
                        + Add new event
                     </Button>
                  </div>
               </div>
               <Table borderless hover>
                  <thead className="text-center text-white bg-pink text-uppercase">
                     <td>Event Name</td>
                     <td>Event Date/Time</td>
                     <td>Status</td>
                     <td>Action</td>
                  </thead>
                  <tbody>
                     {event.map((row) => {
                        return (
                           <tr className="text-center border">
                              <td>{row.title}</td>
                              <td>
                                 {dateFormat(
                                    row.start,
                                    'ddd, mmmm dS, yyyy, h:MM TT'
                                 )}
                              </td>
                              <td>
                                 {row.status === 'cancelled' ? (
                                    <span className="badge pill badge bg-danger">
                                       {row.status}
                                    </span>
                                 ) : row.status === 'accepted' ? (
                                    <span className="badge pill badge bg-success">
                                       {row.status}
                                    </span>
                                 ) : (
                                    <span className="badge pill badge bg-secondary">
                                       {row.status}
                                    </span>
                                 )}
                              </td>

                              <td>
                                 {row.status === 'pending' ? (
                                    <>
                                       <Button
                                          variant="white"
                                          data-tip
                                          data-for="view"
                                          className="text-primary"
                                       >
                                          <AiIcons.AiFillEye />
                                       </Button>

                                       <Button
                                          variant="white"
                                          onClick={() => {
                                             cancelEvent(row.event_id);
                                          }}
                                          data-tip
                                          data-for="cancel"
                                       >
                                          <AiIcons.AiOutlineStop className="text-danger" />
                                       </Button>
                                    </>
                                 ) : row.status === 'accepted' ? (
                                    <>
                                       <Button
                                          variant="white"
                                          data-tip
                                          data-for="view"
                                          className="text-success"
                                       >
                                          <AiIcons.AiFillEye />
                                       </Button>

                                       <Button
                                          onClick={() =>
                                             history.push({
                                                pathname: `/sect/attendance/${row.event_id}`,
                                                state: {
                                                   event_id: row.event_id,
                                                   title: row.title,
                                                   chapter: chapter,
                                                   start: row.start,
                                                },
                                             })
                                          }
                                          type="link"
                                          className=" text-dark"
                                          variant="white"
                                          data-tip
                                          data-for="check"
                                       >
                                          <AiIcons.AiFillCalendar />
                                       </Button>

                                       <Button
                                          variant="white"
                                          onClick={() => {
                                             cancelEvent(row.event_id);
                                          }}
                                          data-tip
                                          data-for="cancel"
                                       >
                                          <AiIcons.AiOutlineStop className="text-danger" />
                                       </Button>
                                    </>
                                 ) : (
                                    <b>--</b>
                                 )}

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

         {/* MODAL add event*/}
         <Modal
            size="lg"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
         >
            <Form
               className=""
               onSubmit={handleSubmit(onSubmit)}
               id="add-event-form"
            >
               <Modal.Header className=" bg-pink text-white">
                  <Modal.Title className="ms-4">ADD NEW EVENT</Modal.Title>
               </Modal.Header>
               <Modal.Body className="m-3">
                  <Container className="">
                     <Form.Group className="mb-3">
                        {/* <Form.Label>Member ID</Form.Label> */}
                        <input
                           className="form-control"
                           type="text"
                           name="title"
                           placeholder="Event title"
                           onChange={(e) => setTitle(e.target.value)}
                           required
                        />
                     </Form.Group>
                     {/* datetime */}
                     <div className="row">
                        <Form.Group className="mb-3 col-sm">
                           <Form.Label>Start date and time</Form.Label>
                           <input
                              type="datetime-local"
                              className="form-control"
                              name="start"
                              onChange={(e) => setStart(e.target.value)}
                              required
                           />
                        </Form.Group>

                        {/* end date */}
                        <Form.Group className="mb-4 col-sm">
                           <Form.Label>End date and time</Form.Label>
                           <input
                              type="datetime-local"
                              className="form-control"
                              name="end"
                              onChange={(e) => setEnd(e.target.value)}
                              required
                           />
                        </Form.Group>
                        {/*desc */}
                        <Form.Group className="mb-4">
                           <Form.Control
                              as="textarea"
                              name="description"
                              placeholder="Event description"
                              rows={2}
                              onChange={(e) => setDescription(e.target.value)}
                              required
                           />
                        </Form.Group>
                     </div>
                     <Form.Group className="mb-3">
                        {/* chapter */}
                        <input
                           className="form-select mb-4"
                           name="chapter"
                           defaultValue={chapter}
                        />
                     </Form.Group>
                     <Form.Group className="mb-3">
                        {/* event */}
                        <input
                           className="form-control"
                           type="text"
                           name="code"
                           placeholder="Event code"
                           onChange={(e) => setCode(e.target.value)}
                           required
                        />
                     </Form.Group>
                  </Container>
               </Modal.Body>
               <Modal.Footer className="px-5">
                  <Button
                     variant="secondary"
                     className="me-auto"
                     onClick={handleClose}
                  >
                     Close
                  </Button>
                  <Button variant="outline-danger" onClick={clear}>
                     Clear
                  </Button>

                  <input
                     type="submit"
                     className="btn btn-outline-success"
                     value="Add new event"
                  />
               </Modal.Footer>
            </Form>
         </Modal>
      </div>
   );
};

export default SectEvent;
