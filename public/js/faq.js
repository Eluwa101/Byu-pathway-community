// public/js/faq.js
document.addEventListener('DOMContentLoaded', () => {
    fetch('/content/faq')
      .then(response => response.json())
      .then(data => {
        const faqContentDiv = document.getElementById('faq-content');
        
        data.forEach(faq => {
          const faqElement = document.createElement('div');
          faqElement.classList.add('faq-item');
          
          const questionElement = document.createElement('h3');
          questionElement.textContent = faq.question;
          
          const answerElement = document.createElement('p');
          answerElement.textContent = faq.answer;
          
          faqElement.appendChild(questionElement);
          faqElement.appendChild(answerElement);
          
          faqContentDiv.appendChild(faqElement);
        });
      })
      .catch(error => {
        console.error('Error loading FAQ data:', error);
      });
  });
  