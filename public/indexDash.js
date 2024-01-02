// Dummy data for images
const images = [
    { name: 'Image 1', url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4wppO?ver=c979' },
    { name: 'Image 2', url: 'https://th.bing.com/th?id=ORMS.cf3031747f33ad00d7876af59724817f&pid=Wdp&w=612&h=304&qlt=90&c=1&rs=1&dpr=1.25&p=0' },
    { name: 'Image 3', url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4wppO?ver=c979' },
    // Add more images as needed
];

// Function to render images in the gallery
function renderGallery() {
    const galleryContainer = document.querySelector('.gallery-container');

    // Clear existing content
    galleryContainer.innerHTML = '';

    // Loop through images and create gallery items
    images.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');

        const imgElement = document.createElement('img');
        imgElement.src = image.url;

        const imageName = document.createElement('div');
        imageName.classList.add('image-name');
        imageName.innerText = image.name;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i> Delete';
        // Add event listener to delete button
        deleteButton.addEventListener('click', () => deleteImage(index));

        galleryItem.appendChild(imgElement);
        galleryItem.appendChild(imageName);
        galleryItem.appendChild(deleteButton);

        galleryContainer.appendChild(galleryItem);
    });
}
function uploadPage() {
    window.location.href = 'upload.html';
}

function manageProfile(){
    window.location.href = 'profile.html';

}

// Function to delete an image
function deleteImage(index) {
    // Implement logic to delete the image from the array
    images.splice(index, 1);
    // Render the gallery again
    renderGallery();
}

// Initial render of the gallery
renderGallery();