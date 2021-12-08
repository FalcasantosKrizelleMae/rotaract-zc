import React from 'react';
import '../css/card.css';
import { Button } from 'react-bootstrap';

function Card({ title, imageUrl, body }) {
   return (
      <div className="card-container me-5 mb-5 ">
         <div className="image-container">
            <img src={imageUrl} alt="" />
         </div>

         <div className="card-content ">
            <div className="card-title">
               <h3> {title} </h3>
            </div>
            <div className="card-body">
               <p> {body} </p>
            </div>
            <div className="btn">
               <Button variant="primary">View More</Button>
            </div>
         </div>
      </div>
   );
}

export default Card;
