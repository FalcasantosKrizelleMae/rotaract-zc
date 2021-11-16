import React, { useState, useEffect } from 'react';
import QrReader from 'react-qr-reader';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

function Scan() {
   const location = useLocation();
   const { event_id, title, chapter } = location.state;
   const [data, setData] = useState([]);
   const [member_id, setMember_id] = useState();
   const [event, setEvent] = useState();
   const [scanResultWebCam, setScanResultWebCam] = useState('');
   const [result, setResult] = useState([]);

   const handleErrorWebCam = (error) => {
      console.log(error);
   };

   const handleScanWebCam = (result) => {
      if (result) {
         setScanResultWebCam(result);
      }
   };

   //Display all data
   useEffect(() => {
      Axios.get(`http://localhost:5000/sect/scan/${scanResultWebCam}`).then(
         (response) => {
            if (response) {
               const getchapter = response.data[0].chapter;

               if (getchapter === chapter) {
                  setData(response.data);

                  Axios.post(`http://localhost:5000/sect/add_attendance`, {
                     event_id: event,
                     member_id: member_id,
                  }).then((result) => {
                     if (result) {
                        setResult({ result });
                     } else {
                        console.log(result);
                        setResult('err');
                     }
                  });
               } else {
                  setData([
                     {
                        member_id: 'Invalid QR code',
                        first_name: '',
                        last_name: '',
                     },
                  ]);
               }
            }
         }
      );
   });

   return (
      <div className="m-3 ">
         <div className="row">
            <div className="col-lg">
               <h3>Event title: {title}</h3>

               <QrReader
                  className="col-sm-12 col-lg-5 col-md-7"
                  delay={300}
                  style={{ width: '100%' }}
                  onError={handleErrorWebCam}
                  onScan={handleScanWebCam}
                  facingMode
               />
            </div>

            <div className="col-lg mt-4 p-5 bg-white shadow">
               <h3>RESULT: </h3>
               {data.length === 0 ? (
                  <p></p>
               ) : (
                  data.map((val) => {
                     return (
                        <div>
                           <input
                              type="hidden"
                              value={val.member_id}
                              onChange={(e) => setMember_id(e.target.value)}
                           />

                           <input
                              type="hidden"
                              value={event_id}
                              onChange={(e) => setEvent(e.target.value)}
                           />

                           <h1>
                              {' '}
                              <br />
                              {val.member_id}
                           </h1>
                           <h3> {val.first_name + ' ' + val.last_name}</h3>

                           <span className="badge pill badge bg-success">
                              {val.status}
                           </span>
                        </div>
                     );
                  })
               )}
            </div>
         </div>
      </div>
   );
}

export default Scan;
