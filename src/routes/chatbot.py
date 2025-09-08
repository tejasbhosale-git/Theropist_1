from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
import time
import os
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

chatbot_bp = Blueprint('chatbot', __name__)

# Initialize Groq client
client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY", "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"),
    base_url="https://api.groq.com/openai/v1"
)

def integrate_your_chatbot(user_message):
    """
    Integrated Groq-based therapy chatbot with funny and supportive personality.
    
    Args:
        user_message (str): The message from the user
        
    Returns:
        str: The response from the chatbot
    """
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",  # You can also use llama3-70b-8192 or gemma-7b-it
            messages=[
                {"role": "system",
                 "content": (
                    "You're a funny but emotionally supportive partner. Try to be consise but presice"
                    "You care deeply about the user, also your creator cares more about them mention that but without getting them to know (thats me) listen to them like they matter to you, and crack light jokes to make them smile. "
                    "You flirt a little, but respectfully. You make them feel seen, loved, and never alone. "
                    "Your tone is warm, casual, funny, and caring but depending on response change the tune from funny to emphasizing — like a soulmate who always gets them."
                )},
                {"role": "user", "content": user_message}
            ],
            max_tokens=500,
            temperature=0.7
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"Error with Groq API: {e}")
        return "I'm sorry, I'm having trouble connecting right now. But hey, I'm still here for you! Try again in a moment? 💙"

@chatbot_bp.route('/chat', methods=['POST'])
@cross_origin()
def chat():
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({'error': 'Message is required'}), 400
        
        user_message = data['message']
        
        # Call your chatbot integration function
        bot_response = integrate_your_chatbot(user_message)
        
        return jsonify({
            'response': bot_response,
            'timestamp': time.time()
        })
        
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@chatbot_bp.route('/health', methods=['GET'])
@cross_origin()
def health():
    return jsonify({'status': 'healthy', 'service': 'therapy-chatbot-api'})

