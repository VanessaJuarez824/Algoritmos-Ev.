# Evidence1-TC2038.607
Web Application for Processing Plain Text Files

### Features:
- Finds all occurrences of a pattern (P) within a given text and highlights them in yellow. The search supports letters, words, or entire sentences (including spaces). This operation uses Z algorithm.
- Identifies the longest shared substring between two texts (T1 and T2) and highlights it in blue. This feature measures text similarity using the LCS algorithm.
- Finds the largest palindrome within a text (T) and highlights it in green. This is implemented using Manacher’s algorithm.
- As the user types in a text field, a dropdown list of autocomplete suggestions appears. This is achieved by tokenizing the original text into words and storing them efficiently using the Trie data structure.
