// Clase para el nodo de Trie
class TrieNode {
    constructor() {
      this.children = {};
      this.isEndOfWord = false;
    }
  }
  
  // Clase para estructura Trie
  class Trie {
    constructor() {
      this.root = new TrieNode();
    }
  
    
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
  
    // Función para buscar palabras que coincidan con prefijo
    searchWords(prefix, text) {
      let regex = new RegExp(`\\b${prefix}\\w*`, 'g'); 
      let matches = [];
      let match;
  
      while ((match = regex.exec(text)) !== null) {
        matches.push(match[0]);
      }
  
      return matches;
    }
  }
  
  // Función para generar Trie del texto
  export function buildTrieFromText(text) {
    const trie = new Trie();
    const words = text.match(/\b\w+\b/g); 
    words.forEach((word) => trie.insert(word.toLowerCase())); 
    return trie;
  }

// Función para buscar palabras que coincidan con un prefijo
export function autocomplete(trie, prefix, text) {
  const matches = trie.searchWords(prefix.toLowerCase(), text);
  
  const uniqueMatches = Array.from(new Set(matches)).sort();
  
  return uniqueMatches; 
}


  