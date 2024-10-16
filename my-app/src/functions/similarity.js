export const findLCS = (text1, text2) => {
    const m = text1.length;
    const n = text2.length;
  
    // Crear una tabla para almacenar la longitud de las subcadenas comunes
    const lcsTable = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
    let longestLength = 0;
    let endIndexText1 = 0;
  
    // Llenar la tabla y encontrar la longitud máxima
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (text1[i - 1] === text2[j - 1]) {
          lcsTable[i][j] = lcsTable[i - 1][j - 1] + 1;
  
          if (lcsTable[i][j] > longestLength) {
            longestLength = lcsTable[i][j];
            endIndexText1 = i; // Guardamos el final de la subcadena en text1
          }
        }
      }
    }
  
    // La subcadena más larga se encuentra en text1 entre endIndexText1 - longestLength y endIndexText1
    const lcs = text1.slice(endIndexText1 - longestLength, endIndexText1);
  
    return lcs; // Retornamos la subcadena común más larga
  };
  
  export const highlightLCS = (text1, text2, setHighlightedText1, setHighlightedText2) => {
    const lcs = findLCS(text1, text2);
    if (lcs) {
      const highlightedT1 = text1.replace(lcs, `<span class="highlight-blue">${lcs}</span>`);
      const highlightedT2 = text2.replace(lcs, `<span class="highlight-blue">${lcs}</span>`);
      setHighlightedText1(highlightedT1);
      setHighlightedText2(highlightedT2);
    } else {
      alert("No hay subcadena común.");
    }
  };
  