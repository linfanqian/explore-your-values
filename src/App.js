import React, { useState } from 'react';
import Deck from './Deck';

import 'bootstrap/dist/css/bootstrap.min.css';

const values = [
  { name: 'Acceptance', description: 'to be accepted as I am' },
  { name: 'Accuracy', description: 'to be correct in my opinions and beliefs' },
  { name: 'Achievement', description: 'to have important accomplishments' },
  { name: 'Adventure', description: 'to have new and exciting experiences' },
  { name: 'Art', description: 'to appreciate or express myself in art' },
  { name: 'Attractiveness', description: 'to be physically attractive' },
  { name: 'Authority', description: 'to be in charge of others' },
  { name: 'Autonomy', description: 'to be self-determined and independent' },
  { name: 'Beauty', description: 'to appreciate beauty around me' },
  { name: 'Belonging', description: 'to have a sense of belonging, being part of' },
  { name: 'Caring', description: 'to take care of others' },
  { name: 'Challenge', description: 'to take on difficult tasks and problems' },
  { name: 'Comfort', description: 'to have a pleasant and comfortable life' },
  { name: 'Commitment', description: 'to make enduring, meaningful commitments' },
  { name: 'Compassion', description: 'to feel and act on concern for others' },
  { name: 'Complexity', description: 'to embrace the intricacies of life' },
  { name: 'Compromise', description: 'to be willing to give and take in reaching agreements' },
  { name: 'Contribution', description: 'to make a lasting contribution in the world' },
  { name: 'Cooperation', description: 'to work collaboratively with others' },
  { name: 'Courage', description: 'to be brave and strong in the face of adversity' },
  { name: 'Courtesy', description: 'to be considerate and polite toward others' },
  { name: 'Creativity', description: 'to create new things or ideas' },
  { name: 'Curiosity', description: 'to seek out, experience and learn new things' },
  { name: 'Dependability', description: 'to be reliable and trustworthy' },
  { name: 'Diligence', description: 'to be thorough and conscientious in whatever I do' },
  { name: 'Ecology', description: 'to live in harmony with the environment' },
  { name: 'Excitement', description: 'to have a life full of thrills and stimulation' },
  { name: 'Fame', description: 'to be known and recognized' },
  { name: 'Family', description: 'to have a happy, loving family' },
  { name: 'Faithfulness', description: 'to be loyal and true in relationships' },
  { name: 'Fitness', description: 'to be physically fit and strong' },
  { name: 'Flexibility', description: 'to adjust to new circumstances easily' },
  { name: 'Forgiveness', description: 'to be forgiving of others' },
  { name: 'Freedom', description: 'to be free from undue restrictions and limitations' },
  { name: 'Friendship', description: 'to have close, supportive friends' },
  { name: 'Fun', description: 'to play and have fun' },
  { name: 'Generosity', description: 'to give what I have to others' },
  { name: 'Genuineness', description: 'to act in a manner that is true to who I am' },
  { name: 'God\'s Will', description: 'to seek and obey the will of God' },
  { name: 'Growth', description: 'to keep changing and growing' },
  { name: 'Health', description: 'to be physically well and healthy' },
  { name: 'Honesty', description: 'to be honest and truthful' },
  { name: 'Hope', description: 'to maintain a positive and optimistic outlook' },
  { name: 'Humility', description: 'to be modest and unassuming' },
  { name: 'Humor', description: 'to see the humorous side of myself and the world' },
  { name: 'Imagination', description: 'to have dreams and see possibilities' },
  { name: 'Independence', description: 'to be free from depending on others' },
  { name: 'Industry', description: 'to work hard and well at my life tasks' },
  { name: 'Integrity', description: 'to live my daily life in a way that is consistent with my values' },
  { name: 'Intelligence', description: 'to keep my mind sharp and active' },
  { name: 'Intimacy', description: 'to share my innermost experiences with others' },
  { name: 'Justice', description: 'to promote fair and equal treatment for all' },
  { name: 'Knowledge', description: 'to learn and contribute valuable knowledge' },
  { name: 'Leadership', description: 'to inspire and guide others' },
  { name: 'Leisure', description: 'to take time to relax and enjoy' },
  { name: 'Loved', description: 'to be loved by those close to me' },
  { name: 'Loving', description: 'to give love to others' },
  { name: 'Mastery', description: 'to be competent in my everyday activities' },
  { name: 'Mindfulness', description: 'to live conscious and mindful of the present moment' },
  { name: 'Moderation', description: 'to avoid excesses and find a middle ground' },
  { name: 'Monogamy', description: 'to have one close, loving relationship' },
  { name: 'Music', description: 'to enjoy or express myself in music' },
  { name: 'Non-Conformity', description: 'to question and challenge authority and norms' },
  { name: 'Novelty', description: 'to have a life full of change and variety' },
  { name: 'Nurturance', description: 'to encourage and support others' },
  { name: 'Openness', description: 'to be open to new experiences, ideas and options' },
  { name: 'Order', description: 'to have a life that is well-ordered and organized' },
  { name: 'Passion', description: 'to have deep feelings about ideas, activities or people' },
  { name: 'Patriotism', description: 'to love, serve and protect my country' },
  { name: 'Pleasure', description: 'to feel good' },
  { name: 'Popularity', description: 'to be well-liked by many people' },
  { name: 'Practicality', description: 'to focus on what is practical, prudent, and sensible' },
  { name: 'Protect', description: 'to protect and keep safe those I love' },
  { name: 'Provide', description: 'to provide for and take care of my family' },
  { name: 'Power', description: 'to have control over others' },
  { name: 'Purpose', description: 'to have meaning and direction in my life' },
  { name: 'Rationality', description: 'to be guided by reason, logic and evidence' },
  { name: 'Realism', description: 'to see and act realistically and practically' },
  { name: 'Responsibility', description: 'to make and carry out responsible decisions' },
  { name: 'Risk', description: 'to take risks and chances' },
  { name: 'Romance', description: 'to have intense, exciting love in my life' },
  { name: 'Safety', description: 'to be safe and secure' },
  { name: 'Self-Acceptance', description: 'to accept myself as I am' },
  { name: 'Self-Control', description: 'to be disciplined ini my own actions' },
  { name: 'Self-Esteem', description: 'to feel good about myself' },
  { name: 'Self-Knowledge', description: 'to have a deep and honest understanding of myself' },
  { name: 'Service', description: 'to be helpful and of service to others' },
  { name: 'Sexuality', description: 'to have an active and satisfying sex life' },
  { name: 'Simplicity', description: 'to live life simply, with minimal needs' },
  { name: 'Solitude', description: 'to have time and space where I can be apart from others' },
  { name: 'Spirituality', description: 'to grow and mature spiritually' },
  { name: 'Stability', description: 'to have a life that stays fairly consistent' },
  { name: 'Tolerance', description: 'to accept and respect those who differ from me' },
  { name: 'Tradition', description: 'to follow respected patterns of the past' },
  { name: 'Virtue', description: 'to live a morally pure and excellent life' },
  { name: 'Wealth', description: 'to have plenty of money' },
  { name: 'World Peace', description: 'to work to promote peace in the world' },
]

const importance = [
  'Most Important to Me',
  'Very Important to Me',
  'Important to Me',
  'Somewhat Important to Me',
  'Not Important to Me',
]

function App() {
  const [cards, setCards] = useState(values);
  const [categories, setCategories] = useState({
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
    setCards(prevCards => [...prevCards, item]);
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

      <div className='row pb-5' name='categories'>
        {importance.map((cat, index) => (
          <div className='col' key={index}>
            <h4>{cat}</h4>
            {categories[cat].length > 0 && (
              <Deck cards={categories[cat]} reverse={true} />
            )}
            <button className="btn btn-outline-primary btn-sm" onClick={() => openModal(cat)}>See All</button>
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