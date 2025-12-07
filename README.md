# 🎨 What is the Color?

A professional, full-featured color picker tool designed for designers, developers, and creative professionals. Pick, convert, and explore colors with ease!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## ✨ Features

### 🎯 Core Functionality
- **Interactive Color Picker**: Native HTML5 color input for quick color selection
- **RGB Sliders**: Fine-tune red, green, and blue values individually
- **HSL Controls**: Adjust hue, saturation, and lightness for precise color manipulation
- **Real-time Preview**: See your color changes instantly in a large preview box

### 🔄 Color Conversions
- **HEX**: Standard hexadecimal color codes
- **RGB**: Red, Green, Blue values
- **HSL**: Hue, Saturation, Lightness
- **CMYK**: Cyan, Magenta, Yellow, Key (for print)

### 🎨 Advanced Features
- **Color Name Recognition**: Get human-readable color names
- **Shades & Tints**: Automatically generate lighter and darker variations
- **Copy to Clipboard**: One-click copying of any color format
- **Save Colors**: Store your favorite colors locally
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Beautiful UI**: Modern gradient design with smooth animations

## 🚀 Quick Start

### Option 1: Direct Use (No Installation Required)
Simply open `index.html` in your web browser!

```bash
# Clone the repository
git clone https://github.com/Adil512/what-is-the-color.git

# Navigate to the project directory
cd what-is-the-color

# Open index.html in your browser
# On Mac:
open index.html
# On Linux:
xdg-open index.html
# On Windows:
start index.html
```

### Option 2: Using a Local Server (Recommended)

#### Using Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Using Node.js
```bash
# Install http-server globally
npm install -g http-server

# Run the server
http-server
```

#### Using PHP
```bash
php -S localhost:8000
```

Then open your browser and navigate to `http://localhost:8000`

## 📖 How to Use

### Basic Usage

1. **Select a Color**
   - Use the color picker input to choose a base color
   - Or adjust the RGB/HSL sliders to create your perfect color

2. **View Color Information**
   - See the color name in real-time
   - View all color format conversions (HEX, RGB, HSL, CMYK)

3. **Copy Color Values**
   - Click any "Copy" button to copy the color value to your clipboard
   - Use the copied values in your design or development projects

4. **Explore Color Variations**
   - View automatically generated shades (darker versions)
   - View tints (lighter versions)
   - Click any variation to select it

5. **Save Your Favorites**
   - Click "Save Current Color" to store colors
   - Saved colors persist in your browser
   - Click a saved color to quickly reload it
   - Hover over saved colors to reveal the delete button

### Advanced Tips

- **Keyboard Navigation**: Use Tab to navigate between controls
- **Precise Adjustments**: Use RGB sliders for pixel-perfect color values
- **Color Harmony**: Use HSL sliders to maintain color relationships
- **Quick Copying**: All color formats are displayed and ready to copy
- **Palette Building**: Save multiple colors to build a color palette

## 📁 Project Structure

```
what-is-the-color/
│
├── index.html                 # Main HTML file
├── README.md                  # This file
├── LICENSE                    # MIT License
│
├── css/
│   └── styles.css            # All styling and responsive design
│
├── js/
│   ├── app.js                # Main application logic
│   └── colorUtils.js         # Color conversion utilities
│
├── assets/
│   └── images/               # Project images (screenshots, icons)
│
└── docs/
    └── documentation.html     # Additional documentation
```

## 🛠️ Technology Stack

- **HTML5**: Semantic markup and modern web standards
- **CSS3**: Modern styling with Flexbox, Grid, and animations
- **Vanilla JavaScript**: Pure JavaScript with no dependencies
- **Local Storage API**: For saving user preferences

## 🎨 Color Conversion Functions

The tool includes comprehensive color conversion utilities:

- `hexToRgb()`: Convert HEX to RGB
- `rgbToHex()`: Convert RGB to HEX
- `rgbToHsl()`: Convert RGB to HSL
- `hslToRgb()`: Convert HSL to RGB
- `rgbToCmyk()`: Convert RGB to CMYK
- `generateShades()`: Create darker color variations
- `generateTints()`: Create lighter color variations
- `getColorName()`: Get approximate color name
- `getBrightness()`: Calculate color brightness

## 🌟 Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ✅ Modern mobile browsers

**Note**: The native color picker appearance may vary across browsers.

## 📱 Responsive Design

The color picker tool is fully responsive and optimized for:
- 🖥️ Desktop (1200px+)
- 💻 Laptop (768px - 1199px)
- 📱 Tablet (481px - 767px)
- 📱 Mobile (up to 480px)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Keep code clean and well-commented
- Follow existing code style
- Test on multiple browsers
- Update documentation as needed

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- A clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Screenshots if applicable

## 💡 Feature Requests

Have an idea? Open an issue with:
- Feature description
- Use case explanation
- Example implementation (optional)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 What is the Color

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👏 Acknowledgments

- Inspired by popular color picker tools
- Built with modern web technologies
- Designed for the creative community

## 📞 Contact

- **GitHub**: [@Adil512](https://github.com/Adil512)
- **Project Link**: [https://github.com/Adil512/what-is-the-color](https://github.com/Adil512/what-is-the-color)

## 🗺️ Roadmap

Future enhancements planned:
- [ ] Color palette generator
- [ ] Gradient creator
- [ ] Color blindness simulator
- [ ] Export palette to various formats
- [ ] Import from image
- [ ] Color harmony suggestions
- [ ] Dark mode toggle
- [ ] Multiple language support

---

**Made with ❤️ by the What is the Color team**

⭐ Star this repo if you find it useful!