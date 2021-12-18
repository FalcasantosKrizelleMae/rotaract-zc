import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Container } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import Axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import dateFormat from 'dateformat';
import Navbar from '../components/Navbar';
import { Dropdown, Menu } from 'antd';

const SectEvent = () => {
   const chapter = localStorage.getItem('chapter');
   const [event, setEvent] = useState([]);
   let history = useHistory();

   const [show, setShow] = useState(false);
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

   //CLEAR FORM
   function clear(e) {
      // document.getElementById('add-event-form').reset();
   }

   // const [newData, setNewData] = useState({
   //    newid: '',
   //    newtitle: '',
   //    newstart: '',
   //    newstatus: '',
   // });

   useEffect(() => {
      Axios.get(`http://localhost:5000/events/get/${chapter}`)
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

   const add_report = (event_id) => {
      Axios.post('http://localhost:5000/reports/add_report', {
         event_id: event_id,
      }).then((response) => {
         if (response.data.message === 'success') {
            Swal.fire({
               title: 'Event added to reports',
               icon: 'success',
            });
            clear();
            handleClose();
         } else if (response.data.message === 'exist') {
            Swal.fire({
               title: 'Info!',
               text: 'Report with this event already exist',
               icon: 'warning',
               confirmButtonText: 'Okay',
            });
         } else {
            Swal.fire({
               title: 'Error!',
               text: 'Unsuccesful',
               icon: 'error',
               confirmButtonText: 'Okay',
            });
         }
      });
   };

   return (
      <div>
         <Navbar />
         <div className=" container main">
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
               <Table border>
                  <thead className="text-center text-white bg-pink text-uppercase">
                     <tr>
                        <td>EVENT ID</td>
                        <td>EVENT TYPE</td>
                        <td>Event Name</td>
                        <td>Event Date/Time</td>
                        <td>Status</td>
                        <td>Action</td>
                     </tr>
                  </thead>
                  <tbody>
                     {event.map((row) => {
                        return (
                           <tr className="text-center border">
                              <td>{row.event_id}</td>
                              <td className="text-uppercase">
                                 <div className="text-bolder">{row.type}</div>{' '}
                              </td>
                              <td>{row.title}</td>
                              <td>
                                 {dateFormat(
                                    row.start,
                                    'ddd, mmmm dS, yyyy, h:MM TT'
                                 )}
                              </td>
                              <td>
                                 {row.status === 'cancelled' ? (
                                    <span className="badge rounded-pill badge bg-danger">
                                       {row.status}
                                    </span>
                                 ) : row.status === 'accepted' ? (
                                    <span className="badge rounded-pill badge bg-success">
                                       {row.status}
                                    </span>
                                 ) : row.status === 'declined' ? (
                                    <span className="badge rounded-pill badge bg-warning">
                                       {row.status}
                                    </span>
                                 ) : (
                                    <span className="badge rounded-pill badge bg-secondary">
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
                                          className="text-dark"
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
                                          className="text-primary me-3"
                                       >
                                          <AiIcons.AiFillEye />
                                       </Button>

                                       <Button
                                          variant="white"
                                          onClick={() => {
                                             add_report(row.event_id);
                                          }}
                                          className="text-success me-3"
                                       >
                                          Done
                                       </Button>

                                       <Dropdown
                                          trigger={['click']}
                                          overlay={
                                             <Menu>
                                                <Menu.Item key="0">
                                                   <a
                                                      href
                                                      onClick={() =>
                                                         history.push({
                                                            pathname: `/sect/scan/${row.event_id}`,
                                                            state: {
                                                               event_id:
                                                                  row.event_id,
                                                               title: row.title,
                                                               chapter: chapter,
                                                               start: row.start,
                                                            },
                                                         })
                                                      }
                                                   >
                                                      Scan QR Code
                                                   </a>
                                                </Menu.Item>
                                                <Menu.Item key="1">
                                                   <a
                                                      href
                                                      onClick={() =>
                                                         history.push({
                                                            pathname: `/sect/manual/${row.event_id}`,
                                                            state: {
                                                               event_id:
                                                                  row.event_id,
                                                               title: row.title,
                                                               chapter: chapter,
                                                               start: row.start,
                                                            },
                                                         })
                                                      }
                                                   >
                                                      Manual
                                                   </a>
                                                </Menu.Item>
                                             </Menu>
                                          }
                                       >
                                          <a
                                             href
                                             onClick={(e) => e.preventDefault()}
                                          >
                                             Check Attendance
                                             <AiIcons.AiFillCaretDown />
                                          </a>
                                       </Dropdown>
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
               {/* <Modal.Header className=" bg-pink text-white">
                  <Modal.Title className="ms-4">ADD NEW EVENT</Modal.Title>
               </Modal.Header> */}
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
                        {/* chapter */}
                        <input
                           type="disabled"
                           className="form-select mb-4"
                           defaultValue={chapter}
                           disabled
                        />
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
                  {/* <Button variant="outline-danger" onClick={clear}>
                     Clear
                  </Button> */}

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
