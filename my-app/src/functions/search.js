export const zAlgorithm = (pattern, text) => {
  const concat = pattern + "$" + text; 
  const Z = new Array(concat.length).fill(0);
  let L = 0, R = 0, K = 0;

  for (let i = 1; i < concat.length; i++) {
    if (i > R) {
      L = R = i;
      while (R < concat.length && concat[R] === concat[R - L]) {
        R++;
      }
      Z[i] = R - L;
      R--;
    } else {
      K = i - L;
      if (Z[K] < R - i + 1) {
        Z[i] = Z[K];
      } else {
        L = i;
        while (R < concat.length && concat[R] === concat[R - L]) {
          R++;
        }
        Z[i] = R - L;
        R--;
      }
    }
  }

  // Encontrar las posiciones donde el patrón aparece
  const result = [];
  for (let i = 0; i < Z.length; i++) {
    if (Z[i] === pattern.length) {
      result.push(i - pattern.length - 1); // Guardar posición 
    }
  }
  return result; 
};

export const searchPattern = (pattern, text1, setHighlightedText, setMatches, setCurrentMatchIndex) => {
  if (!pattern) {
    return; // Si no hay patrón, no hacemos nada
  }

  const matches = zAlgorithm(pattern, text1);

  if (matches.length === 0) {
    alert('No se encontraron coincidencias.');
    return;
  }

  setMatches(matches); 
  setCurrentMatchIndex(0); 

  // Resaltar todas las coincidencias en texto
  let highlighted = '';
  let lastIndex = 0;
  matches.forEach((matchIndex) => {
    highlighted += text1.slice(lastIndex, matchIndex) + '<mark>' + text1.slice(matchIndex, matchIndex + pattern.length) + '</mark>';
    lastIndex = matchIndex + pattern.length;
  });
  highlighted += text1.slice(lastIndex); 

  setHighlightedText(highlighted); // Actualizamos el texto resaltado
};
