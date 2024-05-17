function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

const btnSearch = document.getElementById("btn-search");
btnSearch.addEventListener("click", async () => {
    const category = document.getElementById("category").value;
    const priority = document.getElementById("priority").value;
    const status = document.getElementById("status").value;
    try {
        const response = await axios.post('http://localhost:3036/api/v1/task/filter', {
            taskLevel: priority,
            taskType: category,
            status: status
        });
        const tasks = response.data;
        const taskList = document.querySelector(".task-list");
        taskList.innerHTML = ""; // Clear existing task items
        tasks.forEach(task => {
            const startDay = formatDate(task.startDay);
            const taskItem = document.createElement("div");
            let statusTxt;
            if (task.status == false) {
                statusTxt = "Running";
            }
            else {
                statusTxt = "Completed";
            }
            taskItem.classList.add("task-item");
            taskItem.innerHTML = `
                <div class="row">
                    <h3 class="task-name">${task.taskTitle}</h3>
                    <img src="./asstets/icons/info-icon.svg" alt="" class="icon" />
                </div>
                <div class="row">
                    <p class="task-date">Start date: <span>${startDay}</span></p>
                    <img src="./asstets/icons/edit-icon.svg" alt="" class="icon" />
                </div>
                <div class="row">
                    <div class="task-completed">
                        <img src="./asstets/icons/icon-status.svg" alt="" class="icon" />
                        <p class="task-desc">Status: ${statusTxt}</p>
                    </div>
                    <img src="./asstets/icons/delete-icon.svg" alt="" class="icon" />
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    } catch (error) {
        alert(error);
    }
})