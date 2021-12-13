import React from 'react';
import '../../../css/card.css';

function Card({ title, imageUrl, body }) {
   return (
      <div className="container mb-5 bg-light">
         <div className="image-container">
            <img src={imageUrl} alt="" />
         </div>

         <div className="card-content ">
            <div className="card-title">
               <h3> {title} </h3>
            </div>
            <div className="card-body">
               <h1> {body} </h1>
            </div>
         </div>
      </div>
   );
}

export default Card;
