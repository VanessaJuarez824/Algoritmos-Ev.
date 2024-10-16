// Clase para el nodo de Trie
class TrieNode {
    constructor() {
      this.children = {};
      this.isEndOfWord = false;
    }
  }
  
  // Clase para la estructura Trie
  class Trie {
    constructor() {
      this.root = new TrieNode();
    }
  
    // Función para insertar una palabra en el Trie
    insert(word) {
      let node = this.root;
      for (let char of word) {
        if (!node.children[char]) {
          node.children[char] = new TrieNode();
        }
        node = node.children[char];
      }
      node.isEndOfWord = true;
    }
  
    // Función para buscar palabras que coincidan con un prefijo
    searchWords(prefix, text) {
      let regex = new RegExp(`\\b${prefix}\\w*`, 'g'); // Expresión regular que busca palabras que comiencen con el prefijo
      let matches = [];
      let match;
  
      while ((match = regex.exec(text)) !== null) {
        matches.push(match[0]);
      }
  
      return matches;
    }
  }
  
  // Función para generar el Trie a partir del texto
  export function buildTrieFromText(text) {
    const trie = new Trie();
    const words = text.match(/\b\w+\b/g); // Dividimos el texto en palabras (tokens)
    words.forEach((word) => trie.insert(word.toLowerCase())); // Insertamos las palabras en el Trie
    return trie;
  }
  
  // Función para buscar palabras que coincidan con un prefijo
  export function autocomplete(trie, prefix, text) {
    return trie.searchWords(prefix.toLowerCase(), text); // Buscamos las palabras que comiencen con el prefijo
  }
  
  