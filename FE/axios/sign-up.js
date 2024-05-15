
document.getElementById('form-1').addEventListener('submit', async function (event) {
    event.preventDefault();
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const password_confirmation = document.getElementById('password_confirmation').value;
    try {
        const res = await axios.post('http://localhost:3036/api/v1/users/register', {
            name: fullname,
            email: email,
            pass: password
        });
        if (res.status === 200) {
            alert("Register successful ");
        }
        else {
            alert("Register fail ");
        }
    } catch (error) {
        alert(error);
    }
});