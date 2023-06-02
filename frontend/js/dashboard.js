const sessionToken = sessionStorage.getItem("sessionToken");
if (sessionToken) {
    const welcomeElement = document.getElementById('welcome');
    const u = window.sessionStorage.getItem("username");
    welcomeElement.textContent = `Welcome, ${u}!`;
} else {
    window.location.href = "/frontend/html/login.html";
}


