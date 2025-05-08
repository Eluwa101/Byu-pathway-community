export async function loadForumContent() {
    try {
      const response = await fetch('/content/forum');
      const posts = await response.json();
  
      const container = document.getElementById('forum-content');
      container.innerHTML = posts.map(post => `
        <div class="forum-post">
          <h3>${post.title}</h3>
          <p><strong>${post.author}</strong></p>
          <p>${post.message}</p>
        </div>
      `).join('');
    } catch (error) {
      console.error('Error loading forum content:', error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', loadForumContent);
  