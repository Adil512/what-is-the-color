/**
 * Main Application Module
 * Handles all user interactions and color updates
 */

class ColorPickerApp {
    constructor() {
        // DOM Elements
        this.colorPicker = document.getElementById('colorPicker');
        this.colorPreview = document.getElementById('colorPreview');
        this.colorName = document.getElementById('colorName');
        
        // RGB Sliders
        this.redSlider = document.getElementById('redSlider');
        this.greenSlider = document.getElementById('greenSlider');
        this.blueSlider = document.getElementById('blueSlider');
        this.redValue = document.getElementById('redValue');
        this.greenValue = document.getElementById('greenValue');
        this.blueValue = document.getElementById('blueValue');
        
        // HSL Sliders
        this.hueSlider = document.getElementById('hueSlider');
        this.saturationSlider = document.getElementById('saturationSlider');
        this.lightnessSlider = document.getElementById('lightnessSlider');
        this.hueValue = document.getElementById('hueValue');
        this.saturationValue = document.getElementById('saturationValue');
        this.lightnessValue = document.getElementById('lightnessValue');
        
        // Format Inputs
        this.hexValue = document.getElementById('hexValue');
        this.rgbValue = document.getElementById('rgbValue');
        this.hslValue = document.getElementById('hslValue');
        this.cmykValue = document.getElementById('cmykValue');
        
        // Other Elements
        this.paletteGrid = document.getElementById('paletteGrid');
        this.savedColors = document.getElementById('savedColors');
        this.saveColorBtn = document.getElementById('saveColor');
        this.toast = document.getElementById('toast');
        
        // Current Color State
        this.currentColor = { r: 52, g: 152, b: 219 };
        
        // Saved colors from localStorage
        this.loadSavedColors();
        
        // Initialize
        this.initEventListeners();
        this.updateFromRGB();
    }
    
    /**
     * Initialize all event listeners
     */
    initEventListeners() {
        // Color Picker
        this.colorPicker.addEventListener('input', (e) => {
            const rgb = ColorUtils.hexToRgb(e.target.value);
            if (rgb) {
                this.currentColor = rgb;
                this.updateFromRGB();
            }
        });
        
        // RGB Sliders
        this.redSlider.addEventListener('input', () => this.handleRGBSliderChange());
        this.greenSlider.addEventListener('input', () => this.handleRGBSliderChange());
        this.blueSlider.addEventListener('input', () => this.handleRGBSliderChange());
        
        // HSL Sliders
        this.hueSlider.addEventListener('input', () => this.handleHSLSliderChange());
        this.saturationSlider.addEventListener('input', () => this.handleHSLSliderChange());
        this.lightnessSlider.addEventListener('input', () => this.handleHSLSliderChange());
        
        // Copy Buttons
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetId = e.target.getAttribute('data-target');
                const targetInput = document.getElementById(targetId);
                this.copyToClipboard(targetInput.value);
            });
        });
        
        // Save Color Button
        this.saveColorBtn.addEventListener('click', () => this.saveCurrentColor());
    }
    
    /**
     * Handle RGB slider changes
     */
    handleRGBSliderChange() {
        this.currentColor = {
            r: parseInt(this.redSlider.value),
            g: parseInt(this.greenSlider.value),
            b: parseInt(this.blueSlider.value)
        };
        this.updateFromRGB();
    }
    
    /**
     * Handle HSL slider changes
     */
    handleHSLSliderChange() {
        const h = parseInt(this.hueSlider.value);
        const s = parseInt(this.saturationSlider.value);
        const l = parseInt(this.lightnessSlider.value);
        
        const rgb = ColorUtils.hslToRgb(h, s, l);
        this.currentColor = rgb;
        this.updateFromRGB(false);
    }
    
    /**
     * Update all UI elements based on current RGB color
     * @param {boolean} updateHSL - Whether to update HSL sliders
     */
    updateFromRGB(updateHSL = true) {
        const { r, g, b } = this.currentColor;
        const hex = ColorUtils.rgbToHex(r, g, b);
        const hsl = ColorUtils.rgbToHsl(r, g, b);
        const cmyk = ColorUtils.rgbToCmyk(r, g, b);
        const colorName = ColorUtils.getColorName(r, g, b);
        
        // Update color preview
        this.colorPreview.style.backgroundColor = hex;
        this.colorName.textContent = colorName;
        
        // Update color picker
        this.colorPicker.value = hex;
        
        // Update RGB sliders
        this.redSlider.value = r;
        this.greenSlider.value = g;
        this.blueSlider.value = b;
        this.redValue.textContent = r;
        this.greenValue.textContent = g;
        this.blueValue.textContent = b;
        
        // Update HSL sliders (if not being changed)
        if (updateHSL) {
            this.hueSlider.value = hsl.h;
            this.saturationSlider.value = hsl.s;
            this.lightnessSlider.value = hsl.l;
            this.hueValue.textContent = hsl.h;
            this.saturationValue.textContent = hsl.s;
            this.lightnessValue.textContent = hsl.l;
        } else {
            // Update only the display values
            this.hueValue.textContent = this.hueSlider.value;
            this.saturationValue.textContent = this.saturationSlider.value;
            this.lightnessValue.textContent = this.lightnessSlider.value;
        }
        
        // Update format displays
        this.hexValue.value = hex.toUpperCase();
        this.rgbValue.value = `rgb(${r}, ${g}, ${b})`;
        this.hslValue.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        this.cmykValue.value = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
        
        // Update slider backgrounds
        this.updateSliderBackgrounds();
        
        // Update palette
        this.updatePalette(hex);
    }
    
    /**
     * Update slider backgrounds for visual feedback
     */
    updateSliderBackgrounds() {
        const { r, g, b } = this.currentColor;
        
        // Red slider
        this.redSlider.style.background = `linear-gradient(to right, 
            rgb(0, ${g}, ${b}), 
            rgb(255, ${g}, ${b}))`;
        
        // Green slider
        this.greenSlider.style.background = `linear-gradient(to right, 
            rgb(${r}, 0, ${b}), 
            rgb(${r}, 255, ${b}))`;
        
        // Blue slider
        this.blueSlider.style.background = `linear-gradient(to right, 
            rgb(${r}, ${g}, 0), 
            rgb(${r}, ${g}, 255))`;
        
        // Hue slider
        this.hueSlider.style.background = `linear-gradient(to right, 
            hsl(0, 100%, 50%), 
            hsl(60, 100%, 50%), 
            hsl(120, 100%, 50%), 
            hsl(180, 100%, 50%), 
            hsl(240, 100%, 50%), 
            hsl(300, 100%, 50%), 
            hsl(360, 100%, 50%))`;
        
        // Saturation slider
        const h = parseInt(this.hueSlider.value);
        const l = parseInt(this.lightnessSlider.value);
        this.saturationSlider.style.background = `linear-gradient(to right, 
            hsl(${h}, 0%, ${l}%), 
            hsl(${h}, 100%, ${l}%))`;
        
        // Lightness slider
        const s = parseInt(this.saturationSlider.value);
        this.lightnessSlider.style.background = `linear-gradient(to right, 
            hsl(${h}, ${s}%, 0%), 
            hsl(${h}, ${s}%, 50%), 
            hsl(${h}, ${s}%, 100%))`;
    }
    
    /**
     * Update the palette with shades and tints
     * @param {string} hex - Base hex color
     */
    updatePalette(hex) {
        const shades = ColorUtils.generateShades(hex, 5);
        const tints = ColorUtils.generateTints(hex, 5);
        const palette = [...tints.reverse(), hex, ...shades];
        
        this.paletteGrid.innerHTML = '';
        
        palette.forEach((color, index) => {
            const item = document.createElement('div');
            item.className = 'palette-item';
            item.style.backgroundColor = color;
            
            const label = document.createElement('span');
            label.className = 'palette-item-label';
            
            if (index < 5) {
                label.textContent = `+${(5 - index) * 20}%`;
            } else if (index === 5) {
                label.textContent = 'Base';
            } else {
                label.textContent = `-${(index - 5) * 20}%`;
            }
            
            item.appendChild(label);
            
            // Click to select this color
            item.addEventListener('click', () => {
                const rgb = ColorUtils.hexToRgb(color);
                if (rgb) {
                    this.currentColor = rgb;
                    this.updateFromRGB();
                    this.showToast(`Selected: ${color}`);
                }
            });
            
            this.paletteGrid.appendChild(item);
        });
    }
    
    /**
     * Copy text to clipboard
     * @param {string} text - Text to copy
     */
    copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                this.showToast(`Copied: ${text}`);
            }).catch(err => {
                console.error('Failed to copy:', err);
                this.showToast('Failed to copy to clipboard');
            });
        } else {
            // Fallback for browsers without Clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                this.showToast(`Copied: ${text}`);
            } catch (err) {
                console.error('Fallback copy failed:', err);
                this.showToast('Failed to copy to clipboard');
            }
            document.body.removeChild(textArea);
        }
    }
    
    /**
     * Show toast notification
     * @param {string} message - Message to display
     */
    showToast(message) {
        this.toast.textContent = message;
        this.toast.classList.add('show');
        
        setTimeout(() => {
            this.toast.classList.remove('show');
        }, 2000);
    }
    
    /**
     * Save current color to localStorage
     */
    saveCurrentColor() {
        const hex = ColorUtils.rgbToHex(
            this.currentColor.r, 
            this.currentColor.g, 
            this.currentColor.b
        );
        
        let savedColors = [];
        try {
            savedColors = JSON.parse(localStorage.getItem('savedColors') || '[]');
        } catch (err) {
            console.error('Error parsing saved colors:', err);
            savedColors = [];
        }
        
        // Avoid duplicates
        if (!savedColors.includes(hex)) {
            savedColors.push(hex);
            localStorage.setItem('savedColors', JSON.stringify(savedColors));
            this.loadSavedColors();
            this.showToast('Color saved!');
        } else {
            this.showToast('Color already saved');
        }
    }
    
    /**
     * Load saved colors from localStorage and display
     */
    loadSavedColors() {
        let savedColors = [];
        try {
            savedColors = JSON.parse(localStorage.getItem('savedColors') || '[]');
        } catch (err) {
            console.error('Error parsing saved colors:', err);
            savedColors = [];
        }
        
        this.savedColors.innerHTML = '';
        
        if (savedColors.length === 0) {
            this.savedColors.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">No saved colors yet</p>';
            return;
        }
        
        savedColors.forEach(color => {
            const item = document.createElement('div');
            item.className = 'saved-color-item';
            item.style.backgroundColor = color;
            
            const hexLabel = document.createElement('span');
            hexLabel.className = 'saved-color-hex';
            hexLabel.textContent = color.toUpperCase();
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-saved';
            deleteBtn.textContent = '×';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteSavedColor(color);
            });
            
            item.appendChild(hexLabel);
            item.appendChild(deleteBtn);
            
            // Click to load this color
            item.addEventListener('click', () => {
                const rgb = ColorUtils.hexToRgb(color);
                if (rgb) {
                    this.currentColor = rgb;
                    this.updateFromRGB();
                    this.showToast(`Loaded: ${color}`);
                }
            });
            
            this.savedColors.appendChild(item);
        });
    }
    
    /**
     * Delete a saved color
     * @param {string} colorToDelete - Hex color to delete
     */
    deleteSavedColor(colorToDelete) {
        let savedColors = [];
        try {
            savedColors = JSON.parse(localStorage.getItem('savedColors') || '[]');
        } catch (err) {
            console.error('Error parsing saved colors:', err);
            savedColors = [];
        }
        savedColors = savedColors.filter(color => color !== colorToDelete);
        localStorage.setItem('savedColors', JSON.stringify(savedColors));
        this.loadSavedColors();
        this.showToast('Color deleted');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ColorPickerApp();
});
