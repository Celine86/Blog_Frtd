document.getElementById('logout').addEventListener('click', async function logout(e) {
    e.preventDefault();
    sessionStorage.removeItem("email")
    sessionStorage.removeItem("isAuthenticated")
    sessionStorage.removeItem("loginmsg")
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("useremail")
    sessionStorage.removeItem("username")
    window.location = 'index.html';
});
