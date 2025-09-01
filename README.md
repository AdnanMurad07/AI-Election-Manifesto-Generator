# AI Election Manifesto Generator

A modern web application that generates structured election manifestos using AI technology. This application provides a beautiful, responsive interface for creating professional political manifestos.

## Features

- 🎨 **Modern UI/UX**: Beautiful, responsive design with smooth animations
- 🤖 **AI-Powered**: Uses Google's Gemini AI to generate professional manifestos
- 📱 **Mobile-Friendly**: Works perfectly on all devices
- 📋 **Copy & Download**: Easy sharing and downloading of generated manifestos
- ⚡ **Real-time Feedback**: Instant validation and user feedback
- 🎯 **Structured Output**: Well-organized manifesto sections

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd election-manifesto-generator
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

## Usage

1. **Run the application**
   ```bash
   python app.py
   ```

2. **Open your browser**
   Navigate to `http://localhost:5000`

3. **Generate a manifesto**
   - Fill in the party/organization name
   - Enter key issues (comma separated)
   - Add policy priorities
   - Write your vision statement
   - Click "Generate Manifesto"

## Project Structure

```
election-manifesto-generator/
├── app.py                 # Flask application
├── utils.py              # AI manifesto generation logic
├── templates/
│   └── index.html       # Main HTML template
├── static/
│   ├── css/
│   │   └── style.css    # Modern CSS styles
│   └── js/
│       └── script.js    # Frontend JavaScript
├── requirements.txt     # Python dependencies
└── README.md           # This file
```

## API Endpoints

- `GET /` - Main application page
- `POST /generate_manifesto` - Generate manifesto API endpoint

### Generate Manifesto API

**Request:**
```json
{
    "party_name": "Your Party Name",
    "issues": "Issue 1, Issue 2, Issue 3",
    "policies": "Policy priority 1. Policy priority 2.",
    "vision": "Your vision statement"
}
```

**Response:**
```json
{
    "success": true,
    "manifesto": "Generated manifesto content...",
    "filename": "manifesto_Your_Party_Name.txt"
}
```

## Technologies Used

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **AI**: Google Gemini API
- **Styling**: Custom CSS with modern design patterns
- **Icons**: Font Awesome
- **Fonts**: Inter (Google Fonts)

## Features in Detail

### Modern Design
- Gradient backgrounds with glassmorphism effects
- Smooth animations and transitions
- Responsive design for all screen sizes
- Beautiful typography with Inter font

### User Experience
- Real-time form validation
- Loading states with animated spinners
- Toast notifications for user feedback
- Keyboard shortcuts (Ctrl+Enter to submit, Esc to clear)
- Auto-resizing textareas

### Functionality
- AI-powered manifesto generation
- Copy to clipboard functionality
- Download as text file
- Form validation and error handling
- Network status monitoring

## Customization

### Styling
The application uses modern CSS with CSS custom properties. You can easily customize colors, fonts, and other visual elements by modifying `static/css/style.css`.

### AI Model
The AI generation logic is in `utils.py`. You can modify the prompt or switch to a different AI provider by updating this file.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is open source and available under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

If you encounter any issues or have questions, please open an issue on the repository.
