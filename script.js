// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without reload
            history.pushState(null, null, targetId);
        }
    });
});

// Projects carousel navigation
const carousel = document.getElementById('carousel');
const leftBtn = document.getElementById('scroll-left');
const rightBtn = document.getElementById('scroll-right');

leftBtn.addEventListener('click', () => {
    carousel.scrollBy({
        left: -300,
        behavior: 'smooth'
    });
});

rightBtn.addEventListener('click', () => {
    carousel.scrollBy({
        left: 300,
        behavior: 'smooth'
    });
});

// Project modal functionality
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('project-modal');
const closeModal = document.querySelector('.close-modal');
const modalBody = document.querySelector('.modal-body');

// Sample project data (replace with your actual projects)
const projectsData = {
  1: {
        title: "LibriCode",
        description: "LibriCode is an online platform for programming books, organized by category and programming language. Users can search, read, download, rate books (out of 5 stars), and even contribute by adding their own books.",
        image: "images/homeLibricode.png",
        technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
        link: "https://libricode.iceiy.com/",
        environment: "Built using VS Code, XAMPP, and phpMyAdmin for local development"
    },
    2: {
        title: "University System",
        description: "Student information system for managing courses, grades, and faculty information.",
        image: "https://via.placeholder.com/800x500?text=University+System",
        technologies: ["Java", "JavaFX", "SQLite"],
        link: "#",
        environment: "Built with Java SE and JavaFX for desktop interface"
    },
    3: {
        title: "Mobile App",
        description: "Cross-platform mobile application for task management with offline capabilities.",
        image: "https://via.placeholder.com/800x500?text=Mobile+App",
        technologies: ["React Native", "Firebase", "Redux"],
        link: "#",
        environment: "Developed using React Native framework"
    },
    4: {
        title: "E-commerce Site",
        description: "Full-featured online store with product catalog, shopping cart, and payment integration.",
        image: "https://via.placeholder.com/800x500?text=E-commerce+Site",
        technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
        link: "#",
        environment: "MERN stack application"
    }
};

// Open modal with project details
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        const project = projectsData[projectId];
        
        if (project) {
            modalBody.innerHTML = `
                <h2>${project.title}</h2>
                <img src="${project.image}" alt="${project.title}" class="modal-project-image">
                <p class="modal-description">${project.description}</p>
                
                <div class="modal-details">
                    <h3>Development Environment</h3>
                    <p>${project.environment}</p>
                    
                    <h3>Technologies Used</h3>
                    <ul class="tech-list">
                        ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
                    </ul>
                    
                    ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">View Project</a>` : ''}
                </div>
            `;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the data to a server
        // For now, we'll just log it and show an alert
        console.log({ name, email, message });
        
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Add active class to current section in navigation
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.header-right ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.header-right ul');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.header-right ul li a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});