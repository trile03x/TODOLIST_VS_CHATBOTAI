const tokenCheck = window.check();
const email = localStorage.getItem("emailUser");
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
if (tokenCheck != -1) {
  document.addEventListener("DOMContentLoaded", async () => {
    const res = await axios.post("http://localhost:3036/api/v1/users/show", {
      email
    })
    const data = res.data;
    localStorage.setItem("userCurrent", data.name)
    try {
      const response = await axios.get("http://localhost:3036/api/v1/task/show", {
        params: { email }
      });
      const tasks = response.data;
      const runningTasksContainer = document.querySelector(
        "#running-tasks .task-list"
      );
      const completedTasksContainer = document.querySelector(
        "#completed-tasks .task-list"
      );
      tasks.forEach((task) => {
        if (task.taskLevel == 1) {
          const taskItem = document.createElement("div");
          taskItem.className = "task-item level1";
          const startDay = formatDate(task.startDay);
          if (task.status === false) {
            taskItem.innerHTML = `
              <div class="row">
                <h3 class="task-name">${task.taskTitle}</h3>
                
              </div>
              <div class="row">
                <p class="task-date">Start date: <span>${startDay}</span></p>
              </div>
              <div class="row">
                <div class="task-completed">
                  <input type="checkbox" class="mark" id="${task.id}"/>
                  <p class="task-desc">Mark as completed</p>
                </div>
              </div>
            `;
            runningTasksContainer.appendChild(taskItem);
          } else if (task.status === true) {
            const startDay = formatDate(task.startDay);
            const endDay = formatDate(task.endDay);
            taskItem.innerHTML = `
              <div class="column">
                <h3 class="task-name">${task.taskTitle}</h3>
                <p class="task-date">Start date: <span>${startDay}</span></p>
                <p class="task-date">End date: <span>${endDay}</span></p>
                <div class="task-completed">
                  <img src="./asstets/icons/check-icon.svg" alt="" class="icon" />
                  <p class="task-desc">Completed</p>
                </div>
              </div>
              
            `;
            completedTasksContainer.appendChild(taskItem);
          }
        } else if (task.taskLevel == 2) {
          const taskItem = document.createElement("div");
          taskItem.className = "task-item level2";
          const startDay = formatDate(task.startDay);
          if (task.status === false) {
            taskItem.innerHTML = `
              <div class="row">
                <h3 class="task-name">${task.taskTitle}</h3>
                
              </div>
              <div class="row">
                <p class="task-date">Start date: <span>${startDay}</span></p>
              </div>
              <div class="row">
              <div class="task-completed">
                <input type="checkbox" class="mark" id="${task.id}"/>
                <p class="task-desc">Mark as completed</p>
              </div>
            </div>
            `;
            runningTasksContainer.appendChild(taskItem);
          } else if (task.status === true) {
            const startDay = formatDate(task.startDay);
            const endDay = formatDate(task.endDay);
            taskItem.innerHTML = `
              <div class="column">
                <h3 class="task-name">${task.taskTitle}</h3>
                <p class="task-date">Start date: <span>${startDay}</span></p>
                <p class="task-date">End date: <span>${endDay}</span></p>
                <div class="task-completed">
                  <img src="./asstets/icons/check-icon.svg" alt="" class="icon" />
                  <p class="task-desc">Completed</p>
                </div>
              </div>
              
            `;
            completedTasksContainer.appendChild(taskItem);
          }
        } else {
          const taskItem = document.createElement("div");
          taskItem.className = "task-item level3";
          const startDay = formatDate(task.startDay);
          if (task.status === false) {
            taskItem.innerHTML = `
              <div class="row">
                <h3 class="task-name">${task.taskTitle}</h3>
              </div>
              <div class="row">
                <p class="task-date">Start date: <span>${startDay}</span></p>
              </div>
              <div class="row">
              <div class="task-completed">
                <input type="checkbox" class="mark" id="${task.id}"/>
                <p class="task-desc">Mark as completed</p>
              </div>
            </div>
            `;
            runningTasksContainer.appendChild(taskItem);
          } else if (task.status === true) {
            const startDay = formatDate(task.startDay);
            const endDay = formatDate(task.endDay);
            taskItem.innerHTML = `
              <div class="column">
                <h3 class="task-name">${task.taskTitle}</h3>
                <p class="task-date">Start date: <span>${startDay}</span></p>
                <p class="task-date">End date: <span>${endDay}</span></p>
                <div class="task-completed">
                  <img src="./asstets/icons/check-icon.svg" alt="" class="icon" />
                  <p class="task-desc">Completed</p>
                </div>
              </div>
              
            `;
            completedTasksContainer.appendChild(taskItem);
          }
        }
        //
      });
      document.querySelectorAll('.mark').forEach(checkbox => {
        checkbox.addEventListener('change', async (event) => {
          const taskId = event.target.getAttribute('id');
          const currentDate = new Date();
          const formattedDate = currentDate.getFullYear() + '-' +
            String(currentDate.getMonth() + 1).padStart(2, '0') + '-' +
            String(currentDate.getDate()).padStart(2, '0') + ' ' +
            String(currentDate.getHours()).padStart(2, '0') + ':' +
            String(currentDate.getMinutes()).padStart(2, '0') + ':' +
            String(currentDate.getSeconds()).padStart(2, '0');
          try {
            // Gửi yêu cầu cập nhật trạng thái của công việc
            const response = await axios.put(`http://localhost:3036/api/v1/task/${taskId}`,
              {
                status: true, // Đặt trạng thái thành true
                endDay: formattedDate
              });
            if (response.status === 200) {
              location.reload();
            }
          } catch (error) {
            console.error(error);
            alert('Failed to update task status');
          }
        });
      });

    } catch (error) {
      alert(error);
    }
  });
}
else {
  alert("Bạn chưa đăng nhập");
  window.location.href = "login.html";
}
let nameUser = localStorage.getItem("userCurrent");
document.querySelector(".info-name").textContent = nameUser;
