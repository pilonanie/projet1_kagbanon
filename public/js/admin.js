document.addEventListener('DOMContentLoaded', async () => {
    const userTableBody = document.querySelector('#userTable tbody');
    const addUserForm = document.getElementById('addUserForm');

    // Charger les utilisateurs
    async function loadUsers() {
        const response = await fetch('/api/users');
        const users = await response.json();
        userTableBody.innerHTML = '';
        users.forEach(user => {
            const row = `<tr>
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.role}</td>
                <td>
                    <button onclick="deleteUser(${user.id})">Supprimer</button>
                </td>
            </tr>`;
            userTableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    // Ajouter un utilisateur
    addUserForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(addUserForm);
        await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData)),
        });
        loadUsers();
    });

    // Supprimer un utilisateur
    window.deleteUser = async (id) => {
        await fetch(`/api/users/${id}`, { method: 'DELETE' });
        loadUsers();
    };

    loadUsers();
});
