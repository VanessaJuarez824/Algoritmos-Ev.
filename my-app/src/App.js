import React, { useState } from 'react';
import './App.css';
import { searchPattern } from './functions/search';
import { highlightLCS } from './functions/similarity'; 

function App() {
  const [text1, setText1] = useState(''); 
  const [text2, setText2] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedText1, setHighlightedText1] = useState(''); // Texto con resaltado T1
  const [highlightedText2, setHighlightedText2] = useState(''); // Texto con resaltado T2
  const [matches, setMatches] = useState([]); 
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0); // Índice actual del match

// Función para leer archivo y setear su contenido
const handleFileRead = (event, setText, setHighlightedText) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target.result;
    setText(content); 
    setHighlightedText(content); 
  };
  reader.readAsText(file);
};


  // Función para limpiar el texto
  const clearText = (setText, setHighlightedText) => {
    setText('');
    setHighlightedText(''); 
  };

  // Función para realizar la búsqueda con el algoritmo Z
  const handleSearch = () => {
    setHighlightedText1(text1); 
    searchPattern(searchTerm, text1, setHighlightedText1, setMatches, setCurrentMatchIndex);
  };

  // Función para encontrar la similitud más grande (LCS)
  const handleSimilarity = () => {
    highlightLCS(text1, text2, setHighlightedText1, setHighlightedText2);
  };

  // Función para navegar a la siguiente coincidencia
  const handleNext = () => {
    if (matches.length > 0) {
      const nextIndex = (currentMatchIndex + 1) % matches.length; 
      setCurrentMatchIndex(nextIndex);
      highlightMatch(matches, nextIndex);
    }
  };

  // Función para navegar a la coincidencia anterior
  const handlePrevious = () => {
    if (matches.length > 0) {
      const prevIndex = (currentMatchIndex - 1 + matches.length) % matches.length; 
      setCurrentMatchIndex(prevIndex);
      highlightMatch(matches, prevIndex);
    }
  };

  // Función para resaltar la coincidencia actual
  const highlightMatch = (matches, index) => {
    const startIndex = matches[index];
    const endIndex = startIndex + searchTerm.length;
    const beforeMatch = text1.slice(0, startIndex);
    const match = text1.slice(startIndex, endIndex);
    const afterMatch = text1.slice(endIndex);
    setHighlightedText1(`${beforeMatch}<mark>${match}</mark>${afterMatch}`);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Evidencia 1 - Vanessa Juarez y Alejandra Teran</h1>
      </header>

      <div className="content">
        {/* Sección del primer texto */}
        <div className="text-section">
          <div className="text-buttons">
            <label className="new-text-btn">
              New Text
              <input
                type="file"
                accept=".txt"
                style={{ display: 'none' }}
                onChange={(e) => handleFileRead(e, setText1, setHighlightedText1)} 
              />
            </label>
            <button 
              className="clear-btn" 
              onClick={() => clearText(setText1, setHighlightedText1)}
            >
              Clear
            </button>
          </div>
          <div
            className="text-area"
            dangerouslySetInnerHTML={{ __html: highlightedText1 }} 
          />
        </div>

        <div className="controls">
          <button className="arrow-btn" onClick={handlePrevious}>⬆️</button>
          <button className="arrow-btn" onClick={handleNext}>⬇️</button>
        </div>

        <div className="text-section">
          <div className="text-buttons">
            <label className="new-text-btn">
              New Text
              <input
                type="file"
                accept=".txt"
                style={{ display: 'none' }}
                onChange={(e) => handleFileRead(e, setText2, setHighlightedText2)} 
              />
            </label>
            <button 
              className="clear-btn" 
              onClick={() => clearText(setText2, setHighlightedText2)}
            >
              Clear
            </button>
          </div>
          <div
            className="text-area"
            dangerouslySetInnerHTML={{ __html: highlightedText2 }} 
          />
        </div>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Buscar patrón"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} className="search-btn">Buscar</button>

        <button
          onClick={handleSimilarity}
          className="option-btn"
          disabled={!text1 || !text2} 
          style={{
            backgroundColor: !text1 || !text2 ? 'grey' : '#000',
            cursor: !text1 || !text2 ? 'not-allowed' : 'pointer',
          }}
        >
          Similitudes
        </button>
      </div>

      {/* Footer con las tarjetas de Palindromo y Autocompletar */}
      <div className="footer">
        <div className="cards-section">
          <div className="card">
            <h3>Palindromo</h3>
            <p>Detectar si hay un palíndromo en el texto.</p>
            <button className="card-btn">Ejecutar</button>
          </div>

          <div className="card">
            <h3>Autocompletar</h3>
            <p>Autocompletar palabras en base al texto.</p>
            <button className="card-btn">Ejecutar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
