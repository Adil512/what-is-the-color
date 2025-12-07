# Contributing to What Is The Color

First off, thank you for considering contributing to What Is The Color! It's people like you that make this tool better for everyone.

## 🤝 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 🚀 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if possible**
- **Include browser and OS information**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List some examples of how it would be used**

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Commit your changes** with clear commit messages
6. **Push to your fork** and submit a pull request

## 📝 Development Process

### Setting Up Your Development Environment

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/what-is-the-color.git

# Navigate to the directory
cd what-is-the-color

# Create a branch for your feature
git checkout -b feature/your-feature-name
```

### Coding Standards

- Use **meaningful variable and function names**
- Write **clean, readable code**
- Add **comments for complex logic**
- Follow the existing code style
- Keep functions **small and focused**
- Use **ES6+ JavaScript features**

### Code Style Guidelines

#### JavaScript
- Use `const` for variables that don't change, `let` for those that do
- Use arrow functions where appropriate
- Use template literals for string interpolation
- Use destructuring when it improves readability
- Keep lines under 100 characters when possible

#### CSS
- Use meaningful class names
- Follow BEM naming convention when appropriate
- Group related properties together
- Use CSS variables for colors and common values
- Keep specificity low

#### HTML
- Use semantic HTML5 elements
- Include proper ARIA labels for accessibility
- Keep structure clean and well-indented
- Use descriptive IDs and classes

### Commit Message Guidelines

We follow conventional commit messages:

```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(color-picker): add HSV color format support

Added HSV (Hue, Saturation, Value) color format display
alongside existing HEX, RGB, HSL, and CMYK formats.

Closes #123
```

### Testing

Before submitting a pull request:

1. Test in multiple browsers (Chrome, Firefox, Safari, Edge)
2. Test on different screen sizes (mobile, tablet, desktop)
3. Test all features you've modified
4. Ensure no console errors
5. Verify accessibility with screen readers if applicable

### Documentation

- Update README.md if you change functionality
- Add JSDoc comments for new functions
- Update inline comments as needed
- Include examples in documentation

## 🎯 Project Structure

```
what-is-the-color/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── README.md           # Project documentation
├── LICENSE             # MIT License
├── CONTRIBUTING.md     # This file
├── CODE_OF_CONDUCT.md  # Code of conduct
├── SECURITY.md         # Security policy
└── docs/               # Additional documentation
    └── images/         # Screenshots and images
```

## 💡 Feature Ideas

Some ideas for contributions:

- **Color Harmony Generator** - Generate complementary, analogous, triadic colors
- **Color Naming** - Show common names for colors
- **Accessibility Checker** - Check color contrast ratios
- **Color History** - Save recently used colors
- **Export Palettes** - Export color palettes in various formats
- **Color Blindness Simulator** - Show how colors appear with color blindness
- **Advanced Color Spaces** - Add LAB, LCH, XYZ color spaces

## ❓ Questions?

Feel free to:
- Open an issue with the `question` label
- Start a discussion in GitHub Discussions
- Reach out to the maintainers

## 🙏 Recognition

Contributors will be recognized in our README.md file. Thank you for your contributions!

---

**Happy Contributing!** 🎨
