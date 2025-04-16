const taskList = document.querySelector(".show-tasks ul"); //Task list
const inputTask = document.querySelector("#task"); //Text Input for adding new Task
const submitButton = document.querySelector(".submit-task-button"); //Button for adding a new Task
let taskArray = []; // Array to store tasks temporarely
const storedTasks = localStorage.getItem("tasks"); // Stored tasks from local storage

const darkmodeToggle = document.querySelector(".darkmode-toggle");
let darkMode = JSON.parse(localStorage.getItem("darkMode"));

darkmodeToggle.onclick = () => {
  document.body.classList.toggle("dark-mode");
  darkMode = !darkMode;

  localStorage.setItem("darkMode", JSON.stringify(darkMode));
};

document.addEventListener("DOMContentLoaded", () => {
  if (darkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  if (storedTasks) {
    taskArray = JSON.parse(storedTasks);

    taskArray.forEach((task) => {
      generatingTasks(task);
    });
  }
});

submitButton.onclick = (event) => {
  event.preventDefault();
  const taskText = inputTask.value.trim();
  if (taskText === "") return;

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  generatingTasks(newTask);

  taskArray.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(taskArray));

  inputTask.value = "";
};

function generatingTasks(task) {
  const newTask = document.createElement("li");
  const textContainer = document.createElement("span");
  textContainer.textContent = task.text;
  newTask.appendChild(textContainer);
  newTask.classList.add("fade-in");

  const buttonDiv = document.createElement("div");
  buttonDiv.innerHTML = `
    <button class="done-button">
     <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-circle icon-unchecked"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
                  /></svg
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-check-circle-fill icon-checked"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                  />
                </svg>
    </button>
    <button class='delete-button'>
     <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"
                  />
                </svg>
    </button>
    `;

  if (task.completed === false) {
    newTask.classList.remove("done");
  } else {
    newTask.classList.add("done");
  }

  const doneButton = buttonDiv.querySelector(".done-button");
  doneButton.addEventListener("click", () => {
    newTask.classList.toggle("done");
    taskArray = taskArray.map((t) => {
      if (t.id === task.id) {
        return {
          ...t,
          completed: !t.completed,
        };
      } else return t;
    });
    localStorage.setItem("tasks", JSON.stringify(taskArray));
  });

  const deleteButton = buttonDiv.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    newTask.classList.add("fade-out");
    setTimeout(() => {
      newTask.remove();
    }, 300);
    taskArray = taskArray.filter((t) => t.id !== task.id);
    localStorage.setItem("tasks", JSON.stringify(taskArray));
  });

  newTask.appendChild(buttonDiv);

  taskList.appendChild(newTask);
}
