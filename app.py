from flask import Flask, request, jsonify
from transformers import pipeline
from newspaper import Article

app = Flask(__name__)
summarizer = pipeline("summarization", model="arubenruben/ptt5-portuguese-cnn-dailymail-azure-pt-pt")

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.json
    url = data.get('url')

    if not url:
        return jsonify({'error': 'No URL provided'}), 400

    try:
        content = fetch_content(url)
        summary = summarizer(content, max_length=150, min_length=50, do_sample=False)
        return jsonify({'summary': summary[0]['summary_text']})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def fetch_content(url):
    try:
        article = Article(url)
        article.download()
        article.parse()
        return article.text
    except Exception as e:
        raise ValueError(f"Error fetching content from URL: {e}")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
