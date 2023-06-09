const sessionToken = sessionStorage.getItem("sessionToken");
if (sessionToken) {
    const welcomeElement = document.getElementById('welcome');
    const u = window.sessionStorage.getItem("username");
    welcomeElement.textContent = `Welcome, ${u}!`;
    //const shortcutElement = document.querySelector(".shortcutList");
    //shortcutElement.innerHTML= sessionStorage.getItem("storedShortcuts");
} else {
    window.location.href = "/frontend/html/login.html";
}


