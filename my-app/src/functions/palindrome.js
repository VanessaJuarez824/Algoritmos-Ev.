// Algoritmo de Manacher 
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
  
      while (T[i + 1 + P[i]] === T[i - 1 - P[i]]) {
        P[i]++;
      }
  
      if (i + P[i] > R) {
        C = i;
        R = i + P[i];
      }
    }
  
    const maxLen = Math.max(...P);
    const centerIndex = P.indexOf(maxLen);
  
    const start = (centerIndex - maxLen) / 2;
    return text.slice(start, start + maxLen);
  }
  
  export function highlightPalindrome(text, setHighlightedText1) {
    const palindrome = manacher(text); 
    const startIndex = text.indexOf(palindrome); 
    const endIndex = startIndex + palindrome.length;
  
    const beforePalindrome = text.slice(0, startIndex);
    const afterPalindrome = text.slice(endIndex);
    const highlightedText = `${beforePalindrome}<mark style="background-color: #32CD32">${palindrome}</mark>${afterPalindrome}`;
  
    setHighlightedText1(highlightedText);
  }
  