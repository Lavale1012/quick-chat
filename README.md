# QuickChat - Real-Time Chat Application

A modern, feature-rich real-time chat application built with React and Socket.IO that enables instant messaging, image sharing, voice-to-text functionality, and dark mode support.

## 🌟 Features

### Core Chat Features
- **Real-time messaging** with Socket.IO
- **Room-based conversations** - Create or join specific chat rooms
- **Multi-user support** - Multiple users can chat simultaneously
- **Responsive design** - Works seamlessly on desktop and mobile devices

### Advanced Features
- **🖼️ Image sharing** - Send compressed images with automatic optimization
- **🎤 Speech-to-text** - Voice input for hands-free messaging
- **🌙 Dark mode** - Toggle between light and dark themes with system preference detection
- **📱 Mobile-friendly** - Fully responsive design with touch-friendly controls
- **Auto-scroll** - Messages automatically scroll to bottom for better UX

### User Experience
- **Intuitive login** - Simple username and room ID entry
- **Message timestamps** - All messages show time and author
- **Visual message distinction** - Different colors for sent vs received messages
- **File upload UI** - Easy image selection with preview and delete options

## 🏗️ Architecture

### Frontend (`/chatapp`)
- **Framework**: React 18.2.0
- **Styling**: Tailwind CSS with custom dark mode implementation
- **Real-time Communication**: Socket.IO Client
- **Image Processing**: Browser-based image compression
- **UI Components**: Modular component architecture

### Backend (`/server`)
- **Runtime**: Node.js with Express
- **WebSocket Server**: Socket.IO
- **CORS Configuration**: Multi-origin support for deployment flexibility
- **File Transfer**: Base64 image encoding with 10MB buffer limit

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TheChatApp
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../chatapp
   npm install
   ```

### Running the Application

1. **Start the server** (in `/server` directory)
   ```bash
   npm start
   # Server runs on http://localhost:3001
   ```

2. **Start the client** (in `/chatapp` directory)
   ```bash
   npm start
   # Client runs on http://localhost:3000
   ```

3. **Access the application**
   - Open http://localhost:3000 in your browser
   - Enter a username and room ID
   - Start chatting!

## 🛠️ Technology Stack

### Frontend Dependencies
- **React** (18.2.0) - Core UI framework
- **Socket.IO Client** (4.7.4) - Real-time communication
- **React Icons** (5.0.1) - Icon library
- **Browser Image Compression** (2.0.2) - Client-side image optimization
- **React Scroll to Bottom** (4.2.0) - Auto-scroll functionality
- **Tailwind CSS** - Utility-first styling

### Backend Dependencies
- **Express** (4.18.2) - Web application framework
- **Socket.IO** (4.7.4) - Real-time bidirectional communication
- **CORS** (2.8.5) - Cross-origin resource sharing

## 📝 Usage Guide

### Starting a Chat Session
1. Enter your desired username
2. Create a new room ID or join an existing one
3. Click "Join A Room!" to enter the chat

### Sending Messages
- **Text**: Type in the input field and press Enter or click send
- **Voice**: Click the microphone icon to use speech-to-text
- **Images**: Click the gallery icon to select and send images

### Features in Chat
- **New Room**: Click "New Room" button to leave current room and join another
- **Dark Mode**: Toggle dark/light theme using the moon/sun icon
- **Image Management**: Selected images can be deleted before sending

## 🌐 Deployment

The application is configured for deployment on multiple platforms:

### Vercel (Frontend)
- Frontend deployed at: `https://quick-chat-gamma.vercel.app`
- Automatic deployment from git repository

### Render (Backend)
- Backend deployed at: `https://quick-chat-7a9b.onrender.com`
- WebSocket server with CORS configured for frontend domains

### Environment Configuration
The app supports multiple environments:
- **Development**: localhost:3000 (client) & localhost:3001 (server)
- **Production**: Deployed URLs with proper CORS configuration

## 🔧 Configuration

### Socket.IO CORS Settings
```javascript
cors: {
  origin: [
    "http://localhost:3000",           // Development
    "https://quick-chat-7a9b.onrender.com",  // Production backend
    "https://quick-chat-gamma.vercel.app",    // Production frontend
  ],
  methods: ["GET", "POST"],
  maxHttpBufferSize: 1e7, // 10MB for image transfers
}
```

### Image Compression Settings
```javascript
const options = {
  maxSizeMB: 1,          // Compress to max 1MB
  maxWidthOrHeight: 1024, // Scale to max 1024px
  useWebWorker: true,     // Use web worker for performance
};
```

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: 300ms transition effects throughout the app
- **Dark Mode**: System preference detection with manual override
- **Color Coding**: Blue bubbles for sent messages, green for received
- **Auto-scroll**: Messages automatically scroll to show latest content
- **Touch-friendly**: Large click targets for mobile devices

## 🔮 Future Enhancements

- User authentication and profiles
- Message persistence and chat history
- Emoji reactions and typing indicators
- File sharing beyond images
- Push notifications for new messages
- Admin controls and moderation features
- Message encryption for privacy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♂️ Support

For questions, issues, or contributions, please open an issue on the GitHub repository or contact the development team.

---

**Built with ❤️ using React, Socket.IO, and modern web technologies**