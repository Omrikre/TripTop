from flask import Flask, request, jsonify
#import openai
import json


# Set up OpenAI API key
#openai.api_key = "YOUR_API_KEY_HERE"

# Initialize Flask app
app = Flask(__name__)
host = "localhost"
port = 1010


@app.route('/search', methods=['GET'])
def test():
    print("enter")
    response = "hi there"
    return (response)


# Define API endpoint
@app.route('/search', methods=['POST'])
def generate_recommendations():
    # Get search parameters from JSON data in request
    data = json.loads(request.data)
    search_params = data['search_params']
    
    # Generate travel recommendations using OpenAI GPT-3
    prompt = f"I am planning a trip to {search_params['destination']} in {search_params['month']} for {search_params['duration']} days. Can you recommend some activities to do and places to visit?"
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.5,
    )
    recommendations = response.choices[0].text
    
    # Send recommendations back to web browser as JSON
    return jsonify({'recommendations': recommendations})
    
# Start Flask app
if __name__ == '__main__':
    app.run(host=host, port=port)
