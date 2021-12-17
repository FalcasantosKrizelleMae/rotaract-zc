import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import Axios from 'axios';

import * as AiIcons from 'react-icons/ai';
import Swal from 'sweetalert2';
import dateFormat from 'dateformat';
import Navbar from '../components/Navbar';

const SectEvent = () => {
   const chapter = localStorage.getItem('chapter');
   const [event, setEvent] = useState([]);

   //CANCEL EVENT
   const cancelEvent = (id) => {
      Swal.fire({
         title: `Are you sure you want to decline this request?`,
         showDenyButton: true,

         confirmButtonText: 'Yes',
         denyButtonText: `No`,
      }).then((result) => {
         if (result.isConfirmed) {
            Axios.get(`http://localhost:5000/events/decline/${id}`).then(
               (response) => {
                  if (response.data.message === 'success') {
                     Swal.fire({
                        title: 'Event declined!',
                        icon: 'success',
                     });
                  } else {
                     Swal.fire({
                        title: 'Error!',
                        text: 'Event not successful',
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

   useEffect(() => {
      Axios.get(`http://localhost:5000/events/pres/${chapter}`)
         .then((response) => {
            if (response) {
               setEvent(response.data);
            }
         })

         .catch((error) => console.log(error));
   });

   const accept = (id) => {
      Swal.fire({
         title: `Are you sure you want to accept this event request?`,
         showDenyButton: true,

         confirmButtonText: 'Yes',
         denyButtonText: `No`,
      }).then((result) => {
         if (result.isConfirmed) {
            Axios.get(`http://localhost:5000/events/accept/${id}`).then(
               (response) => {
                  if (response.data.message === 'success') {
                     Swal.fire({
                        title: 'Request accepted',
                        icon: 'success',
                     });
                  } else {
                     Swal.fire({
                        title: 'Error!',
                        text: 'Unsuccessful',
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
         <div className="container main">
            <div className="shadow  p-5 rounded">
               <div className="row">
                  <div className="col-sm">
                     {' '}
                     <h3 className="text-pink mb-4">List of Events</h3>
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
                                 ) : row.status === 'declined' ? (
                                    <span className="badge pill badge bg-warning">
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
                                          className="me-2"
                                          variant="success"
                                          onClick={() => {
                                             accept(row.event_id);
                                          }}
                                          data-tip
                                          data-for="cancel"
                                       >
                                          <AiIcons.AiFillCheckCircle />
                                       </Button>

                                       <Button
                                          variant="danger"
                                          onClick={() => {
                                             cancelEvent(row.event_id);
                                          }}
                                          data-tip
                                          data-for="decline"
                                       >
                                          <AiIcons.AiOutlineStop />
                                       </Button>
                                    </>
                                 ) : row.status === 'accepted' ? (
                                    <b>
                                       <Button
                                          variant="white"
                                          data-tip
                                          data-for="view"
                                          className="text-primary"
                                       >
                                          <AiIcons.AiFillEye />
                                       </Button>
                                    </b>
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

                                 {/* accept event */}
                                 <ReactTooltip
                                    id="accept"
                                    place="top"
                                    effect="solid"
                                 >
                                    Accept event
                                 </ReactTooltip>

                                 {/* Check Attendance */}
                                 <ReactTooltip
                                    id="decline"
                                    place="top"
                                    effect="solid"
                                 >
                                    Decline request
                                 </ReactTooltip>
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </Table>
            </div>
         </div>
      </div>
   );
};

export default SectEvent;
