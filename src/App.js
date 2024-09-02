import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Deck from './Deck';
import { values, importance } from './Const';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const location = useLocation();
  const { cards: initialCards, categories: initialCategories } = location.state || {};

  const [cards, setCards] = useState(() => initialCards || values);
  const [categories, setCategories] = useState(() => initialCategories || {
    [importance[0]]: [],
    [importance[1]]: [],
    [importance[2]]: [],
    [importance[3]]: [],
    [importance[4]]: []
  });
  const [showModal, setShowModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');

  const download = () => {
    let fileContent = "";
    Object.keys(categories).forEach(cat => {
        fileContent += `${cat}: \n`;
        categories[cat].forEach(item => {
            fileContent += ` ${item.name} - ${item.description}\n`;
        });
        fileContent += '\n'; // Add a newline for spacing between categories
    });

    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "My_Values.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const categorize = (category) => {
    if (cards.length === 0) return;

    const currentCard = cards[0];
    setCategories(prevCategories => ({
      ...prevCategories,
      [category]: [...prevCategories[category], currentCard]
    }));

    setCards(prevCards => prevCards.slice(1));
  };

  const removeFromCategory = (item) => {
    // Remove the item from the active category
    const updatedCategory = categories[activeCategory].filter(card => card !== item);
    const updatedCategories = {
      ...categories,
      [activeCategory]: updatedCategory
    };
    setCategories(updatedCategories);

    // Add the item back to the original cards array
    setCards(prevCards => [item, ...prevCards]);
  };

  const openModal = (category) => {
    setActiveCategory(category);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const categorizedCnt = Object.values(categories).reduce((acc, category) => acc + category.length, 0);
  const totalCnt = values.length;

  return (
    <div className='container p-3'>
      <div className='row pt-3 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3'>
        <p>WARNING: Don't refresh the page, otherwise you will start from the beginning</p>
      </div>

      <div className='row pb-3' name='count'>
        <div class="col">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <p>Categorized: {categorizedCnt}/{totalCnt}</p>
            </div>
            <div>
              <button className="btn btn-outline-primary btn-sm" onClick={download}>Download Result</button>
            </div>
          </div>
        </div>
      </div>

      <h4>To Me, It's:</h4>
      <div className='row pb-5' name='categories'>
        {importance.map((cat, index) => (
          <div className='col' key={index}>
            <h4>{cat}</h4>
            {categories[cat].length > 0 && (
              <Deck cards={categories[cat]} reverse={true} />
            )}
            <button className="btn btn-outline-primary btn-sm" onClick={() => openModal(cat)}>See List</button>
          </div>
        ))}
      </div>

      <div className='row' name='deck'>
        <p className="fw-bold">Please categorize this value:</p>
        {cards.length > 0 && (
          <div className='pb-5' style={{ maxWidth: '500px' }}><Deck cards={cards} reverse={false} /></div>
        )}
      </div>

      <div className='row justify-content-center' name='buttons'>
          <div className='col'>
            <button className="btn btn-danger w-100" onClick={() => categorize(importance[0])}>Most Important</button>
          </div>
          <div className='col'>
            <button className="btn btn-warning w-100" onClick={() => categorize(importance[1])}>Very Important</button>
          </div>
          <div className='col'>
            <button className="btn btn-primary w-100" onClick={() => categorize(importance[2])}>Important</button>
          </div>
          <div className='col'>
            <button className="btn btn-info w-100" onClick={() => categorize(importance[3])}>Somewhat Important</button>
          </div>
          <div className='col'>
            <button className="btn btn-secondary w-100" onClick={() => categorize(importance[4])}>Not Important</button>
          </div>
      </div>


      {/* Bootstrap modal with React */}
      {showModal && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog" aria-labelledby="categoryListModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="categoryListModalLabel">{activeCategory}</h5>
              </div>
              <div className="modal-body">
                {categories[activeCategory].map((item, idx) => (
                  <div key={idx}>
                    <p>{item.name} - {item.description}
                      <button className="btn btn-outline-danger btn-sm" onClick={() => removeFromCategory(item)} style={{ border: 'none' }}>
                        <img src="/icons-delete-trash-24.png"></img>
                      </button>
                    </p>
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;