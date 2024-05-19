let checkStatus = false;
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
    const response = await axios.post(
      "http://localhost:3036/api/v1/task/filter",
      {
        taskLevel: priority,
        taskType: category,
        status: status,
      }
    );
    checkStatus = true;
    const tasks = response.data;
    const taskList = document.querySelector(".task-list");
    taskList.innerHTML = ""; // Clear existing task items
    tasks.forEach((task) => {
      const startDay = formatDate(task.startDay);
      const taskItem = document.createElement("div");
      let statusTxt;
      if (task.status == false) {
        statusTxt = "Running";
      } else {
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
                <img src="./asstets/icons/edit-icon.svg" alt="" class="icon btn-update" id="${task.id}" />
            </div>
            <div class="row">
                <div class="task-completed">
                    <img src="./asstets/icons/icon-status.svg" alt="" class="icon" />
                    <p class="task-desc">Status: ${statusTxt}</p>
                </div>
                <img class="icon btn-delete" src="./asstets/icons/delete-icon.svg" alt="" id="${task.id}" />
            </div>
        `;

      taskList.appendChild(taskItem);
      const btnUpdate = document.querySelectorAll(".btn-update");
      btnUpdate.forEach((btn) => {
        btn.addEventListener("click", updateTask);
      });
      const deleteBtn = document.querySelectorAll(".btn-delete");
      deleteBtn.forEach((btn) => {
        btn.addEventListener("click", deleteTask);
      });
    });
  } catch (error) {
    console.log(error);
  }
});
document.addEventListener("DOMContentLoaded", async () => {
  const category = document.getElementById("category").value;
  const priority = document.getElementById("priority").value;
  const status = document.getElementById("status").value;
  try {
    const response = await axios.post(
      "http://localhost:3036/api/v1/task/filter",
      {
        taskLevel: priority,
        taskType: category,
        status: status,
      }
    );
    const tasks = response.data;
    console.log(tasks);
    const taskList = document.querySelector(".task-list");
    taskList.innerHTML = "";
    tasks.forEach((task) => {
      const startDay = formatDate(task.startDay);
      const taskItem = document.createElement("div");
      let statusTxt;
      if (task.status == false) {
        statusTxt = "Running";
      } else {
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
                    <img src="./asstets/icons/edit-icon.svg" alt="" class="icon btn-update" id="${task.id}" />
                </div>
                <div class="row">
                    <div class="task-completed">
                        <img src="./asstets/icons/icon-status.svg" alt="" class="icon" />
                        <p class="task-desc">Status: ${statusTxt}</p>
                    </div>
                    <img  src="./asstets/icons/delete-icon.svg" alt="" class="icon btn-delete" id="${task.id}" />
                </div>
            `;
      taskList.appendChild(taskItem);
    });
  } catch (error) {
    alert("Nhập đủ đi cha");
  }
  // delete
  const deleteBtn = document.querySelectorAll(".btn-delete");
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", deleteTask);
  });
  const btnUpdate = document.querySelectorAll(".btn-update");
  btnUpdate.forEach((btn) => {
    btn.addEventListener("click", updateTask);
  });
});
async function deleteTask(event) {
  const taskId = event.target.getAttribute("id");
  const response = await axios.delete(
    `http://localhost:3036/api/v1/task/${taskId}`
  );
  if (response.status == 200) {
    alert("Removed");
    event.target.closest(".task-item").remove();
  } else {
    alert("Remove fail");
  }
}
async function updateTask(event) {
  const taskId = event.target.getAttribute("id");
  // console.log(taskId);
  try {
    window.location.href = `update_task.html?id=${taskId}`;
  } catch (error) {
    alert(error);
  }
}
