const logoutButton = document.querySelector('.navButton.logout');
logoutButton.addEventListener('click', logout);

function logout() {
    window.location.href = "/";
    sessionStorage.removeItem("sessionToken");
  }