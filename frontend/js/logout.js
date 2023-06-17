const logoutButton = document.querySelector('.navButton.logout');
logoutButton.addEventListener('click', logout);

function logout() {
    window.location.href = "/frontend/html/index.html";
    sessionStorage.removeItem("sessionToken");
  }