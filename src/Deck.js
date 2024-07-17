import React from 'react';
import Card from './Card'

function Deck({ cards, reverse }) {
  // Styles for the top card to appear as if another card is beneath it
  const stackedStyle = {
    position: 'relative',
    marginBottom: '15px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Subtle shadow for the stacked card
  };

  const singleStyle = {
    position: 'relative',
    marginBottom: '15px',
  }

  // Select the card based on the reverse prop
  const cardToShow = reverse ? cards[cards.length - 1] : cards[0];

  return (
    <div>
      {cards.length > 1 ? (
        <div style={stackedStyle}>
          <Card name={cardToShow.name} description={cardToShow.description} />
        </div>
      ) : (
        cards.length === 1 && (
        <div style={singleStyle}>
          <Card name={cardToShow.name} description={cardToShow.description} />
        </div>
        )
      )}
    </div>
  );
}

export default Deck;
