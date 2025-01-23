// Import Firebase storage
const firebaseApp = firebase.initializeApp({
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
});
const storage = firebaseApp.storage();

// DOM Elements
const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const saveButton = document.getElementById('saveButton');

let selectedFile;

// Handle file selection
fileInput.addEventListener('change', (event) => {
    selectedFile = event.target.files[0];
    if (selectedFile) {
        alert(`Selected file: ${selectedFile.name}`);
    }
});

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
            });
        }
    );
});
