const tokenCheck = window.check();
const email = localStorage.getItem("emailUser");
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
if (!tokenCheck) {
    alert("Bạn chưa đăng nhập");
    window.location.href = "login.html";
}
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get("http://localhost:3036/api/v1/task/RunOrDone", {
            params: {
                statusTask: true,
                email
            }
        });
        const tasks = response.data;
        // console.log(tasks);
        const taskListContainer = document.querySelector('.task-list');
        taskListContainer.innerHTML = ''; // Clear existing tasks

        tasks.forEach(task => {
            const taskItem = createTaskItem(task);
            taskListContainer.appendChild(taskItem);
        });
    } catch (error) {
        alert(error);
    }
});
// search
document.querySelector(".search-icon").addEventListener("click", async (event) => {
    event.preventDefault();
    try{
        const taskName = document.getElementById('task-name').value;
        const response = await axios.get("http://localhost:3036/api/v1/task/RunOrDone",
            {
                params: {
                    taskTitle: taskName,
                    email,
                    status: true
                }
            }
        );
        const tasks = response.data;
        console.log(tasks);
        const taskListContainer = document.querySelector('.task-list');
        taskListContainer.innerHTML = ''; // Clear existing tasks
    
        tasks.forEach(task => {
            const taskItem = createTaskItem(task);
            taskListContainer.appendChild(taskItem);
        });
    }catch(error){
        alert(error);
    }
})
function createTaskItem(task) {
    const taskItem = document.createElement('div');
    startDay = formatDate(task.startDay);
    let level;
    if (task.priority == 1) {
        level = "Low"
    }
    else if (task.priority == 2) {
        level = "Medium"
    }
    else {
        level = "High"
    }
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `
    <div class="row">
      <h3 class="task-name">${task.taskTitle}</h3>
      <img src="./asstets/icons/icons8-bookmark-20.png" alt="" class="icon" />
    </div>
    <div class="row">
      <p class="task-date">Start date: <span>${startDay}</span></p>
      <img src="./asstets/icons/icons8-clock-20.png" alt="" class="icon" />
    </div>
    <div class="row">
      <div class="task-completed">
        <img src="./asstets/icons/mark-icon.svg" alt="" class="icon" />
        <p class="task-desc">Level : ${level}</p>
      </div>
      <img src="./asstets/icons/icons8-rank-20.png" alt="" class="icon" />
    </div>
  `;

    return taskItem;
}
let nameUser = localStorage.getItem("userCurrent");
document.querySelector(".info-name").textContent = nameUser;