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

function Events() {
   const [event, setEvent] = useState([]);
   const [cancelled, setCancelled] = useState([]);
   const [show, setShow] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [chapter, setChapter] = useState('all');
   const [title, setTitle] = useState('N/A');
   const [start, setStart] = useState('N/A');
   const [end, setEnd] = useState('N/A');
   const [description, setDescription] = useState('N/A');
   const [type, setType] = useState('virtual');

   const [platform, setPlatform] = useState('N/A');
   const [link, setLink] = useState('N/A');
   const [email, setEmail] = useState('N/A');
   const [host, setHost] = useState('N/A');
   const [venue, setVenue] = useState('N/A');
   const [source, setSource] = useState('N/A');
   const [total, setTotal] = useState('N/A');
   const [chairperson, setChairperson] = useState('N/A');
   const [preparedby, setPreparedby] = useState('N/A');

   useForm();

   const handleClose = () => {
      setShow(false);
   };
   const handleShow = () => setShow(true);

   const handleShowModal = () => setShowModal(true);

   //CLEAR FORM
   function clear(e) {
      document.getElementById('add-event-form').reset();
   }

   const { handleSubmit } = useForm();

   const onSubmit = (data) => {
      Axios.post('http://localhost:5000/events/add_event-admin', {
         title: title,
         start: start,
         end: end,
         description: description,
         type: type,
         platform: platform,
         link: link,
         host: host,
         venue: venue,
         source: source,
         total: total,
         email: email,
         chairperson: chairperson,
         preparedby: preparedby,
         chapter: chapter,
      })
         .then((response) => {
            if (response.data.message === 'success') {
               Swal.fire({
                  title: 'Event Added',
                  icon: 'success',
               });
               clear();
               handleClose();
               window.location.reload(true);
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
            setEvent([...event]);
         });
   };

   //CANCEL EVENT
   const cancelEvent = (id) => {
      Swal.fire({
         title: `Are you sure you want to cancel this event?`,
         showDenyButton: true,

         confirmButtonText: 'Yes',
         denyButtonText: `No`,
      })
         .then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
               Axios.get(
                  `http://localhost:5000/events/cancel_event/${id}`
               ).then((response) => {
                  if (response.data.message === 'success') {
                     Swal.fire({
                        title: 'Event cancelled!',
                        icon: 'success',
                     });
                     handleClose(true);
                     window.location.reload(true);
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
               });
            } else {
               if (result.isDenied) {
                  Swal.fire('No action ', '', 'info');
               }
            }
         })
         .then(() => {
            setCancelled([...cancelled]);
         });
   };

   //DELTE EVENT
   const deleteEvent = (id) => {
      Swal.fire({
         title: `Are you sure you want to delete this event?`,
         showDenyButton: true,

         confirmButtonText: 'Yes',
         denyButtonText: `Cancel`,
      }).then((result) => {
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
      });
   };

   // const [dataList, setNewDataList] = useState({
   //    newid: '',
   //    newtitle: '',
   //    newstart: '',
   //    newend: '',
   //    newdescription: '',
   //    newchapter: '',
   // });

   // const { newid, newtitle, newstart, newend, newdescription, newchapter } =
   //    dataList;

   // const onInputChange = (e) => {
   //    setNewDataList({ ...dataList, [e.target.name]: e.target.value });
   // };

   // const updateEvent = () => {};

   // const getData = (id) => {
   //    Axios.get(`http://localhost:5000/events/getData/${id}`).then(
   //       (response) => {
   //          setNewDataList({
   //             newid: response.data[0].event_id,
   //             newtitle: response.data[0].title,
   //             newstart: response.data[0].start,
   //             newend: response.data[0].end,
   //             newdescription: response.data[0].description,
   //             newchapter: response.data[0].chapter,
   //          });
   //       }
   //    );
   // };

   useEffect(() => {
      Axios.get('http://localhost:5000/events/all').then((response) => {
         if (response) {
            setEvent(response.data);
         }
      });
   }, []);

   useEffect(() => {
      Axios.get('http://localhost:5000/events/cancelled').then((response) => {
         if (response) {
            setCancelled(response.data);
         }
      });
   }, []);

   return (
      <div>
         <Navbar />
         <div className="main mx-5">
            <div className="bg-pink p-3 rounded fs-3 text-white ps-4 mb-5 mt-2 ">
               EVENTS
            </div>
            <div className="row">
               <div className="col-lg">
                  <div className=" bg-white shadow p-5  rounded ">
                     <div className="row">
                        <div className="col-sm">
                           <h4 className="mb-5 text-pink">
                              <AiIcons.AiFillEnvironment /> ZAMBOANGA CHAPTER
                           </h4>
                        </div>
                        <div className="col-sm">
                           <button
                              className="float-end bg-pink p-2 border-0  rounded  text-white col-sm-5"
                              onClick={handleShow}
                           >
                              <AiIcons.AiOutlinePlus /> Add new event
                           </button>
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
                                       <button
                                          className="btn float-end text-danger"
                                          onClick={() => {
                                             cancelEvent(val.event_id);
                                          }}
                                          data-tip
                                          data-for="cancelEvent"
                                       >
                                          <BiIcons.BiXCircle />
                                       </button>
                                       <h5 className=" text-pink text-uppercase">
                                          {val.title}{' '}
                                          <button
                                             className="btn float-end"
                                             onClick={() => {
                                                cancelEvent(val.event_id);
                                             }}
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
                                       <ReactTooltip
                                          id="cancelEvent"
                                          place="top"
                                          effect="solid"
                                       >
                                          Cancel event
                                       </ReactTooltip>
                                       <p className="text-dark">
                                          {dateFormat(
                                             val.start,
                                             'ddd, mmmm d, yyyy, h:MM TT'
                                          )}
                                       </p>
                                       {/* badge */}
                                       <p className="text-dark">
                                          Club: <br />{' '}
                                          <b>
                                             {val.chapter === 'all'
                                                ? 'Zamboanga Chapter (all)'
                                                : val.chapter}
                                          </b>
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
                                       <span className="badge rounded-pill bg-danger mb-3">
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
               <Modal.Header closeButton>
                  <Modal.Title className="ms-4">
                     Add event for ZC Chapter
                  </Modal.Title>
               </Modal.Header>
               <Modal.Body className="m-3">
                  <Container className="">
                     <Form.Group className="mb-3 fs-6">
                        <Form.Label>Event type</Form.Label>
                        <br />
                        <input
                           type="radio"
                           placeholder="Event title"
                           value="virtual"
                           name="type"
                           defaultChecked
                           onChange={(e) => setType(e.target.value)}
                           required
                        />{' '}
                        Virtual <br />
                        <input
                           type="radio"
                           name="type"
                           value="actual"
                           placeholder="Event title"
                           onChange={(e) => setType(e.target.value)}
                           required
                        />{' '}
                        Actual/Field
                     </Form.Group>
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
                        <Form.Group className="mb-3 col-sm">
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
                     </div>
                     <Form.Group className="mb-3">
                        <Form.Label>Club name</Form.Label>
                        <Form.Group className="mb-3">
                           <select
                              className="form-select mb-4"
                              name="chapter"
                              onChange={(e) => setChapter(e.target.value)}
                           >
                              <option value="">Select chapter</option>
                              <option value="all">
                                 All Zamboanga Chapters
                              </option>
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
                              <option value="Tolosa Community">
                                 Tolosa Community
                              </option>
                              <option value="Southern City Colleges">
                                 Southern City Colleges
                              </option>
                           </select>
                        </Form.Group>
                     </Form.Group>
                     <Form.Group className="mb-4">
                        <Form.Control
                           type
                           as="textarea"
                           name="description"
                           placeholder="Event description"
                           rows={2}
                           onChange={(e) => setDescription(e.target.value)}
                           required
                        />
                     </Form.Group>

                     {type === 'virtual' ? (
                        <>
                           <div className="row">
                              <Form.Group className="mb-4 col">
                                 {/* event */}
                                 <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Host name"
                                    onChange={(e) => setHost(e.target.value)}
                                    required
                                 />
                              </Form.Group>
                              <Form.Group className="mb-4 col">
                                 {/* event */}
                                 <input
                                    className="form-control"
                                    type="email"
                                    placeholder="Contact Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                 />
                              </Form.Group>
                           </div>
                           <div className="row">
                              <Form.Group className="mb-4 col">
                                 <select
                                    className="form-select"
                                    name="platform"
                                    onChange={(e) =>
                                       setPlatform(e.target.value)
                                    }
                                    required
                                 >
                                    <option value="">Select Platform</option>
                                    <option value="Google Meet">
                                       Google Meet
                                    </option>
                                    <option value="Zoom">Zoom</option>
                                    <option value="Skype">Skype</option>
                                 </select>
                              </Form.Group>
                              <Form.Group className="col">
                                 {/* event */}
                                 <input
                                    className="form-control"
                                    type="url"
                                    placeholder="https://example.com"
                                    onChange={(e) => setLink(e.target.value)}
                                    required
                                 />
                              </Form.Group>
                           </div>
                        </>
                     ) : (
                        <>
                           <div className="row">
                              <Form.Group className="mb-4 col">
                                 <select
                                    className="form-select"
                                    name="source"
                                    onChange={(e) => setSource(e.target.value)}
                                    required
                                 >
                                    <option value="">Select Source</option>
                                    <option value="Funds">Club Funds</option>
                                    <option value="Donation">Donation</option>
                                 </select>
                              </Form.Group>
                              <Form.Group className="mb-4 col-sm-4">
                                 <input
                                    className="form-control"
                                    type="number"
                                    placeholder="Total cost"
                                    onChange={(e) => setTotal(e.target.value)}
                                    required
                                 />
                              </Form.Group>
                           </div>

                           <div className="row">
                              <Form.Group className="mb-4 col">
                                 {/* event */}
                                 <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Venue"
                                    onChange={(e) => setVenue(e.target.value)}
                                    required
                                 />
                              </Form.Group>
                              <Form.Group className="mb-4 col">
                                 {/* event */}
                                 <input
                                    className="form-control"
                                    type="email"
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                 />
                              </Form.Group>
                           </div>

                           <div className="row">
                              <Form.Group className="mb-4 col">
                                 {/* event */}
                                 <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Chairperson"
                                    onChange={(e) =>
                                       setChairperson(e.target.value)
                                    }
                                    required
                                 />
                              </Form.Group>
                              <Form.Group className="mb-4 col">
                                 {/* event */}
                                 <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Prepared by"
                                    onChange={(e) =>
                                       setPreparedby(e.target.value)
                                    }
                                    required
                                 />
                              </Form.Group>
                           </div>
                        </>
                     )}
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

export default Events;
