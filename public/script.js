document.addEventListener('DOMContentLoaded', function () {
    // Gestion des formulaires avec confirmation
    const deleteButtons = document.querySelectorAll('.btn-danger');
    deleteButtons.forEach(function (button) {
      button.addEventListener('click', function (e) {
        const userConfirmation = confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');
        if (!userConfirmation) {
          e.preventDefault();
        }
      });
    });
  
    // Effet de survol pour les boutons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(function (button) {
      button.addEventListener('mouseover', function () {
        button.classList.add('button-hover');
      });
      button.addEventListener('mouseout', function () {
        button.classList.remove('button-hover');
      });
    });
  
    // Gestion d'alertes (messages contextuels après une action)
    const alertBoxes = document.querySelectorAll('.alert');
    alertBoxes.forEach(function (alertBox) {
      setTimeout(function () {
        alertBox.style.display = 'none';
      }, 3000); // Masquer après 3 secondes
    });
  
    // Animation d'apparition pour les pages
    const fadeInElements = document.querySelectorAll('.fadeIn');
    fadeInElements.forEach(function (el) {
      el.classList.add('visible');
    });
  });
  