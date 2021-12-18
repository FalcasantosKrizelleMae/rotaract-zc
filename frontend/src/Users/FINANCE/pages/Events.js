import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import listPlugin from '@fullcalendar/list';
import Axios from 'axios';
import Navbar from '../components/Navbar';

const MemEvents = () => {
   const chapter = localStorage.getItem('chapter');
   const [event, setEvent] = useState([]);

   useEffect(() => {
      Axios.get(`http://localhost:5000/events/${chapter}`).then((response) => {
         if (response) {
            setEvent(response.data);
         }
      });
   }, [chapter]);

   return (
      <>
         <Navbar />

         <div className="main container shadow p-5 col-lg-12">
            <h2 className="mb-5 text-pink text-center text-uppercase">
               Calendar of Events
            </h2>
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
      </>
   );
};

export default MemEvents;
