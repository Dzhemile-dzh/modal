// Open the modal
document.getElementById('openModal').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'flex';
});

// Close the modal
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

// Filter table rows based on search input
function filterTable() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const rows = document.querySelectorAll('#taskTable tbody tr');

    rows.forEach(row => {
        const cells = Array.from(row.children);
        const rowText = cells.map(cell => cell.textContent.toLowerCase()).join(' ');
        row.style.display = rowText.includes(searchTerm) ? '' : 'none';
    });
}

// Trigger search on "Enter" key press
document.getElementById('search').addEventListener('keyup', (event) => {
    filterTable();
    if (event.key === 'Enter') {
        event.preventDefault();
        console.log("Enter pressed: Search triggered");
    }
});

// Refresh table data periodically
setInterval(() => {
    fetch('api.php?action=refresh')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#taskTable tbody');
            tableBody.innerHTML = '';
            data.forEach(task => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${task.task}</td>
                    <td>${task.title}</td>
                    <td>${task.description}</td>
                    <td style="background-color: ${task.colorCode};">${task.colorCode}</td>
                `;
                tableBody.appendChild(row);
            });
        });
}, 3600000); // Refresh every 60 minutes

// Handle image preview
document.getElementById('fileInput').addEventListener('change', function () {
    const file = this.files[0];
    const preview = document.getElementById('preview');

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        preview.src = '';
        preview.style.display = 'none';
    }
});
document.getElementById('saveImage').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select an image first!');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('upload.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert(data.message);
                console.log('Image saved at:', data.path);

                // Close the modal after successful upload
                document.getElementById('modal').style.display = 'none';

                // Optionally reset the input and preview
                fileInput.value = '';
                const preview = document.getElementById('preview');
                preview.src = '';
                preview.style.display = 'none';
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while saving the image.');
        });
});

