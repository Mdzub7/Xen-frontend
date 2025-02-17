# VS Code-like Editor

A modern, web-based code editor built with React, TypeScript, and Vite that mimics Visual Studio Code's interface and functionality.

## 🚀 Features

- 📁 File Explorer with tree view
- 📑 Multi-tab editing support
- 🎨 Syntax highlighting
- 🔧 Customizable editor settings
- 💻 Monaco Editor integration
- 🎯 Split view layout
- 📊 Status bar with git information
- 🛠️ Toolbar with quick actions
- 🎭 Dark theme support

## 🛠️ Tech Stack

- React 18
- TypeScript
- Vite
- Zustand (State Management)
- Monaco Editor
- Tailwind CSS
- Lucide Icons
- React Split

## 📦 Installation

1. Clone the repository
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
 ```

## 🏗️ Project Structure
```plaintext
frontend/
├── src/
│   ├── components/         # React components
│   ├── store/             # Zustand store
│   ├── types/             # TypeScript types
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
 ```

## 💻 Usage
The editor provides a familiar VS Code-like interface with:

- Left sidebar for file navigation
- Central editor area with tabs
- Right sidebar (optional)
- Bottom status bar
- Top toolbar for quick actions
## ⚙️ Configuration
Editor settings can be customized through the store:

- Theme (Dark/Light)
- Font size
- Tab size
- Word wrap
- Minimap visibility
- Auto-save
## 🤝 Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request
## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.
