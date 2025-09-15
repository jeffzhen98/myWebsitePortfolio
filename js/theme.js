/*
==========================================
THEME MANAGEMENT
==========================================
Easy to extend with new themes and persistence options
*/

class ThemeManager {
    constructor() {
        this.currentTheme = 'dark';
        this.themes = ['dark', 'light'];
        this.themeToggle = document.getElementById('themeToggle');
        this.init();
    }

    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add event listener
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        this.updateToggleButton();
    }

    toggleTheme() {
        const currentIndex = this.themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % this.themes.length;
        const nextTheme = this.themes[nextIndex];
        this.setTheme(nextTheme);
    }

    updateToggleButton() {
        if (this.themeToggle) {
            const icons = {
                dark: '🌙',
                light: '☀️'
            };
            this.themeToggle.textContent = icons[this.currentTheme] || '🌙';
        }
    }

    // Add new theme method
    addTheme(name, variables) {
        if (!this.themes.includes(name)) {
            this.themes.push(name);
            
            // Dynamically add CSS variables for new theme
            const style = document.createElement('style');
            style.textContent = `[data-theme="${name}"] { ${variables} }`;
            document.head.appendChild(style);
        }
    }
}

// Initialize theme manager when DOM is loaded
const themeManager = new ThemeManager();