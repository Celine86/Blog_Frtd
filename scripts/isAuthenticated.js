if (sessionStorage.getItem('isAuthenticated') !== 'true') {
    window.location = 'notauthorized.html';
}