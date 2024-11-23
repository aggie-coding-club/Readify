document.getElementById('summarizeBtn').addEventListener('click', () => {
    const inputText = document.getElementById('inputText').value;
    const resultDiv = document.getElementById('result');
    
    if (!inputText) {
      resultDiv.textContent = 'Please enter some text to summarize.';
      return;
    }
  
    const textLength = inputText.length;
    
    if (textLength < 50) {
      resultDiv.textContent = "This is a brief summary of a very short text. The main point appears to be about " + 
        inputText.substring(0, 20) + "...";
    } else if (textLength < 200) {
      resultDiv.textContent = "This text discusses a specific topic and makes several key points. " +
        "The main idea centers around the subject matter presented in the first few sentences.";
    } else {
      resultDiv.textContent = "This is a comprehensive text that covers multiple aspects of the topic. " +
        "The main arguments are well-structured and supported by examples. " +
        "The conclusion draws together the key points and presents a coherent summary of the discussion.";
    }
  });