chrome.runtime.onInstalled.addListener(() => {
    console.log('News Summarizer Extension Installed');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'summarize') {
        fetch('http://localhost:5000/summarize', {  // Atualize o URL se for diferente
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: message.url })
        })
        .then(response => response.json())
        .then(data => sendResponse(data))
        .catch(error => sendResponse({ error: error.message }));

        return true; // Indica que a resposta será enviada de forma assíncrona
    }
});
