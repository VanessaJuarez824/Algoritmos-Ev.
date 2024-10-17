import React, { useState } from 'react';
import './App.css';
import { searchPattern } from './functions/search';
import { highlightLCS } from './functions/similarity';
import { highlightPalindrome, manacher } from './functions/palindrome';
import { buildTrieFromText, autocomplete } from './functions/autocomplete'; 

function App() {
  const [text1, setText1] = useState(''); 
  const [text2, setText2] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedText1, setHighlightedText1] = useState(''); 
  const [highlightedText2, setHighlightedText2] = useState(''); 
  const [matches, setMatches] = useState([]); 
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0); 
  const [largestPalindrome, setLargestPalindrome] = useState(''); 
  const [trie, setTrie] = useState(null); 
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]); 
  const [inputValue, setInputValue] = useState(''); 

  // Función para leer archivo y setear su contenido
  const handleFileRead = (event, setText, setHighlightedText, updateTrie) => {
    const file = event.target.files[0]; // Intentamos acceder al archivo
  
    // Verificar si no se seleccionó un archivo
    if (!file) {
      alert("Selecciona un archivo"); // Muestra el popup
      return; // Termina la función si no hay archivo seleccionado
    }
  
    // Si se selecciona un archivo, lo procesamos
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      setText(content);
      setHighlightedText(content);
  
      if (updateTrie) {
        const trie = buildTrieFromText(content); // Generamos el Trie a partir del nuevo texto
        setTrie(trie); // Actualizamos el Trie
      }
    };
    reader.readAsText(file);
  };

  // Función pa limpiar texto
  const clearText = (setText, setHighlightedText, clearTrie) => {
    setText('');
    setHighlightedText(''); 
    setLargestPalindrome(''); 
    if (clearTrie) {
      setTrie(null); 
    }
  };

  // Función para la búsqueda algoritmo Z
  const handleSearch = () => {
    setHighlightedText1(text1); 
    searchPattern(searchTerm, text1, setHighlightedText1, setMatches, setCurrentMatchIndex);
  };

  // Función para similitud más grande LCS
  const handleSimilarity = () => {
    highlightLCS(text1, text2, setHighlightedText1, setHighlightedText2);
  };

  // Función para algoritmo Manacher 
  const handlePalindrome = () => {
    highlightPalindrome(text1, setHighlightedText1); 
    const palindrome = manacher(text1); 
    setLargestPalindrome(palindrome); 
  };

  // Función para navegar a sig coincidencia
  const handleNext = () => {
    if (matches.length > 0) {
      const nextIndex = (currentMatchIndex + 1) % matches.length; 
      setCurrentMatchIndex(nextIndex);
      highlightMatch(matches, nextIndex);
    }
  };

  // Función para navegar a coincidencia anterior
  const handlePrevious = () => {
    if (matches.length > 0) {
      const prevIndex = (currentMatchIndex - 1 + matches.length) % matches.length; 
      setCurrentMatchIndex(prevIndex);
      highlightMatch(matches, prevIndex);
    }
  };

  // Función para resaltar coincidencia actual
  const highlightMatch = (matches, index) => {
    const startIndex = matches[index];
    const endIndex = startIndex + searchTerm.length;
    const beforeMatch = text1.slice(0, startIndex);
    const match = text1.slice(startIndex, endIndex);
    const afterMatch = text1.slice(endIndex);
    setHighlightedText1(`${beforeMatch}<mark>${match}</mark>${afterMatch}`);
  };

  // Función para ejecutar el algoritmo de autocompletar con palabras
  const handleAutocomplete = (e) => {
    const input = e.target.value;
    setInputValue(input); 
    if (trie && input.length > 0) {
      const suggestions = autocomplete(trie, input, text1); 
      setAutocompleteSuggestions(suggestions);
    } else {
      setAutocompleteSuggestions([]); 
    }
  };
  
  return (
    <div className="container">
      <header className="header">
        <h1>Evidencia 1 - Vanessa Juárez y Alejandra Terán</h1>
      </header>

      <div className="content">
        <div className="text-section">
          <div className="text-buttons">
            <label className="new-text-btn">
              New Text
              <input
                type="file"
                accept=".txt"
                style={{ display: 'none' }}
                onChange={(e) => handleFileRead(e, setText1, setHighlightedText1, true)} 
              />
            </label>
            <button 
              className="clear-btn" 
              onClick={() => clearText(setText1, setHighlightedText1, true)} 
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
                onChange={(e) => handleFileRead(e, setText2, setHighlightedText2, false)} 
              />
            </label>
            <button 
              className="clear-btn" 
              onClick={() => clearText(setText2, setHighlightedText2, false)}
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

      <div className="footer">
        <div className="cards-section">
          <div className="card">
            <h3>Palindromo</h3>
            <p>Detectar si hay un palíndromo en el texto.</p>
            <button className="card-btn" onClick={handlePalindrome}>Ejecutar</button>
            {largestPalindrome && (
              <div style={{ marginTop: '10px', textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
                El palíndromo más grande es: 
                <div style={{ fontSize: '30px', marginTop: '10px' }}>{largestPalindrome}</div>
              </div>
            )}
          </div>

          <div className="card">
            <h3>Autocompletar</h3>
            <p>Autocompletar palabras en base al texto.</p>
            <input
              type="text"
              value={inputValue}
              onChange={handleAutocomplete}
              placeholder="Escribe para autocompletar"
              className="autocomplete-input"
            />
            <ul className="autocomplete-suggestions">
              {autocompleteSuggestions.map((suggestion, index) => (
                <li key={index} onClick={() => setInputValue(suggestion)}>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
