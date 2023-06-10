const API_KEY = 'YOUR_API_KEY';

document.getElementById('count-btn').addEventListener('click', function() {
  var text = document.getElementById('input').value;
  var wordCount = countWords(text);
  var misspelledWords = [];
  
  // Perform spell-checking
  fetch(`https://api.textgears.com/spelling?key=${ZQDrvozwfNTTe48M}&text=${encodeURIComponent(text)}`)
    .then(response => response.json())
    .then(data => {
      misspelledWords = data.errors.map(error => {
        return {
          bad: error.bad,
          better: error.better,
          meaning: error.meaning
        };
      });

      displayResult(wordCount, misspelledWords);
    })
    .catch(error => {
      console.log('Error:', error);
    });
});

function countWords(text) {
  text = text.trim();
  if (text === '')
    return 0;
  return text.split(/\s+/).length;
}

function displayResult(wordCount, misspelledWords) {
  var resultDiv = document.getElementById('result');
  resultDiv.innerHTML = 'Word Count: ' + wordCount;
  
  // Display misspelled words and suggestions with meanings
  if (misspelledWords.length > 0) {
    var misspelledWordsHTML = '<p class="error-msg">Misspelled Words:</p>';
    misspelledWords.forEach(word => {
      misspelledWordsHTML += `<p><strong>${word.bad}</strong>: Suggested: ${word.better.join(', ')} (Meaning: ${word.meaning})</p>`;
    });
    resultDiv.innerHTML += misspelledWordsHTML;
  }
}
document.getElementById('count-btn').addEventListener('click', function() {
    var text = document.getElementById('input').value;
    var wordCount = countWords(text);
    document.getElementById('result').textContent = 'Word Count: ' + wordCount;
  });
  
  function countWords(text) {
    text = text.trim();
    if (text === '')
      return 0;
    return text.split(/\s+/).length;
  }
  
