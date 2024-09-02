import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { values } from './Const';

import 'bootstrap/dist/css/bootstrap.min.css';

function Home({ onStartClick }) {
  const [file, setFile] = useState(null);

  let navigate = useNavigate();
  function onStartClick() {
    navigate('/app');
  }

  const setFileChange = (event) => {
    setFile(event.target.files[0]);
  }

  const parseFile = () => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target.result;
      const lines = fileContent.split('\n');
      const categories = {};
      let currentCategory = null;
      let usedCards = new Set();
      let isValid = true;

      for (const line of lines) {
        if (line.trim().endsWith(':')) {
          // New category detected
          currentCategory = line.trim().slice(0, -1); // remove the colon and space at the end
          if (!currentCategory) {
            isValid = false;
            break;
          }
          categories[currentCategory] = [];
        } else if (line.trim() && currentCategory) {
          // Parsing items belonging to the current category
          const itemDetail = line.trim().split(' - ');
          if (itemDetail.length === 2) {
            // Check for valid name and description
            const item = values.find(v => v.name === itemDetail[0] && v.description === itemDetail[1]);
            if (!item) {
              alert(`Value "${itemDetail[0]} - ${itemDetail[1]}" is invalid!`);
              isValid = false;
              break;
            }

            // Add this value to current category
            categories[currentCategory].push(item);
            usedCards.add(item.name);
          } else {
            isValid = false;
            break;
          }
        } else if (line.trim() === '' && currentCategory) {  // line break between categories
          continue;
        } else {
          isValid = false;
          break;
        }
      };

      if (!isValid) {
        alert('File is invalid!');
      } else {
        const cards = values.filter(card => !usedCards.has(card.name));  // remaining cards
        navigate('/app', { state: { cards, categories } });
      }
    };

    reader.onerror = () => {
      alert('File is invalid!');
    };
  
    reader.readAsText(file); // Read the file as text
  }

  return (
    <div className='vh-100 d-flex flex-column justify-content-center align-items-center'>
      <div className='w-100 p-3'>
        <h1 className='text-center'>Welcome to the Value Identification Tool</h1>
      </div>

      <div className='p-3'>
        <button className="btn btn-primary" onClick={onStartClick}>🚀Click Me to Start</button>
      </div>

      <div className='p-3'>
        <text className='fw-bold'>Or, revisit a previous result: </text>
        <div class="input-group">
          <input 
            type="file" class="form-control" id="inputGroupFile04" accept=".txt"
            aria-describedby="inputGroupFileAddon04" aria-label="Upload"
            onChange={setFileChange}
          />
          <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04" onClick={parseFile}>
            Revisit Result
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
