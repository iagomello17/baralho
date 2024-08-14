import React from 'react';
import Deck from './components/Deck';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Baralho de Cartas</h1>
      </header>
      <main>
        <Deck />
      </main>
    </div>
  );
}

export default App;
