import React from 'react';
import '../../../css/card.css';

function Card({ title, body }) {
   return (
      <div className="container col-lg mb-5 shadow-sm bg-pink rounded ">
         <div className="card-content px-3 py-5 pb-3">
            <div className="card-title">
               <h6 className="text-uppercase text-white"> {title} </h6>
            </div>
            <div className="card-body">
               <h2 className="text-white"> {body} </h2>
            </div>
         </div>
      </div>
   );
}

export default Card;
