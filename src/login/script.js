function authenticate() {
  // Get the values from the form
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // Simulate authentication logic (replace this with your actual authentication logic)
  if (username === '1' && password === '1') {
    // Authentication successful, redirect to the dashboard
    window.location.href = './dash/index.html';
    alert("gone");
  } else {
      // Authentication failed, you can show an error message or handle it as needed
      alert('Invalid username or password');
  }
}

function register() {
  window.location.href='login/register.html'
}



function signup() {
  //your signup logic goes here
  window.location.href='../index.html'
  alert("Registration Successful.")
}
