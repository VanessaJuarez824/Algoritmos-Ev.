import React, { useState } from 'react';
import './App.css';
import { searchPattern } from './functions/search';
import { highlightLCS } from './functions/similarity'; 

function App() {
  const [text1, setText1] = useState(''); 
  const [text2, setText2] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedText1, setHighlightedText1] = useState(''); // Texto con resaltado en T1
  const [highlightedText2, setHighlightedText2] = useState(''); // Texto con resaltado en T2
  const [matches, setMatches] = useState([]); // Posiciones de los matches
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0); // Índice actual del match

  // Función para leer archivo y setear su contenido
  const handleFileRead = (event, setText, setHighlightedText) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      setText(content); // Actualizamos el estado con el contenido del archivo
      setHighlightedText(content); // Restablecemos el texto resaltado al contenido original
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

  // Desactivar el botón de similitud si no hay dos textos
  const isSimilarityDisabled = !text1 || !text2; 

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
      const prevIndex = (currentMatchIndex - 1 + matches.length) % matches.length; // Retroceder al match anterior
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
                onChange={(e) => handleFileRead(e, setText1, setHighlightedText1)} // Cargar el archivo en el text1
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

        {/* Controles de las flechas para navegar entre matches */}
        <div className="controls">
          <button className="arrow-btn" onClick={handlePrevious}>⬆️</button>
          <button className="arrow-btn" onClick={handleNext}>⬇️</button>
        </div>

        {/* Sección del segundo texto */}
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

      <div className="footer">
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
          disabled={isSimilarityDisabled} // Desactivar el botón si falta uno de los textos
          style={{
            backgroundColor: isSimilarityDisabled ? 'grey' : '#000',
            cursor: isSimilarityDisabled ? 'not-allowed' : 'pointer',
          }}
        >
          Similitudes
        </button>
        <button className="option-btn">Palindromo</button>
        <button className="autocomplete-btn">Auto-completar</button>
      </div>
    </div>
  );
}

export default App;
