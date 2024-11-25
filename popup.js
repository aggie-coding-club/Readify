document.getElementById('summarizeBtn').addEventListener('click', async () => {
  const button = document.getElementById('summarizeBtn');
  const inputText = document.getElementById('inputText').value;
  const resultDiv = document.getElementById('result');
  
  if (!inputText) {
    resultDiv.className = 'show error';
    resultDiv.textContent = 'Please enter some text to summarize.';
    return;
  }

  button.classList.add('loading-state');
  resultDiv.className = '';

  await new Promise(resolve => setTimeout(resolve, 800));

  const textLength = inputText.length;
  let summary = '';
  
  if (textLength < 50) {
    summary = "This is a brief summary of a very short text. The main point appears to be about " + 
      inputText.substring(0, 20) + "...";
  } else if (textLength < 200) {
    summary = "This text discusses a specific topic and makes several key points. " +
      "The main idea centers around the subject matter presented in the first few sentences.";
  } else {
    summary = "This is a comprehensive text that covers multiple aspects of the topic. " +
      "The main arguments are well-structured and supported by examples. " +
      "The conclusion draws together the key points and presents a coherent summary of the discussion.";
  }

  button.classList.remove('loading-state');
  
  resultDiv.className = 'show';
  resultDiv.textContent = summary;
});

const textarea = document.getElementById('inputText');
textarea.addEventListener('input', () => {
  const text = textarea.value;
  if (text.length > 2000) {
    textarea.value = text.substring(0, 2000);
  }
});