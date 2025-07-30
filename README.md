# MindSpace - AI Therapy Chatbot Website

A beautiful, responsive web application for hosting your AI therapy chatbot with a ChatGPT-like interface designed specifically for therapy sessions. **Now integrated with your Groq-powered funny and supportive therapy chatbot!**

## Features

- 🎨 **Beautiful UI**: ChatGPT-inspired interface with therapy-focused design
- 🌙 **Dark/Light Mode**: Toggle between themes for user comfort
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🔒 **Safe Space**: Designed to feel welcoming and non-judgmental
- 🤖 **Integrated Chatbot**: Your Groq-powered funny and supportive therapy assistant
- ⚡ **Fast & Modern**: Built with React and Flask for optimal performance
- 😄 **Personality**: Warm, funny, caring chatbot that makes users feel loved and supported

## Your Integrated Chatbot

Your chatbot has been successfully integrated! It features:
- **Groq API Integration**: Using Llama3-8b-8192 model for fast responses
- **Funny & Supportive**: Light jokes while being emotionally supportive
- **Caring Personality**: Makes users feel seen, loved, and never alone
- **Respectful Flirting**: Warm and caring tone like a supportive soulmate

## Project Structure

```
therapy-chatbot-api/
├── src/
│   ├── routes/
│   │   ├── chatbot.py          # Your chatbot integration goes here
│   │   └── user.py             # User management routes
│   ├── models/
│   │   └── user.py             # Database models
│   ├── static/                 # Frontend build files
│   │   ├── index.html
│   │   └── assets/
│   ├── database/
│   │   └── app.db              # SQLite database
│   └── main.py                 # Flask application entry point
├── venv/                       # Python virtual environment
├── requirements.txt            # Python dependencies
└── README.md                   # This file
```

## Quick Start

### 1. Setup the Backend

```bash
cd mindspace-therapy-chatbot
python -m venv env
.\env\Scripts\Activate.ps1
pip install -r requirements.txt
```

### 2. Configure Your API Key

The Groq API key is already configured in the `.env` file. If you want to use your own API key:

1. Get your Groq API key from [https://console.groq.com/](https://console.groq.com/)
2. Update the `.env` file:
```
GROQ_API_KEY=your_api_key_here
```

### 3. Run the Application

```bash
python src/main.py
```

The application will be available at `http://localhost:5000`

## Chatbot Configuration

Your chatbot is already integrated and ready to use! The configuration includes:

- **Model**: llama3-8b-8192 (you can change to llama3-70b-8192 or gemma-7b-it in `src/routes/chatbot.py`)
- **Personality**: Funny, supportive, caring therapy assistant
- **API**: Groq API for fast responses
- **Fallback**: Graceful error handling with supportive messages

## Integration Examples

### OpenAI API Integration

```python
import openai

def integrate_your_chatbot(user_message):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a compassionate AI therapy assistant. Provide supportive, empathetic responses."},
                {"role": "user", "content": user_message}
            ],
            max_tokens=150,
            temperature=0.7
        )
        return response.choices[0].message.content
    except Exception as e:
        return "I'm sorry, I'm having trouble processing your message right now. Please try again."
```

### Local Model Integration

```python
# Example with Hugging Face Transformers
from transformers import pipeline

# Initialize your model (do this once, outside the function)
chatbot_pipeline = pipeline("text-generation", model="your-therapy-model")

def integrate_your_chatbot(user_message):
    try:
        response = chatbot_pipeline(user_message, max_length=100, num_return_sequences=1)
        return response[0]['generated_text']
    except Exception as e:
        return "I'm sorry, I'm having trouble processing your message right now. Please try again."
```

### External API Integration

```python
import requests

def integrate_your_chatbot(user_message):
    try:
        response = requests.post(
            "https://your-chatbot-api.com/chat",
            json={"message": user_message},
            headers={"Authorization": "Bearer YOUR_API_KEY"},
            timeout=10
        )
        
        if response.status_code == 200:
            return response.json()["response"]
        else:
            return "I'm sorry, I'm having trouble connecting right now. Please try again."
    except Exception as e:
        return "I'm sorry, I'm having trouble processing your message right now. Please try again."
```

## Customization

### Frontend Customization

The frontend is built with React and Tailwind CSS. To modify the interface:

1. Edit the source files in the original `therapy-chatbot/` directory
2. Rebuild the frontend: `cd therapy-chatbot && pnpm run build`
3. Copy the new build to the backend: `cp -r dist/* ../therapy-chatbot-api/src/static/`

### Backend Customization

- **Add new routes**: Create new files in `src/routes/`
- **Database models**: Modify or add models in `src/models/`
- **Configuration**: Update settings in `src/main.py`

## Deployment

### Local Development
```bash
python src/main.py
```

### Production Deployment
1. Set environment variables for production
2. Use a production WSGI server like Gunicorn:
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 src.main:app
```

## API Endpoints

- `POST /api/chat` - Send a message to the chatbot
- `GET /api/health` - Health check endpoint
- `GET /` - Serve the frontend application

## Environment Variables

You may want to set these environment variables:

- `FLASK_ENV` - Set to `production` for production deployment
- `SECRET_KEY` - Your Flask secret key
- `OPENAI_API_KEY` - If using OpenAI API
- `DATABASE_URL` - If using a different database

## Security Considerations

- Change the default `SECRET_KEY` in production
- Implement rate limiting for the chat endpoint
- Add authentication if needed
- Use HTTPS in production
- Validate and sanitize user inputs

## Troubleshooting

### Common Issues

1. **CORS errors**: Make sure `flask-cors` is installed and configured
2. **Static files not loading**: Check that the frontend build files are in `src/static/`
3. **Database errors**: Ensure the database directory exists and is writable
4. **Import errors**: Make sure you're running from the correct directory with the virtual environment activated

### Getting Help

If you encounter issues:
1. Check the Flask logs for error messages
2. Verify all dependencies are installed
3. Ensure your chatbot integration function returns a string
4. Test the API endpoints directly using curl or Postman

## License

This project is provided as-is for your use. Feel free to modify and customize it for your needs.

## Contributing

This is a template project. Feel free to fork and modify it for your specific requirements.

