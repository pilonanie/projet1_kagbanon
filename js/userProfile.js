document.addEventListener('DOMContentLoaded', async () => {
    const updateProfileForm = document.getElementById('updateProfileForm');

    // Charger les informations utilisateur
    async function loadProfile() {
        const response = await fetch('/api/profile');
        const user = await response.json();
        document.getElementById('updateUsername').value = user.username;
    }

    // Mettre à jour le profil
    updateProfileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(updateProfileForm);
        await fetch('/api/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData)),
        });
        alert('Profil mis à jour avec succès');
    });

    loadProfile();
});
