// Project loading functionality
async function loadProjects() {
    const projectsContainer = document.getElementById('projects-container');
    const loadingElement = document.getElementById('projects-loading');
    
    try {
        // Show loading state
        loadingElement.style.display = 'block';
        projectsContainer.style.display = 'none';
        
        const response = await fetch('https://raw.githubusercontent.com/Juanto19/Juanto19.github.io/main/static/data/projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Clear loading state
        loadingElement.style.display = 'none';
        projectsContainer.style.display = 'grid';
        
        // Clear any existing projects
        projectsContainer.innerHTML = '';
        
        // Add each project
        data.projects.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            
            // Add animation delay based on index
            projectCard.style.animationDelay = `${index * 100}ms`;
            
            projectCard.innerHTML = `
                <div class="project-card-content">
                    <h4>${escapeHTML(project.title)}</h4>
                    <p>${escapeHTML(project.description)}</p>
                    <p>Technologies: ${project.technologies.map(tech => escapeHTML(tech)).join(', ')}</p>
                    <a href="${escapeHTML(project.link)}" 
                       target="_blank" 
                       rel="noopener noreferrer">
                       View Project
                    </a>
                </div>
            `;
            
            projectsContainer.appendChild(projectCard);
            
            // Trigger animation after a brief delay
            setTimeout(() => {
                projectCard.classList.add('animate-project');
            }, 50);
        });
        
    } catch (error) {
        console.error('Error loading projects:', error);
        loadingElement.innerHTML = 'Error loading projects. Please try again later.';
        loadingElement.style.color = '#ff0000';
    }
}

// Helper function to escape HTML and prevent XSS
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Load projects when the page loads
document.addEventListener("DOMContentLoaded", function() {
    loadProjects();
});


// Add refresh functionality (optional)
function addRefreshButton() {
    const projectsSection = document.getElementById('projects');
    const refreshButton = document.createElement('button');
    refreshButton.textContent = 'Refresh Projects';
    refreshButton.className = 'refresh-button';
    refreshButton.onclick = loadProjects;
    projectsSection.insertBefore(refreshButton, projectsSection.firstChild);
}