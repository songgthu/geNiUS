const sessionToken = sessionStorage.getItem("sessionToken");
if (sessionToken) {
    const welcomeElement = document.getElementById('welcome');
    const u = window.sessionStorage.getItem("username");
    welcomeElement.textContent = `Welcome, ${u}!`;
} else {
    window.location.href = "/login.html";
    alert('Your login session expired, please login again');
}


