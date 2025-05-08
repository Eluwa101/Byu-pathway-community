// public/js/loadShared.js
export function loadSharedElements() {
    fetch('/partials/nav.html')
      .then(res => res.text())
      .then(html => {
        document.body.insertAdjacentHTML('afterbegin', html);
      });
  
    fetch('/partials/footer.html')
      .then(res => res.text())
      .then(html => {
        document.body.insertAdjacentHTML('beforeend', html);
      });
  }
  