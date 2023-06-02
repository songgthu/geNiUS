const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', logout);

function logout() {
    window.location.href = "/frontend/html/index.html";
    sessionStorage.removeItem("sessionToken");
  }