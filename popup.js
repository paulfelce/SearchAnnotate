document.getElementById('exportBtn').addEventListener('click', () => {
  // Pass 'null' to get all items in storage
  chrome.storage.local.get(null, (items) => {
    // 1. Convert the storage object to a JSON string
    // The 'null, 2' arguments make the JSON "pretty-printed" and readable
    const jsonString = JSON.stringify(items, null, 2);

    // 2. Create a Blob (Binary Large Object) of type 'application/json'
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    // 3. Create a temporary link to trigger the download
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = `research_backup_${new Date().toISOString().slice(0,10)}.json`;
    
    // 4. Trigger the download and clean up
    a.click();
    URL.revokeObjectURL(url);
  });
});