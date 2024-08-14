import React, { useState, useEffect } from 'react';

function Deck() {
  const [deckId, setDeckId] = useState('');
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  // Embaralhar um novo baralho ao carregar o componente
  useEffect(() => {
    shuffleDeck();
  }, []);

  const shuffleDeck = () => {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(response => response.json())
      .then(data => {
        setDeckId(data.deck_id);
        setCards([]);
        setError(null);
      })
      .catch(error => {
        setError('Erro ao embaralhar o baralho.');
        console.error('Erro:', error);
      });
  };

  const drawCards = (count) => {
    if (!deckId) return;

    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setCards([...cards, ...data.cards]);
        } else {
          setError('Não há mais cartas no baralho.');
        }
      })
      .catch(error => {
        setError('Erro ao comprar cartas.');
        console.error('Erro:', error);
      });
  };

  return (
    <div>
      <h2>Cartas aleatotias</h2>
      <button onClick={shuffleDeck}>Embaralhar Novo Baralho</button>
      <button onClick={() => drawCards(5)}>Comprar 5 Cartas</button>
      <button onClick={() => drawCards(1)}>Comprar 1 Carta</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="cards">
        {cards.map((card, index) => (
          <div key={index} className="card">
            <img src={card.image} alt={`${card.value} of ${card.suit}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Deck;
