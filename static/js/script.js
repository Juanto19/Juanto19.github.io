// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        if (targetId) {
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add active class to navigation links and animate sections
function handleScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
            section.classList.add('animate');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// Initial call to handleScroll
window.addEventListener('load', handleScroll);

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

// Add resize event listener to recalculate section positions
window.addEventListener('resize', handleScroll);

// Animate skill buttons
function animateSkillButtons() {
    const skillButtons = document.querySelectorAll('.skill-button');
    skillButtons.forEach((button, index) => {
        button.style.animationDelay = `${index * 50}ms`;
        button.classList.add('animate-skill');
    });
}

// Call animation function when the page loads
window.addEventListener('load', animateSkillButtons);