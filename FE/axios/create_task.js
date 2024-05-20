const tokenCheck = window.check();
const email = localStorage.getItem("emailUser");
if (tokenCheck != -1) {
    document.getElementById('form-create-task').addEventListener('submit', async function (event) {
        event.preventDefault();
        const taskName = document.getElementById('task-name').value;
        const endDate = document.getElementById('end-date').value;
        const priority = document.getElementById('priority').value;
        const category = document.getElementById('category').value;
        const taskDesc = document.getElementById('task-desc').value;
        const endDateObj = new Date(endDate);
        const formattedEndDate = endDateObj.getFullYear() + '-' +
            ('0' + (endDateObj.getMonth() + 1)).slice(-2) + '-' +
            ('0' + endDateObj.getDate()).slice(-2) + ' ' +
            ('0' + endDateObj.getHours()).slice(-2) + ':' +
            ('0' + endDateObj.getMinutes()).slice(-2) + ':' +
            ('0' + endDateObj.getSeconds()).slice(-2);
        const startDay = new Date();
        const formattedDate = startDay.getFullYear() + '-' +
            ('0' + (startDay.getMonth() + 1)).slice(-2) + '-' +
            ('0' + startDay.getDate()).slice(-2) + ' ' +
            ('0' + startDay.getHours()).slice(-2) + ':' +
            ('0' + startDay.getMinutes()).slice(-2) + ':' +
            ('0' + startDay.getSeconds()).slice(-2);
        if (taskName != '' && taskDesc != '') {
            try {
                const res = await axios.post('http://localhost:3036/api/v1/task/create', {
                    taskTitle: taskName,
                    taskLevel: priority,
                    taskType: category,
                    endDay: formattedEndDate,
                    startDay: formattedDate,
                    status: false,
                    descTask: taskDesc,
                    email:email
                });
                if (res.status === 200) {
                    alert("Add task successful");
                }
                else {
                    alert("Add task fail");
                }
            } catch (error) {
                alert(error);
            }
        }
        else {
            alert("Nhap day du cac thong tin")
        }
    })
}
else {
    alert("Bạn chưa đăng nhập");
    window.location.href = "login.html";
}
let nameUser = localStorage.getItem("userCurrent");
document.querySelector(".info-name").textContent = nameUser;