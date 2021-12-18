
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import listPlugin from '@fullcalendar/list';
import Axios from 'axios';
import Navbar from '../components/Navbar';
import { Button } from 'antd';

function MemEvents() {
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
      <div>

      <Navbar />
      <div className="main">

      <div className="container">
      
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
</div>
   );
}

export default MemEvents;