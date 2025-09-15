/*
==========================================
PAGE ROUTING SYSTEM
==========================================
Simple client-side routing with animation support
*/

class Router {
    constructor() {
        this.currentPage = 'home';
        this.pages = new Map();
        this.navLinks = document.querySelectorAll('.nav-link');
        this.pageElements = document.querySelectorAll('.page');
        this.init();
    }

    init() {
        // Register all pages
        this.pageElements.forEach(page => {
            this.pages.set(page.id, page);
        });

        // Add navigation event listeners
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = link.getAttribute('data-page');
                this.navigateTo(pageId);
            });
        });

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            const pageId = e.state?.page || 'home';
            this.navigateTo(pageId, false);
        });

        // Set initial state
        history.replaceState({ page: this.currentPage }, '', `#${this.currentPage}`);
    }

    navigateTo(pageId, pushState = true) {
        if (!this.pages.has(pageId) || pageId === this.currentPage) {
            return;
        }

        // Hide current page
        const currentPageElement = this.pages.get(this.currentPage);
        if (currentPageElement) {
            currentPageElement.classList.remove('active');
        }

        // Show new page
        const newPageElement = this.pages.get(pageId);
        if (newPageElement) {
            newPageElement.classList.add('active');
        }

        // Update navigation
        this.updateNavigation(pageId);

        // Update browser history
        if (pushState) {
            history.pushState({ page: pageId }, '', `#${pageId}`);
        }

        // Update current page
        this.currentPage = pageId;

        // Update page title
        this.updatePageTitle(pageId);

        // Close mobile menu if open
        this.closeMobileMenu();

        // Trigger page change event
        this.onPageChange(pageId);
    }

    updateNavigation(activePageId) {
        this.navLinks.forEach(link => {
            const pageId = link.getAttribute('data-page');
            link.classList.toggle('active', pageId === activePageId);
        });
    }

    updatePageTitle(pageId) {
        const titles = {
            home: 'Your Portfolio',
            personal: 'Personal Projects - Your Portfolio',
            class: 'Class Projects - Your Portfolio',
            other: 'Other Work - Your Portfolio'
        };
        document.title = titles[pageId] || 'Your Portfolio';
    }

    closeMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }

    onPageChange(pageId) {
        // Override this method to add custom logic when page changes
        console.log(`Navigated to: ${pageId}`);
        
        // Example: Load page-specific data
        // this.loadPageData(pageId);
    }

    // Method to add new pages dynamically
    addPage(pageId, element) {
        this.pages.set(pageId, element);
    }
}

// Initialize router when DOM is loaded
const router = new Router();