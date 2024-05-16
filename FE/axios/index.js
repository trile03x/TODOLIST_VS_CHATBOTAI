function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await axios.get('http://localhost:3036/api/v1/task');
        const tasks = response.data;
        const runningTasksContainer = document.querySelector("#running-tasks .task-list");
        const completedTasksContainer = document.querySelector("#completed-tasks .task-list");
        tasks.forEach(task => {
            const taskItem = document.createElement("div");
            taskItem.className = "task-item";
            const startDay = formatDate(task.startDay);
            const endDay = formatDate(task.endDay);
            if (task.status === false) {

                taskItem.innerHTML = `
          <div class="row">
            <h3 class="task-name">${task.taskTitle}</h3>
            <img src="./assets/icons/info-icon.svg" alt="" class="icon" />
          </div>
          <div class="row">
            <p class="task-date">Start date: <span>${startDay}</span></p>
            <img src="./assets/icons/edit-icon.svg" alt="" class="icon" />
          </div>
          <div class="row">
            <div class="task-completed">
              <img src="./assets/icons/mark-icon.svg" alt="" class="icon" />
              <p class="task-desc">Mark as completed</p>
            </div>
            <img src="./assets/icons/delete-icon.svg" alt="" class="icon" />
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
              <img src="./assets/icons/check-icon.svg" alt="" class="icon" />
              <p class="task-desc">Completed</p>
            </div>
          </div>
          <div class="column">
            <img src="./assets/icons/info-icon.svg" alt="" class="icon" />
            <img src="./assets/icons/edit-icon.svg" alt="" class="icon" />
            <img src="./assets/icons/delete-icon.svg" alt="" class="icon" />
          </div>
        `;
                completedTasksContainer.appendChild(taskItem);
            }
        });
    } catch (error) {
        alert(error)
    }
    // const tasks = [
    //   { name: "Learn JavaScript", startDate: "07-07-2023", endDate: null, status: "running" },
    //   { name: "Learn HTML", startDate: "06-07-2023", endDate: "07-07-2023", status: "completed" },
    //   // Add more tasks as needed
    // ];


});
