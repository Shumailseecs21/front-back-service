var progressBar = document.querySelector('.progress-bar-inner');
var usageInfo = document.getElementById('usageInfo');

// Calculate percentage used
var totalStorage = 10 * 1024; // 10 MB in KBs
var usedStorage = 0; // Set the initial used storage

// Update progress bar and usage information
function updateProgressBar() {
    var percentageUsed = (usedStorage / totalStorage) * 100;
    progressBar.style.width = percentageUsed + '%';
    usageInfo.textContent = 'You have used ' + usedStorage + ' KBs out of ' + totalStorage + ' KBs';
}

// Example: Simulate increase in used storage (you can replace this with actual usage data)
function simulateUsageIncrease() {
    usedStorage += 500; // Increase by 500 KB for demonstration
    updateProgressBar();
}

// Simulate usage increase every second (remove this in a real-world scenario)

// setInterval(simulateUsageIncrease, 1000);

// Initial update
updateProgressBar();