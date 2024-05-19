
document.getElementById('form-1').addEventListener('submit', async function (event) {
    event.preventDefault();
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const password_confirmation = document.getElementById('password_confirmation').value;
    if(password===password_confirmation){
        try {
            const res = await axios.post('http://localhost:3036/api/v1/users/register', {
                name: fullname,
                email: email,
                pass: password
            });
            if (res.status === 200) {
                alert("Register successful ");
            }
        } catch {
            alert("Email exits");
            document.getElementById('email').value='';
        }
    }
    else{
        alert("Xác thực lại mật khẩu");
        document.getElementById('password_confirmation').value="";
        document.getElementById('password').value="";
    }
});