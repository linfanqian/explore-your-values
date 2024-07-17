// Card component

import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

function Card({ name, description }) {
  return (
    <div className='card mx-auto'>
      <div className='card-body'>
        <h4 className='card-title'>{name}</h4>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
}

export default Card;