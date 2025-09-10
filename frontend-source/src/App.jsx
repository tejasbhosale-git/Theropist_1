import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Avatar, AvatarFallback } from '@/components/ui/avatar.jsx'
import { Send, Moon, Sun, Menu, Heart, Brain, MessageCircle, Github, Linkedin, Mail, ArrowRight, Sparkles, Users, Shield, Zap, Smile, ThumbsUp, MoreHorizontal, Phone, Video, Settings, User, Briefcase, BookOpen, Star, MessageSquare } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm here to listen and support you. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date(),
      reactions: [],
      isAnimated: true
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  
  const quickReplies = [
    "I'm feeling anxious",
    "I need someone to talk to",
    "I'm having a tough day",
    "I feel overwhelmed",
    "I'm doing great today!",
    "I need some advice"
  ]

  // Removed auto-scroll behavior - messages stay at top like ChatGPT

  const handleSendMessage = async (messageText = null) => {
    const messageToSend = messageText || inputMessage
    if (!messageToSend.trim()) return

    const newMessage = {
      id: messages.length + 1,
      text: messageToSend,
      sender: 'user',
      timestamp: new Date(),
      reactions: [],
      isAnimated: true
    }

    setMessages(prev => [...prev, newMessage])
    setInputMessage('')
    setShowQuickReplies(false)
    setIsTyping(true)

    // Simulate realistic typing delay
    const typingDelay = Math.random() * 2000 + 1000 // 1-3 seconds

    try {
      console.log('Sending message:', messageToSend)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageToSend })
      })

      console.log('Response status:', response.status)
      
      // Add typing delay for more realistic experience
      await new Promise(resolve => setTimeout(resolve, typingDelay))

      if (response.ok) {
        const data = await response.json()
        console.log('Response data:', data)
        const botResponse = {
          id: messages.length + 2,
          text: data.response,
          sender: 'bot',
          timestamp: new Date(),
          reactions: [],
          isAnimated: true
        }
        setMessages(prev => [...prev, botResponse])
      } else {
        console.error('Response not ok:', response.status, response.statusText)
        const botResponse = {
          id: messages.length + 2,
          text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
          sender: 'bot',
          timestamp: new Date(),
          reactions: [],
          isAnimated: true
        }
        setMessages(prev => [...prev, botResponse])
      }
    } catch (error) {
      console.error('Fetch error:', error)
      const botResponse = {
        id: messages.length + 2,
        text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date(),
        reactions: [],
        isAnimated: true
      }
      setMessages(prev => [...prev, botResponse])
    }

    setIsTyping(false)
  }

  const handleQuickReply = (reply) => {
    handleSendMessage(reply)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      {/* Minimal Navigation - Toukoum Style */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                MindSpace
              </span>
            </motion.div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="rounded-full text-gray-600 dark:text-gray-300"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Toukoum Style */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Ethereal Background */}
        <div className="absolute inset-0 bg-white">
          <div className="absolute inset-0 opacity-30">
            <motion.div
              className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-pink-200 to-yellow-200 rounded-full blur-3xl"
              animate={{
                x: [0, -80, 0],
                y: [0, 60, 0],
                scale: [1, 0.8, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-green-200 to-blue-200 rounded-full blur-3xl"
              animate={{
                x: [0, 60, 0],
                y: [0, -40, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
                </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* 3D Avatar */}
            <motion.div
              className="w-48 h-48 mx-auto mb-8 relative"
              animate={{ 
                y: [0, -10, 0],
                rotateY: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Brain className="w-24 h-24 text-white" />
                </motion.div>
              </div>
              {/* Floating particles around avatar */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-400 rounded-full"
                  style={{
                    top: `${20 + (i * 15)}%`,
                    left: `${10 + (i * 20)}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
            </motion.div>
            
            {/* Personal Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4"
            >
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">Hey, I'm your AI therapy companion 👋</p>
              <h1 className="text-6xl md:text-8xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  MindSpace
                </span>
              </h1>
            </motion.div>
            
            {/* Chat Messages - ABOVE Input Field */}
            {messages.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="max-w-4xl mx-auto mb-8"
              >
                <div className="space-y-4">
                  {messages.slice(1).map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.5,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100
                      }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarFallback className={`text-xs ${
                            message.sender === 'user' 
                              ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white' 
                              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          }`}>
                            {message.sender === 'user' ? 'You' : 'AI'}
                          </AvatarFallback>
                        </Avatar>
                        
                        <Card className={`${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-lg'
                            : 'bg-white/90 backdrop-blur-sm border-gray-200 dark:border-gray-600 shadow-md'
                        }`}>
                          <CardContent className="p-3">
                            <p className="text-sm leading-relaxed">{message.text}</p>
                            <p className={`text-xs mt-2 ${
                              message.sender === 'user' 
                                ? 'text-blue-100' 
                                : 'text-muted-foreground'
                            }`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex gap-3 max-w-[80%]">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs">
                            AI
                          </AvatarFallback>
                        </Avatar>
                        <Card className="bg-white/90 backdrop-blur-sm border-gray-200 dark:border-gray-600 shadow-md">
                          <CardContent className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="flex space-x-1">
                                <motion.div
                                  className="w-2 h-2 bg-blue-500 rounded-full"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                />
                                <motion.div
                                  className="w-2 h-2 bg-blue-500 rounded-full"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                />
                                <motion.div
                                  className="w-2 h-2 bg-blue-500 rounded-full"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                />
                              </div>
                              <span className="text-xs text-muted-foreground">AI is typing...</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Interactive Input Field - BELOW Messages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <div className="relative">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full h-16 text-lg pl-6 pr-16 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-full focus:border-blue-500 focus:ring-0 shadow-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="absolute right-2 top-2 h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-lg"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Therapy-Focused Navigation Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
            >
              {[
                { icon: <Heart className="w-6 h-6" />, label: "Mood Check", action: () => handleQuickReply("How are you feeling today?") },
                { icon: <MessageCircle className="w-6 h-6" />, label: "Start Chat", action: () => {} },
                { icon: <Shield className="w-6 h-6" />, label: "Safe Space", action: () => scrollToSection('about') },
                { icon: <Sparkles className="w-6 h-6" />, label: "Coping Tips", action: () => handleQuickReply("I need some coping strategies") },
                { icon: <Users className="w-6 h-6" />, label: "Support", action: () => scrollToSection('contact') }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={item.action}
                  className="flex items-center gap-3 px-6 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300"
                >
                  <div className="text-blue-600">{item.icon}</div>
                  <span className="font-medium text-gray-700">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </section>


      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                About MindSpace
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A revolutionary AI therapy companion designed to provide emotional support, 
              guidance, and a safe space for you to express your thoughts and feelings.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Emotional Support",
                description: "Always here to listen with empathy and understanding, providing comfort during difficult times."
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Safe Space",
                description: "A judgment-free environment where you can freely express your thoughts and feelings."
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Personalized Care",
                description: "Tailored responses that adapt to your unique needs and emotional state."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Key Features
              </span>
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                  Instant Support
                </h3>
            </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Get immediate emotional support and guidance whenever you need it. 
                Our AI companion is available 24/7 to listen and help.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                  Empathetic Responses
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Experience genuine empathy and understanding through carefully crafted 
                responses that acknowledge your feelings and provide meaningful support.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ready to Start?
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Begin your journey towards better mental well-being with our supportive AI companion.
            </p>
            
            <Button
              onClick={() => setShowChat(true)}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-4 text-xl"
            >
              Start Your Journey
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </motion.div>
      </div>
      </section>

    </div>
  )
}

export default App

