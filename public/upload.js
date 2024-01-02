// Function to go back to the main page
function goBack() {
    window.location.href = 'index.html'; // Replace with your actual main page URL
}

// Function to handle file selection
function browseFiles() {
    document.getElementById('image').click();
}

// Function to handle drop event
function handleDrop(event) {
    event.preventDefault();
    var files = event.dataTransfer.files;

    // Handle the dropped files (you can implement your logic here)
    handleFiles(files);
}

// Function to handle file input change event
function handleFileInputChange(event) {
    var files = event.target.files;

    // Handle the selected files (you can implement your logic here)
    handleFiles(files);
}

// Function to handle both drop and input file selection
function handleFiles(files) {
    // Process each file (you can customize this part based on your needs)
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        // Implement your logic to handle the file (e.g., display preview, upload to server, etc.)
        console.log('File Name:', file.name);
    }
}

// Event listeners for drag and drop area
var dropArea = document.getElementById('dropArea');
dropArea.addEventListener('dragover', function (event) {
    event.preventDefault();
    dropArea.classList.add('background-hover');
});

dropArea.addEventListener('dragleave', function () {
    dropArea.classList.remove('background-hover');
});

dropArea.addEventListener('drop', handleDrop);

// Event listener for file input change
var fileInput = document.getElementById('image');
fileInput.addEventListener('change', handleFileInputChange);



// <!-- JavaScript for Upload Page -->

// Function to go back to the main page
function goBack() {
    window.location.href = 'index.html'; // Replace with your actual main page URL
}

// Function to handle image upload

function uploadImage() {
    var formData = new FormData(document.getElementById('uploadForm'));

    // Implement your logic to send the form data to the server
    // For example, using AJAX or submitting the form

    // After successful upload, you may want to redirect to the main page
    alert('Image uploaded successfully!');
    goBack();
}