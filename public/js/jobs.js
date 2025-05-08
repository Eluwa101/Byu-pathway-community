document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('/content/jobs');
      if (!response.ok) throw new Error('Failed to fetch job data');
      const jobs = await response.json();
      
      const container = document.getElementById('jobs-container');
      container.innerHTML = jobs.map(job => `
        <div class="job-card">
          <h3>${job.title}</h3>
          <p><strong>Company:</strong> ${job.company}</p>
          <p><strong>Location:</strong> ${job.location}</p>
          <p>${job.description}</p>
          <a href="${job.link}" target="_blank">Apply Now</a>
        </div>
      `).join('');
    } catch (err) {
      console.error(err);
      document.getElementById('jobs-container').textContent = 'Error loading jobs.';
    }
  });
  