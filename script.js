// Color Picker and Display Logic
const colorPicker = document.getElementById('colorPicker');
const randomColorBtn = document.getElementById('randomColorBtn');
const colorPreview = document.getElementById('colorPreview');
const hexValue = document.getElementById('hexValue');
const rgbValue = document.getElementById('rgbValue');
const hslValue = document.getElementById('hslValue');
const cmykValue = document.getElementById('cmykValue');
const shadesContainer = document.getElementById('shadesContainer');
const uploadBtn = document.getElementById('uploadBtn');
const imageUpload = document.getElementById('imageUpload');
const imageCanvas = document.getElementById('imageCanvas');
const extractedColors = document.getElementById('extractedColors');
const notification = document.getElementById('notification');

// Initialize with default color
updateColorDisplay(colorPicker.value);

// Event Listeners
colorPicker.addEventListener('input', (e) => {
    updateColorDisplay(e.target.value);
});

randomColorBtn.addEventListener('click', () => {
    const randomColor = generateRandomColor();
    colorPicker.value = randomColor;
    updateColorDisplay(randomColor);
});

uploadBtn.addEventListener('click', () => {
    imageUpload.click();
});

imageUpload.addEventListener('change', handleImageUpload);

// Add copy functionality to all copy buttons
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const copyType = e.target.dataset.copy;
        copyColorValue(copyType);
    });
});

// Color Conversion Functions
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function rgbToCmyk(r, g, b) {
    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);
    let k = Math.min(c, m, y);

    if (k === 1) {
        c = m = y = 0;
    } else {
        c = (c - k) / (1 - k);
        m = (m - k) / (1 - k);
        y = (y - k) / (1 - k);
    }

    return {
        c: Math.round(c * 100),
        m: Math.round(m * 100),
        y: Math.round(y * 100),
        k: Math.round(k * 100)
    };
}

function generateRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

function lightenColor(hex, percent) {
    const rgb = hexToRgb(hex);
    const r = Math.min(255, Math.round(rgb.r + (255 - rgb.r) * percent));
    const g = Math.min(255, Math.round(rgb.g + (255 - rgb.g) * percent));
    const b = Math.min(255, Math.round(rgb.b + (255 - rgb.b) * percent));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function darkenColor(hex, percent) {
    const rgb = hexToRgb(hex);
    const r = Math.max(0, Math.round(rgb.r * (1 - percent)));
    const g = Math.max(0, Math.round(rgb.g * (1 - percent)));
    const b = Math.max(0, Math.round(rgb.b * (1 - percent)));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function getTextColor(hex) {
    const rgb = hexToRgb(hex);
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
}

// Update Display Functions
function updateColorDisplay(hex) {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

    // Update preview
    colorPreview.style.backgroundColor = hex;

    // Update color values
    hexValue.textContent = hex.toUpperCase();
    rgbValue.textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    hslValue.textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    cmykValue.textContent = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;

    // Generate shades
    generateShades(hex);
}

function generateShades(hex) {
    shadesContainer.innerHTML = '';
    
    // Generate lighter shades
    for (let i = 4; i >= 1; i--) {
        const shade = lightenColor(hex, i * 0.15);
        createShadeItem(shade);
    }
    
    // Add original color
    createShadeItem(hex);
    
    // Generate darker shades
    for (let i = 1; i <= 4; i++) {
        const shade = darkenColor(hex, i * 0.15);
        createShadeItem(shade);
    }
}

function createShadeItem(color) {
    const item = document.createElement('div');
    item.className = 'shade-item';
    item.style.backgroundColor = color;
    item.style.color = getTextColor(color);
    item.textContent = color.toUpperCase();
    item.addEventListener('click', () => {
        colorPicker.value = color;
        updateColorDisplay(color);
        showNotification('Color selected!');
    });
    shadesContainer.appendChild(item);
}

// Image Upload and Color Extraction
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            extractColorsFromImage(img);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

function extractColorsFromImage(img) {
    const canvas = imageCanvas;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = img.width;
    canvas.height = img.height;
    
    // Draw image
    ctx.drawImage(img, 0, 0);
    
    // Extract colors
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    const colorMap = new Map();
    
    // Sample every nth pixel to get dominant colors
    const sampleRate = 10;
    for (let i = 0; i < pixels.length; i += 4 * sampleRate) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        
        colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
    }
    
    // Get top 10 colors
    const sortedColors = Array.from(colorMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(entry => entry[0]);
    
    displayExtractedColors(sortedColors);
}

function displayExtractedColors(colors) {
    extractedColors.innerHTML = '';
    
    colors.forEach(color => {
        const item = document.createElement('div');
        item.className = 'extracted-color-item';
        item.style.backgroundColor = color;
        item.style.color = getTextColor(color);
        item.textContent = color.toUpperCase();
        item.addEventListener('click', () => {
            colorPicker.value = color;
            updateColorDisplay(color);
            showNotification('Color selected!');
        });
        extractedColors.appendChild(item);
    });
    
    showNotification('Colors extracted successfully!');
}

// Copy to Clipboard
function copyColorValue(type) {
    let textToCopy = '';
    
    switch(type) {
        case 'hex':
            textToCopy = hexValue.textContent;
            break;
        case 'rgb':
            textToCopy = rgbValue.textContent;
            break;
        case 'hsl':
            textToCopy = hslValue.textContent;
            break;
        case 'cmyk':
            textToCopy = cmykValue.textContent;
            break;
    }
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        showNotification(`${type.toUpperCase()} copied to clipboard!`);
    }).catch(err => {
        console.error('Failed to copy:', err);
        showNotification('Failed to copy to clipboard', 'error');
    });
}

// Notification System
function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.style.backgroundColor = type === 'error' ? 'var(--danger-color)' : 'var(--secondary-color)';
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'r' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        randomColorBtn.click();
    }
});
