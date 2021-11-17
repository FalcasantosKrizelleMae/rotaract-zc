import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import dateFormat from 'dateformat';

function Attendance() {
   let history = useHistory();
   const location = useLocation();
   const { event_id, title, chapter, start } = location.state;
   const [data, setData] = useState([]);

   //Display all data
   useEffect(() => {
      Axios.get(`http://localhost:5000/sect/byChapter/${chapter}`).then(
         (response) => {
            if (response) {
               setData(response.data);
            }
         }
      );
   });

   return (
      <div className="mt-5  mx-5">
         <div className="row bg-pink px-4 py-3 mx-1 rounded text-white">
            <div className="col-lg ">
               <h2 className="">{title}</h2>

               <p className="lead fs-6 mb-0">
                  {dateFormat(start, 'ddd, mmmm dS, yyyy, h:MM TT')}
               </p>
            </div>

            <div className="col-lg d-flex align-items-center justify-content-end">
               {chapter}
            </div>
         </div>

         <div className=" mt-3 bg-white p-5 shadow rounded">
            <div className="row">
               {' '}
               <div className="col">
                  <h3 className="text-pink">Attendance List</h3>
               </div>
               <div className="col">
                  {' '}
                  <Button
                     className="mb-3 float-end"
                     onClick={() =>
                        history.push({
                           pathname: `/sect/scan/${event_id}`,
                           state: {
                              event_id: event_id,
                              title: title,
                              chapter: chapter,
                              start: start,
                           },
                        })
                     }
                     type="link"
                     variant="outline-primary"
                     data-tip
                     data-for="check"
                  >
                     Scan qr code
                  </Button>
               </div>
            </div>

            <Table borderless>
               <thead className="bg-pink text-white text-uppercase">
                  <td>Member ID</td>
                  <td>Member name</td>
                  <td>Email</td>
                  <td>Position</td>
                  <td>Chapter</td>
               </thead>
               {data.map((row) => {
                  return (
                     <tr className="border">
                        <td>{row.member_id}</td>
                        <td>{row.first_name + ' ' + row.last_name}</td>
                        <td>{row.email}</td>
                        <td>{row.role}</td>
                        <td>{row.chapter}</td>
                        {/* <td>
                           <span className="badge badge-primary">
                              {row.status}
                           </span>
                        </td> */}
                     </tr>
                  );
               })}
            </Table>
         </div>
      </div>
   );
}

export default Attendance;
