import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
import { getStorage, ref, listAll, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-storage.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyChehyZoJCLQ5teGdLG6mfEMduQe5zkPL8",
    authDomain: "testing-project-ed675.firebaseapp.com",
    projectId: "testing-project-ed675",
    storageBucket: "testing-project-ed675.firebasestorage.app",
    messagingSenderId: "919188174861",
    appId: "1:919188174861:web:0e0d38c95987cc1a027d44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// DOM Elements
const fileList = document.getElementById('fileList');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const backToHomepageBtn = document.getElementById('backToHomepage');

// Function to list files
async function listFiles() {
    const storageRef = ref(storage, 'uploads/');
    
    try {
        const fileListResult = await listAll(storageRef);
        fileList.innerHTML = ''; // Clear previous list

        fileListResult.items.forEach(async (itemRef) => {
            const fileName = itemRef.name;
            const downloadURL = await getDownloadURL(itemRef);
            
            const fileItem = document.createElement('div');
            fileItem.classList.add('file-item');
            fileItem.innerHTML = `
                <span class="file-name">${fileName}</span>
                <button class="download-btn" data-url="${downloadURL}">Download</button>
            `;
            
            fileList.appendChild(fileItem);
            
            // Add download event listener
            fileItem.querySelector('.download-btn').addEventListener('click', () => {
                const link = document.createElement('a');
                link.href = downloadURL;
                link.download = fileName;
                link.click();
            });
        });
    } catch (error) {
        console.error('Error listing files:', error);
    }
}

// Search functionality
function searchFiles() {
    const searchTerm = searchInput.value.toLowerCase();
    const fileItems = document.querySelectorAll('.file-item');
    
    fileItems.forEach(item => {
        const fileName = item.querySelector('.file-name').textContent.toLowerCase();
        item.style.display = fileName.includes(searchTerm) ? 'flex' : 'none';
    });
}

// Event Listeners
searchButton.addEventListener('click', searchFiles);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') searchFiles();
});

backToHomepageBtn.addEventListener('click', () => {
    window.location.href = 'homepage.html';
});

// Initial file list load
listFiles();