/**
 * Color Utilities Module
 * Provides functions for color conversion and manipulation
 */

const ColorUtils = {
    /**
     * Convert HEX to RGB
     * @param {string} hex - Hex color code (with or without #)
     * @returns {object} RGB object {r, g, b}
     */
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },

    /**
     * Convert RGB to HEX
     * @param {number} r - Red value (0-255)
     * @param {number} g - Green value (0-255)
     * @param {number} b - Blue value (0-255)
     * @returns {string} Hex color code
     */
    rgbToHex(r, g, b) {
        // Clamp values to valid range
        r = Math.max(0, Math.min(255, Math.round(r)));
        g = Math.max(0, Math.min(255, Math.round(g)));
        b = Math.max(0, Math.min(255, Math.round(b)));
        
        const toHex = (n) => {
            const hex = n.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return '#' + toHex(r) + toHex(g) + toHex(b);
    },

    /**
     * Convert RGB to HSL
     * @param {number} r - Red value (0-255)
     * @param {number} g - Green value (0-255)
     * @param {number} b - Blue value (0-255)
     * @returns {object} HSL object {h, s, l}
     */
    rgbToHsl(r, g, b) {
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
                case r:
                    h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                    break;
                case g:
                    h = ((b - r) / d + 2) / 6;
                    break;
                case b:
                    h = ((r - g) / d + 4) / 6;
                    break;
            }
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    },

    /**
     * Convert HSL to RGB
     * @param {number} h - Hue (0-360)
     * @param {number} s - Saturation (0-100)
     * @param {number} l - Lightness (0-100)
     * @returns {object} RGB object {r, g, b}
     */
    hslToRgb(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;

        let r, g, b;

        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;

            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    },

    /**
     * Convert RGB to CMYK
     * @param {number} r - Red value (0-255)
     * @param {number} g - Green value (0-255)
     * @param {number} b - Blue value (0-255)
     * @returns {object} CMYK object {c, m, y, k}
     */
    rgbToCmyk(r, g, b) {
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
    },

    /**
     * Get color brightness (for determining text color)
     * @param {number} r - Red value (0-255)
     * @param {number} g - Green value (0-255)
     * @param {number} b - Blue value (0-255)
     * @returns {number} Brightness value (0-255)
     */
    getBrightness(r, g, b) {
        return (r * 299 + g * 587 + b * 114) / 1000;
    },

    /**
     * Generate color shades (darker versions)
     * @param {string} hex - Base hex color
     * @param {number} count - Number of shades to generate
     * @returns {array} Array of hex colors
     */
    generateShades(hex, count = 5) {
        const rgb = this.hexToRgb(hex);
        const shades = [];
        
        for (let i = 1; i <= count; i++) {
            const factor = i / (count + 1);
            const r = Math.round(rgb.r * (1 - factor));
            const g = Math.round(rgb.g * (1 - factor));
            const b = Math.round(rgb.b * (1 - factor));
            shades.push(this.rgbToHex(r, g, b));
        }
        
        return shades;
    },

    /**
     * Generate color tints (lighter versions)
     * @param {string} hex - Base hex color
     * @param {number} count - Number of tints to generate
     * @returns {array} Array of hex colors
     */
    generateTints(hex, count = 5) {
        const rgb = this.hexToRgb(hex);
        const tints = [];
        
        for (let i = 1; i <= count; i++) {
            const factor = i / (count + 1);
            const r = Math.round(rgb.r + (255 - rgb.r) * factor);
            const g = Math.round(rgb.g + (255 - rgb.g) * factor);
            const b = Math.round(rgb.b + (255 - rgb.b) * factor);
            tints.push(this.rgbToHex(r, g, b));
        }
        
        return tints;
    },

    /**
     * Get color name (basic approximation)
     * @param {number} r - Red value (0-255)
     * @param {number} g - Green value (0-255)
     * @param {number} b - Blue value (0-255)
     * @returns {string} Color name
     */
    getColorName(r, g, b) {
        const { h, s, l } = this.rgbToHsl(r, g, b);

        // Check for grayscale
        if (s < 10) {
            if (l < 15) return 'Black';
            if (l < 30) return 'Very Dark Gray';
            if (l < 45) return 'Dark Gray';
            if (l < 60) return 'Gray';
            if (l < 75) return 'Light Gray';
            if (l < 90) return 'Very Light Gray';
            return 'White';
        }

        // Color names based on hue
        let colorName = '';
        
        if (h >= 0 && h < 15) colorName = 'Red';
        else if (h >= 15 && h < 45) colorName = 'Orange';
        else if (h >= 45 && h < 75) colorName = 'Yellow';
        else if (h >= 75 && h < 150) colorName = 'Green';
        else if (h >= 150 && h < 200) colorName = 'Cyan';
        else if (h >= 200 && h < 260) colorName = 'Blue';
        else if (h >= 260 && h < 300) colorName = 'Purple';
        else if (h >= 300 && h < 330) colorName = 'Magenta';
        else colorName = 'Red';

        // Add modifiers based on lightness
        if (l < 20) colorName = 'Very Dark ' + colorName;
        else if (l < 40) colorName = 'Dark ' + colorName;
        else if (l > 80) colorName = 'Very Light ' + colorName;
        else if (l > 60) colorName = 'Light ' + colorName;

        // Add saturation modifier
        if (s < 30) colorName = 'Grayish ' + colorName;
        else if (s > 80) colorName = 'Vivid ' + colorName;

        return colorName;
    },

    /**
     * Validate hex color
     * @param {string} hex - Hex color to validate
     * @returns {boolean} True if valid
     */
    isValidHex(hex) {
        return /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    },

    /**
     * Format hex color (ensure # prefix)
     * @param {string} hex - Hex color
     * @returns {string} Formatted hex color
     */
    formatHex(hex) {
        return hex.startsWith('#') ? hex : '#' + hex;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ColorUtils;
}
