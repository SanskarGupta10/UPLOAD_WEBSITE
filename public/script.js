// Initialize Firebase
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyChehyZoJCLQ5teGdLG6mfEMduQe5zkPL8",
    authDomain: "testing-project-ed675.firebaseapp.com",
    projectId: "testing-project-ed675",
    storageBucket: "testing-project-ed675.firebasestorage.app",
    messagingSenderId: "919188174861",
    appId: "1:919188174861:web:0e0d38c95987cc1a027d44",
});
const storage = firebaseApp.storage();

// DOM Elements
const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const saveButton = document.getElementById('saveButton');
const fileDisplay = document.getElementById('fileDisplay');

let selectedFile;

// Handle file selection
fileInput.addEventListener('change', (event) => {
    selectedFile = event.target.files[0];

    if (selectedFile) {
        const fileName = selectedFile.name;
        const fileType = selectedFile.type.split('/')[1];

        // Display selected file
        fileDisplay.innerHTML = `
            <p>Selected file: ${fileName} (${fileType.toUpperCase()})</p>
            <button id="deselectButton">Remove</button>
        `;

        // Handle file deselection
        document.getElementById('deselectButton').addEventListener('click', () => {
            deselectFile();
        });
    }
});

// Function to deselect the file
function deselectFile() {
    selectedFile = null;
    fileDisplay.innerHTML = '';
}

// Handle upload preparation
uploadButton.addEventListener('click', () => {
    if (!selectedFile) {
        alert('Please select a file first.');
        return;
    }
    alert('File is ready to upload. Click "Save File" to proceed.');
});

// Save file to Firebase Storage
saveButton.addEventListener('click', () => {
    if (!selectedFile) {
        alert('Please select a file first.');
        return;
    }

    // Reference to the storage bucket location
    const storageRef = storage.ref(`uploads/${selectedFile.name}`);
    const uploadTask = storageRef.put(selectedFile);

    // Monitor the upload progress
    uploadTask.on(
        'state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
        },
        (error) => {
            console.error('Upload failed:', error);
            alert('An error occurred during the upload. Please try again.');
        },
        () => {
            // Get the download URL upon successful upload
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                alert(`File uploaded successfully! Download URL: ${downloadURL}`);
                deselectFile(); // Clear the file display after successful upload
            });
        }
    );
});
