from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/fetch-content', methods=['POST'])
def fetch_content():
    url = request.json.get('url')
    try:
        response = requests.get(url)
        response.raise_for_status()  # Verifica se a requisição foi bem-sucedida
        return jsonify({'content': response.text})
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)

