const token = localStorage.getItem('token');
window.check = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return token;
    } else {
        return -1;
    }
};