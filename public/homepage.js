// DOM Elements
const uploadFileButton = document.getElementById('uploadFile');
const credentialsBox = document.getElementById('credentialsBox');
const submitCredentials = document.getElementById('submitCredentials');
const cancelCredentials = document.getElementById('cancelCredentials');
const adminPasswordInput = document.getElementById('adminPassword');

// Hardcoded admin credentials
const ADMIN_PASSWORD = "admin123";
const ADMIN_PASSWORD2 = "admin456";

// Handle "Upload File" click
uploadFileButton.addEventListener('click', () => {
    credentialsBox.classList.remove('hidden');
});

// Add this event listener for the "My Files" button
const myFilesButton = document.getElementById('myFiles');
myFilesButton.addEventListener('click', () => {
    window.location.href = 'myfiles.html'; // Redirect to myfiles page
});

// Handle "Submit" button in credentials box
submitCredentials.addEventListener('click', () => {
    const enteredPassword = adminPasswordInput.value;
    if (enteredPassword === ADMIN_PASSWORD || enteredPassword === ADMIN_PASSWORD2) {
        alert('Access Granted!');
        // Ensure the correct page is redirected
        window.location.href = '/upload_page.html'; // Correct URL for Firebase hosting
    } else {
        alert('Invalid Credentials. Try Again.');
    }
});

// Handle "Cancel" button in credentials box
cancelCredentials.addEventListener('click', () => {
    credentialsBox.classList.add('hidden');
    adminPasswordInput.value = ''; // Clear the password field
});
