function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
  
    elements.forEach(element => {
      const file = element.getAttribute('data-include');
  
      fetch(file)
        .then(response => {
          if (response.ok) {
            return response.text();
          }
          throw new Error('Erreur de chargement de fichier : ' + file);
        })
        .then(content => {
          element.innerHTML = content;
        })
        .catch(error => {
          console.error(error);
        });
    });
  }

document.addEventListener('DOMContentLoaded', includeHTML);
  