import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import listPlugin from '@fullcalendar/list';
import Axios from 'axios';
import dateFormat from 'dateformat';
import * as BiIcons from 'react-icons/bi';
import * as AiIcons from 'react-icons/ai';
import ReactTooltip from 'react-tooltip';
import { Modal, Button, Form, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';

function Dashboard() {
   const chapter = localStorage.getItem('chapter');

   const [event, setEvent] = useState([]);
   const [cancelled, setCancelled] = useState([]);
   const [code, setCode] = useState();

   const [show, setShow] = useState(false);

   const [title, setTitle] = useState();
   const [start, setStart] = useState();
   const [end, setEnd] = useState();
   const [description, setDescription] = useState();

   useForm();

   const handleClose = () => {
      setShow(false);
   };
   const handleShow = () => setShow(true);

   //CLEAR FORM
   function clear(e) {
      document.getElementById('add-event-form').reset();
   }

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

   //DELTE EVENT
   const deleteEvent = (id) => {
      Swal.fire({
         title: `Are you sure you want to delete this event?`,
         showDenyButton: true,

         confirmButtonText: 'Yes',
         denyButtonText: `Cancel`,
      })
         .then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
               Axios.delete(
                  `http://localhost:5000/events/delete_event/${id}`
               ).then((response) => {
                  if (response.data.message === 'success') {
                     Swal.fire(`Event successfully deleted`, '', 'success');
                     window.location.reload(true);
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
         })
         .then(() => {
            setEvent([...event]);
         });
   };

   useEffect(() => {
      Axios.get(`http://localhost:5000/events/${chapter}`).then((response) => {
         if (response) {
            setEvent(response.data);
         }
      });
   }, [chapter]);

   useEffect(() => {
      Axios.get(`http://localhost:5000/sect/cancelled/${chapter}`).then(
         (response) => {
            if (response) {
               setCancelled(response.data);
            }
         }
      );
   }, [chapter]);

   return (
      <div>
         <Navbar />
         <div className="main mx-5">
            <div className="container-fluid bg-pink p-4 mb-4 px-5 rounded">
               <div className="row t">
                  <div className="col-sm ">
                     <h3 className="m-0 text-white">EVENTS</h3>
                  </div>

                  <div className="col-sm text-right ">
                     <h5 className="text-white text-uppercase">{chapter}</h5>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-lg">
                  <div className=" bg-white shadow p-5  rounded ">
                     <div className="row">
                        <div className="col-sm">
                           <h4 className="mb-5 text-pink">
                              <AiIcons.AiFillEnvironment />
                              &nbsp; List of Events
                           </h4>
                        </div>
                        <div className="col-sm">
                           <Button
                              variant="outline-primary"
                              onClick={() => {
                                 handleShow();
                              }}
                              className="col-sm-5 float-end"
                           >
                              + Add new event
                           </Button>
                        </div>
                     </div>

                     <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
                        headerToolbar={{
                           left: 'prev,next today',
                           center: 'title',
                           right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek',
                        }}
                        initialView="dayGridMonth"
                        weekends={true}
                        height={800}
                        events={event}
                     />
                  </div>
               </div>
               <div className="col-lg-4">
                  <div className=" bg-white shadow-sm rounded">
                     <div className="">
                        <div className="row px-4 py-3 fs-5 ">
                           <div className="d-flex align-items-center  ">
                              Upcoming Events
                           </div>
                        </div>

                        <hr className="my-0" />
                        {event.length === 0 ? (
                           <h6 className="text-pink p-4 bg-light">
                              No upcoming events
                           </h6>
                        ) : (
                           event.map((val) => {
                              return (
                                 <div className=" pb-1 mx-4">
                                    <ul className="container bg-light px-4 pb-1 shadow-sm  py-4 mt-3">
                                       <h5 className=" text-pink text-uppercase">
                                          {val.title}{' '}
                                          <button
                                             className="btn float-end"
                                             data-tip
                                             data-for="updateEvent"
                                          >
                                             <BiIcons.BiEditAlt />
                                          </button>
                                          {/* Update */}
                                       </h5>
                                       <ReactTooltip
                                          id="updateEvent"
                                          place="top"
                                          effect="solid"
                                       >
                                          Update event
                                       </ReactTooltip>
                                       <small className="text-dark">
                                          {dateFormat(
                                             val.start,
                                             'ddd, mmmm dS, yyyy, h:MM TT'
                                          )}
                                       </small>
                                       <br />
                                       <br />
                                       {/* badge */}
                                       <p className="text-dark">
                                          EVENT CODE:
                                          <button
                                             className="btn btn-outline-danger float-end"
                                             onClick={() => {
                                                cancelEvent(val.event_id);
                                             }}
                                          >
                                             Cancel Event
                                          </button>
                                          <div className="text-pink">
                                             {val.event_code}
                                          </div>
                                       </p>{' '}
                                    </ul>
                                 </div>
                              );
                           })
                        )}
                     </div>
                  </div>
                  {/* CANCELLED */}
                  <div className="mt-5 bg-white shadow-sm rounded">
                     <div className="">
                        <div className="row px-4 py-3 fs-5 ">
                           <div className="col-sm ">Cancelled events</div>
                        </div>

                        <hr className="mt-0" />
                        {cancelled.length === 0 ? (
                           <h6 className="text-pink p-4 bg-light">
                              No cancelled events
                           </h6>
                        ) : (
                           cancelled.map((val) => {
                              return (
                                 <div className="  pb-1 mx-4">
                                    <ul className="container bg-light rounded px-4 pb-1 shadow-sm  py-4 ">
                                       <h5 className=" text-dark text-uppercase">
                                          {val.title}
                                          <button
                                             className="btn float-end"
                                             onClick={() => {
                                                deleteEvent(val.event_id);
                                             }}
                                             data-tip
                                             data-for="deleteEvent"
                                          >
                                             <BiIcons.BiTrash className="text-danger" />
                                          </button>
                                          {/* Update */}
                                          <ReactTooltip
                                             id="updateEvent"
                                             place="top"
                                             effect="solid"
                                          >
                                             Update event
                                          </ReactTooltip>
                                          <ReactTooltip
                                             id="deleteEvent"
                                             place="top"
                                             effect="solid"
                                          >
                                             Delete event
                                          </ReactTooltip>
                                       </h5>
                                       <small className="text-dark">
                                          {dateFormat(
                                             val.start,
                                             'ddd, mmmm dS, yyyy, h:MM TT'
                                          )}
                                       </small>
                                       <br />
                                       <span class="badge rounded-pill bg-danger mb-3">
                                          Cancelled
                                       </span>
                                       {/* badge */}
                                    </ul>
                                 </div>
                              );
                           })
                        )}
                     </div>
                  </div>
               </div>
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
}

export default Dashboard;