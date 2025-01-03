document.addEventListener('DOMContentLoaded', () => {
    const configurationsDiv = document.getElementById('configurations');
    const saveButton = document.getElementById('save');
  
    chrome.storage.sync.get(['config'], (data) => {
      const config = data.config || [];
      configurationsDiv.innerHTML = JSON.stringify(config, null, 2);
    });
  
    saveButton.addEventListener('click', () => {
      const config = JSON.parse(configurationsDiv.innerText);
      chrome.storage.sync.set({ config: config }, () => {
        alert('Configuration saved!');
      });
    });
  });