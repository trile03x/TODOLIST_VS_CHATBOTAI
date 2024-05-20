document.addEventListener("DOMContentLoaded", async () => {
  // Lấy task ID từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const taskId = urlParams.get("id");
  if (taskId) {
    try {
      const response = await axios.get(
        `http://localhost:3036/api/v1/task/${taskId}`
      );
      const task = response.data;
      // Điền thông tin vào các ô input
      document.getElementById("task-name").value = task.taskTitle;
      document.getElementById("end-date").value = task.endDay;
      document.getElementById("priority").value = task.taskLevel;
      document.getElementById("category").value = task.taskType;
      document.getElementById("task-desc").value = task.descTask;
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
  }
});

document.getElementById("form-update-task").addEventListener("submit", async function (event) {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get("id");
    const taskName = document.getElementById("task-name").value;
    const endDate = document.getElementById("end-date").value;
    const priority = document.getElementById("priority").value;
    const category = document.getElementById("category").value;
    const taskDesc = document.getElementById("task-desc").value;
    try {
      const response = await axios.put(`http://localhost:3036/api/v1/task/${taskId}`,
        {
          taskTitle: taskName,
          endDay: endDate,
          taskLevel: priority,
          taskType: category,
          descTask: taskDesc,
        }
      );
      if (response.status === 200) {
        alert("Updated");
      } else {
        alert("Update fail");
      }
      window.location.href = "all_task.html";
    } catch (error) {
      alert(error);
    }
  });
  let nameUser = localStorage.getItem("userCurrent");
  document.querySelector(".info-name").textContent = nameUser;