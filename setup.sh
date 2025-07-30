#!/bin/bash

echo "🧠 MindSpace Therapy Chatbot Setup"
echo "=================================="

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed. Please install Python 3 and try again."
    exit 1
fi

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 To start the application:"
echo "   1. Activate the virtual environment: source venv/bin/activate"
echo "   2. Edit src/routes/chatbot.py to integrate your chatbot"
echo "   3. Run the application: python src/main.py"
echo ""
echo "🌐 The application will be available at: http://localhost:5000"
echo ""
echo "📖 For detailed instructions, see README.md"

