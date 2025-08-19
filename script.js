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

// Sample project data 
const projectsData = {
  1: {
        title: "LibriCode",
        description: "LibriCode is an online platform for programming books, organized by category and programming language. Users can search, read, download, rate books (out of 5 stars), and even contribute by adding their own books.",
        image: "images/Projects/homeLibriCode.png",
        technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
        link: "https://libricode.iceiy.com/",
        environment: "Built using VS Code, XAMPP, and phpMyAdmin for local development"
    },
    2: {
        title: "All-Energie - Corporate Website",
        description: "Website developped for Allenergie, an algerian company specializing in energy services and products, the site was built to highlight the company's profile, display its offerings, and strengthen its digital presence. ",
        image: "images/Projects/homeallenergy.png",
        technologies: ["HTML",  "CSS", "JavaScript"],
        link: "https://hanazerrouki.github.io/all-energie/",
        environment: "Built using VS Code"
    },
    3: {
    title: "Ziad Grapher - Photography & Event Services",
    description: "A modern responsive portfolio website for Ziad Grapher, a professional Algerian photographer specializing in weddings, graduations, and event services. The website showcases photography works, services, and contact options.",
    image: "images/Projects/ziadgrapher.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    link: "https://hanazerrouki.github.io/ziad-grapher/",
    environment: "Built using VS Code"
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
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        formStatus.textContent = 'Sending message...';
        formStatus.style.color = '#333';
        
        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formStatus.textContent = 'Thank you! Your message has been sent.';
                formStatus.style.color = 'green';
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            formStatus.textContent = 'Oops! There was a problem sending your message. Please try again.';
            formStatus.style.color = 'red';
            console.error('Form submission error:', error);
        }
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

// Scroll Reveal Animation
function revealOnScroll() {
    const elements = document.querySelectorAll('.section, .card-style, .section-title');
    const windowHeight = window.innerHeight;
    const revealPoint = 150; 

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('revealed');
        } else {
            element.classList.remove('revealed'); 
        }
    });
}

window.addEventListener('load', revealOnScroll);
window.addEventListener('scroll', revealOnScroll);