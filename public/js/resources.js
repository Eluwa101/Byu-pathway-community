document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('/content/resources');
      if (!response.ok) throw new Error('Failed to fetch resource data');
      const resources = await response.json();
  
      const container = document.getElementById('resources-container');
      container.innerHTML = resources.map(resource => `
        <div class="resource-card">
          <h3>${resource.title}</h3>
          <p><strong>Course:</strong> ${resource.course}</p>
          <p>${resource.description}</p>
          <a href="${resource.link}" target="_blank">View Resource</a>
        </div>
      `).join('');
    } catch (err) {
      console.error(err);
      document.getElementById('resources-container').textContent = 'Error loading resources.';
    }
  });
  