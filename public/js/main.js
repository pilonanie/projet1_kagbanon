document.addEventListener("DOMContentLoaded", function() {
    const deleteButtons = document.querySelectorAll('.delete-user');
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const userId = event.target.dataset.userId;
            if (confirm('Are you sure you want to delete this user?')) {
                fetch(`/admin/delete/${userId}`, {
                    method: 'POST',
                }).then(() => {
                    location.reload();
                });
            }
        });
    });
});
