# Image-Based Mathematical Equation Solver

An interactive web application that leverages AI to solve hand-drawn mathematical equations. Users can draw equations on a canvas, and the system processes them in real-time using Google's Gemini AI to provide solutions with LaTeX rendering.

## ✨ Features

- Interactive drawing canvas with multi-color support
- Real-time mathematical equation recognition and solving
- Variable input support for equation solving
- LaTeX rendered solutions
- Responsive design with adjustable canvas
- Support for various mathematical expressions and equations

## 🖼️ Screenshots

![image](https://github.com/user-attachments/assets/3c197213-12d2-4107-81b1-fc60fd539a6d)


![image](https://github.com/user-attachments/assets/c4d0db54-98d7-412f-a771-ce9a68ba912a)


[Add screenshots of your application here]
- Canvas Interface
- Drawing Example
- Solution Display
- Variable Input Interface

## 🛠️ Technology Stack

### Backend
- FastAPI (Python)
- Google Gemini AI API
- PIL (Python Imaging Library)
- Pydantic
- Uvicorn

### Frontend
- React.js with TypeScript
- MathJax for LaTeX rendering
- Canvas API
- Axios for API communication
- React-draggable

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 14+
- Google Gemini API key

### Backend Setup

1. Clone the repository
```bash
git clone [your-repository-url]
cd image-based-equation-solver
```

2. Create and activate virtual environment
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
```

3. Install dependencies
```bash
pip install -r requirements.txt
```

4. Set up environment variables
```bash
cp .env.example .env
# Edit .env and add your Google Gemini API key
```

5. Start the backend server
```bash
uvicorn main:app --reload
```

### Frontend Setup

1. Navigate to frontend directory
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

## 💡 How It Works

1. **Draw Equation**: Use the interactive canvas to draw your mathematical equation
2. **Add Variables**: (Optional) Input any variables needed for the equation
3. **Process**: Click calculate to send the drawing to the AI
4. **View Results**: See the interpreted equation and solution rendered in LaTeX

## 🔄 Data Flow

1. User draws expression on canvas
2. Frontend converts canvas to base64 image
3. Backend processes image using PIL
4. Gemini AI analyzes and solves the equation
5. Results are formatted and displayed with LaTeX

## 🛣️ API Endpoints

- `POST /calculate`: Process image and return solutions
- `GET /health`: Health check endpoint

## 🔧 Configuration

### Backend Environment Variables
```
GEMINI_API_KEY=your_api_key
CORS_ORIGINS=http://localhost:5173
```

### Frontend Environment Variables
```
VITE_API_URL=http://localhost:8000
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Future Improvements

- Enhanced error handling for edge cases
- Support for complex mathematical operations (integration, differentiation)
- Improved canvas features (grid lines, zoom, tooltips)
- Enhanced UI/UX with better feedback
- Support for saving and sharing equations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Google Gemini AI for equation recognition
- MathJax for beautiful mathematical rendering
- FastAPI for efficient backend processing

---

[Add your contact information or social links here]
