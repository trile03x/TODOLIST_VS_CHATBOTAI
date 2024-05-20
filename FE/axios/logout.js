document.querySelector('.btn-logout').addEventListener("click",()=>{
    localStorage.clear();
    alert("Đăng xuất thành công")
    window.location.href="login.html";
})