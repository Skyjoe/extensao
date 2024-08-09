document.getElementById('summarizeButton').addEventListener('click', () => {
    const url = document.getElementById('urlInput').value;
    chrome.runtime.sendMessage({ action: 'summarize', url: url }, (response) => {
        if (response.error) {
            document.getElementById('result').innerText = `Error: ${response.error}`;
        } else {
            document.getElementById('result').innerText = `Summary: ${response.summary}`;
        }
    });
});
