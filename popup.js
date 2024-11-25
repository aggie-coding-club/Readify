const API_KEY = '';
const MAX_CHARS = 30000;

const textarea = document.getElementById('inputText');
const charCount = document.querySelector('.char-count');
const updateCharCount = () => {
  const count = textarea.value.length;
  charCount.textContent = `${count} / ${MAX_CHARS}`;
  if (count > MAX_CHARS) {
    textarea.value = textarea.value.substring(0, MAX_CHARS);
  }
};

textarea.addEventListener('input', updateCharCount);

document.getElementById('summarizeBtn').addEventListener('click', async () => {
  const button = document.getElementById('summarizeBtn');
  const inputText = document.getElementById('inputText').value.trim();
  const resultDiv = document.getElementById('result');
  
  if (!inputText) {
    resultDiv.className = 'show error';
    resultDiv.textContent = 'Please enter some text to summarize.';
    return;
  }

  button.classList.add('loading-state');
  button.disabled = true;
  resultDiv.className = '';

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=' + API_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Please summarize the following text concisely and clearly: ${inputText}`
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          topK: 1,
          topP: 1,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      })
    });

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      resultDiv.className = 'show';
      resultDiv.textContent = data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Error:', error);
    resultDiv.className = 'show error';
    resultDiv.textContent = 'Error: Could not generate summary. Please try again.';
  } finally {
    button.classList.remove('loading-state');
    button.disabled = false;
  }
});