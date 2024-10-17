// Algoritmo de Manacher para encontrar el palíndromo más grande
export function manacher(text) {
    const T = `#${text.split('').join('#')}#`; 
    const n = T.length;
    const P = new Array(n).fill(0); 
    let C = 0, R = 0; 
  
    for (let i = 1; i < n - 1; i++) {
      const mirr = 2 * C - i; 
  
      if (i < R) {
        P[i] = Math.min(R - i, P[mirr]); 
      }
  
      // Expandimos alrededor de i
      while (T[i + 1 + P[i]] === T[i - 1 - P[i]]) {
        P[i]++;
      }
  
      // Si expandimos más allá del radio R, actualizamos el centro y el radio
      if (i + P[i] > R) {
        C = i;
        R = i + P[i];
      }
    }
  
    // Encontramos la longitud máxima en P
    const maxLen = Math.max(...P);
    const centerIndex = P.indexOf(maxLen);
  
    // Recuperamos la subcadena original (sin los #) del palíndromo más largo
    const start = (centerIndex - maxLen) / 2;
    return text.slice(start, start + maxLen);
  }
  
  // Función para resaltar el palíndromo más largo en el texto T1
  export function highlightPalindrome(text, setHighlightedText1) {
    const palindrome = manacher(text); 
    const startIndex = text.indexOf(palindrome); 
    const endIndex = startIndex + palindrome.length;
  
    // Creamos el texto resaltado, con el palíndromo en verde
    const beforePalindrome = text.slice(0, startIndex);
    const afterPalindrome = text.slice(endIndex);
    const highlightedText = `${beforePalindrome}<mark style="background-color: #32CD32">${palindrome}</mark>${afterPalindrome}`;
  
    // Actualizamos el estado del texto resaltado
    setHighlightedText1(highlightedText);
  }
  