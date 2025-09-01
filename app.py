from flask import Flask, render_template, request, jsonify
from utils import generate_manifesto
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_manifesto', methods=['POST'])
def generate_manifesto_api():
    try:
        data = request.get_json()
        
        party_name = data.get('party_name', '').strip()
        issues = data.get('issues', '').strip()
        policies = data.get('policies', '').strip()
        vision = data.get('vision', '').strip()
        
 
        if not all([party_name, issues, policies, vision]):
            return jsonify({
                'success': False,
                'error': 'All fields are required'
            }), 400

        manifesto = generate_manifesto(party_name, issues, policies, vision)
        
        return jsonify({
            'success': True,
            'manifesto': manifesto,
            'filename': f"manifesto_{party_name.replace(' ', '_')}.txt"
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
