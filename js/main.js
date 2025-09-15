/*
==========================================
MAIN APPLICATION LOGIC
==========================================
Contains project data, mobile menu, and other core functionality
*/

class PortfolioApp {
    constructor() {
        this.mobileToggle = document.getElementById('mobileToggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.projectsData = this.getProjectsData();
        this.init();
    }

    init() {
        // Initialize mobile menu
        this.initMobileMenu();
        
        // Load initial projects
        this.loadProjects();
        
        // Add keyboard navigation
        this.initKeyboardNavigation();
        
        // Add smooth scrolling for anchor links
        this.initSmoothScrolling();
        
        console.log('Portfolio app initialized');
    }

    initMobileMenu() {
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', () => {
                this.navMenu?.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.navMenu && 
                !this.navMenu.contains(e.target) && 
                !this.mobileToggle?.contains(e.target)) {
                this.navMenu.classList.remove('active');
            }
        });
    }

    initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.altKey) {
                switch(e.key) {
                    case '1':
                        router.navigateTo('home');
                        break;
                    case '2':
                        router.navigateTo('personal');
                        break;
                    case '3':
                        router.navigateTo('class');
                        break;
                    case '4':
                        router.navigateTo('other');
                        break;
                }
            }
        });
    }

    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href.length > 1) { // Not just "#"
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    getProjectsData() {
        // Move this to a separate JSON file or API endpoint for easier management
        return {
            featured: [
                {
                    title: "Featured Project 1",
                    description: "A brief description of your most impressive project. This could be a web application, mobile app, or any other significant work.",
                    technologies: ["React", "Node.js", "MongoDB"],
                    links: {
                        demo: "#",
                        github: "#"
                    }
                },
                {
                    title: "Featured Project 2",
                    description: "Another impressive project showcasing different skills and technologies. Highlight what makes this project special.",
                    technologies: ["Python", "Machine Learning", "TensorFlow"],
                    links: {
                        demo: "#",
                        github: "#"
                    }
                },
                {
                    title: "Featured Project 3",
                    description: "A third project that demonstrates your versatility and range as a developer or creator.",
                    technologies: ["Vue.js", "Firebase", "CSS3"],
                    links: {
                        demo: "#",
                        github: "#"
                    }
                }
            ],
            personal: [
                {
                    title: "Personal Project 1",
                    description: "Describe a personal project you've worked on. What motivated you to build it? What challenges did you overcome?",
                    technologies: ["JavaScript", "Express", "PostgreSQL"],
                    links: {
                        demo: "#",
                        github: "#"
                    }
                },
                {
                    title: "Personal Project 2",
                    description: "Another personal project showcasing your interests and technical skills. Maybe something you built to solve a real problem.",
                    technologies: ["Flutter", "Dart", "API Integration"],
                    links: {
                        demo: "#",
                        github: "#"
                    }
                }
            ],
            class: [
                {
                    title: "Data Structures Project",
                    description: "A comprehensive implementation of various data structures and algorithms, showcasing understanding of computational efficiency.",
                    technologies: ["Java", "Algorithms", "OOP"],
                    links: {
                        github: "#",
                        report: "#"
                    }
                },
                {
                    title: "Database Systems Project",
                    description: "Designed and implemented a complete database system for a real-world scenario, including normalization and optimization.",
                    technologies: ["SQL", "MySQL", "Database Design"],
                    links: {
                        github: "#",
                        documentation: "#"
                    }
                }
            ],
            other: [
                {
                    title: "Open Source Contribution",
                    description: "Contributions to popular open source projects, including bug fixes, feature additions, and documentation improvements.",
                    technologies: ["Git", "Open Source", "Collaboration"],
                    links: {
                        github: "#",
                        pullRequest: "#"
                    }
                },
                {
                    title: "Freelance Website",
                    description: "A custom website built for a client, showcasing ability to work with requirements and deliver professional solutions.",
                    technologies: ["WordPress", "PHP", "Custom Theme"],
                    links: {
                        demo: "#",
                        caseStudy: "#"
                    }
                }
            ]
        };
    }

loadProjects() {
    this.renderProjects('featured-projects', this.projectsData.featured);
    this.renderProjects('personal-projects', this.projectsData.personal);
    this.renderProjects('class-projects', this.projectsData.class);
    this.renderProjects('other-projects', this.projectsData.other);
}

renderProjects(containerId, projects) {
    const container = document.getElementById(containerId);
    if (!container || !projects) return;

    container.innerHTML = projects.map(project => `
        <div class="project-card">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => 
                    `<span class="tech-tag">${tech}</span>`
                ).join('')}
            </div>
            <div class="project-links">
                ${Object.entries(project.links).map(([key, url]) => 
                    `<a href="${url}" class="project-link">
                        ${this.getLinkIcon(key)} ${this.getLinkLabel(key)}
                    </a>`
                ).join('')}
            </div>
        </div>
    `).join('');
}

getLinkIcon(linkType) {
    const icons = {
        demo: '🔗',
        github: '📁',
        report: '📄',
        documentation: '📄',
        pullRequest: '🔗',
        caseStudy: '📄'
    };
    return icons[linkType] || '🔗';
}

getLinkLabel(linkType) {
    const labels = {
        demo: 'Live Demo',
        github: 'GitHub',
        report: 'Report',
        documentation: 'Documentation',
        pullRequest: 'Pull Request',
        caseStudy: 'Case Study'
    };
    return labels[linkType] || 'Link';
}

}
// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const app = new PortfolioApp();
});