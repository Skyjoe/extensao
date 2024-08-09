// Função para enviar o texto para o background script para ser resumido
function summarizeText(text) {
    chrome.runtime.sendMessage({ action: 'summarize', text: text }, (response) => {
        if (response.error) {
            console.error('Erro ao resumir o texto:', response.error);
        } else {
            displaySummary(response.summary);
        }
    });
}

// Função para exibir o resumo
function displaySummary(summary) {
    // Aqui você pode adicionar o código para exibir o resumo na extensão
    console.log('Resumo:', summary);
}

// Exemplo de uso: substituir pelo texto do artigo
const articleText = 'Texto do artigo a ser resumido';
summarizeText(articleText);
