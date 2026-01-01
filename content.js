const results = document.querySelectorAll('.tF2Cxc, .g, div[data-ved]');

results.forEach((result) => {
  const mainLink = result.querySelector('a[href^="http"]');
  if (!mainLink || result.querySelector('.search-note-container')) return;

  const url = mainLink.href;

  // 1. Set the result container to Flexbox
  result.style.display = 'flex';
  result.style.flexDirection = 'row';
  result.style.alignItems = 'flex-start';
  result.style.gap = '20px';

  // 2. Create the note container
  const noteDiv = document.createElement('div');
  noteDiv.className = 'search-note-container';
  
  const textarea = document.createElement('textarea');
  textarea.placeholder = "Summary...";
  
  chrome.storage.local.get([url], (data) => {
    if (data[url]) textarea.value = data[url];
  });

  textarea.addEventListener('input', () => {
    chrome.storage.local.set({ [url]: textarea.value });
  });

  noteDiv.appendChild(textarea);
  
  // 3. Append to the right
  result.appendChild(noteDiv);
});