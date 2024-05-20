
let emailCheck = localStorage.getItem("emailUser");
document.addEventListener("DOMContentLoaded", async () => {
    const response = await axios.post("http://localhost:3036/api/v1/users/show", {
        email:emailCheck
    })
    const data = response.data;
    document.getElementById("fullname").value = data.name;
    document.getElementById("email").value = data.email;
})
document.getElementById("form-submit").addEventListener("click", async (event) => {
    event.preventDefault();
    let name = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    let passConfirm = document.getElementById("passConfirm").value;
    console.log(passConfirm);
    if(pass==""&&passConfirm==""){
        alert("Mật khẩu còn trống");
    }
    else{
        if (pass !== passConfirm){
            document.getElementById("password").value = "";
            document.getElementById("passConfirm").value = "";
            alert("Xác thực lại mật khẩu");    
        }
        else{
            try{
                const res = await axios.put("http://localhost:3036/api/v1/users/update", {
                    emailCheck,
                    name,
                    email,
                    pass,
                })
                if (res.status === 200) {
                    emailCheck = localStorage.setItem("emailUser",email);
                    alert("Đã cập nhật thông tin thành công");
                    localStorage.getItem("userCurrent",name);
                    window.history.back();
                }
            }catch(error){
                alert("Cập nhật thất bại");
            }
        }
    }
    
})

