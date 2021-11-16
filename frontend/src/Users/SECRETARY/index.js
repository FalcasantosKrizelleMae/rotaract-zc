import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Axios from 'axios';

const Secretary = () => {
   let history = useHistory();
   const location = useLocation();
   const { member_id } = location.state;
   const [chapter, setChapter] = useState('');

   useEffect(() => {
      Axios.get(`http://localhost:5000/admin/getData/${member_id}`).then(
         (response) => {
            if (response) {
               setChapter(response.data[0].chapter);
            }
         }
      );
   });

   return (
      <div>
         <h1>{member_id}</h1>
         <Button
            variant="primary"
            onClick={() =>
               history.push({
                  pathname: `/sect/events`,
                  state: {
                     chapter: chapter,
                  },
               })
            }
         >
            Add event
         </Button>
      </div>
   );
};

export default Secretary;
