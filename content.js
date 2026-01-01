const results = document.querySelectorAll('.tF2Cxc, .g, div[data-ved]');

results.forEach((result) => {
  const mainLink = result.querySelector('a[href^="http"]');
  if (!mainLink || result.querySelector('.search-note-container')) return;

  const url = mainLink.href;

  // Set the result container to Flexbox
  result.style.display = 'flex';
  result.style.flexDirection = 'row';
  result.style.alignItems = 'flex-start';
  result.style.gap = '20px';

  const noteDiv = document.createElement('div');
  noteDiv.className = 'search-note-container';
  
  const textarea = document.createElement('textarea');
  textarea.placeholder = "+ Add Note"; // Minimalist placeholder
  
  chrome.storage.local.get([url], (data) => {
    if (data[url]) {
      textarea.value = data[url];
    } else {
      textarea.classList.add('minimal'); // Collapse if empty
    }
  });

  // Expand when clicked
  textarea.addEventListener('focus', () => {
    textarea.classList.remove('minimal');
    textarea.placeholder = "Summary...";
  });

  // Collapse on blur if still empty
  textarea.addEventListener('blur', () => {
    if (textarea.value.trim() === "") {
      textarea.classList.add('minimal');
      textarea.placeholder = "+ Add Note";
    }
  });

  textarea.addEventListener('input', () => {
    chrome.storage.local.set({ [url]: textarea.value });
  });

  noteDiv.appendChild(textarea);
  result.appendChild(noteDiv);
});