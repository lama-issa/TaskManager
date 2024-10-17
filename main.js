const arr = JSON.parse(localStorage.getItem("tasks")) || [];

// get the last task id stored in localStorage
let taskIdCounter = arr.length > 0 ? Math.max(...arr.map(task => task.id)) : 0;


const printMenu = () => {
  console.log(`Task Manager Menu:\n 1. Add Task \n 2. View Tasks \n 3. Toggle Task Completion \n 4. Edit Task \n 5. Delete Task \n 6. Exit \n 7. Search Task`);
};

// save tasks inside LocalStorage
const setOnLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(arr));
};

// addTask
const addTask = () => {
  const desc = prompt("Enter the task description:").trim();
  if (!desc) {
    console.log("Task description cannot be empty.");
    return;
  }
  
  const newTask = {
    id: ++taskIdCounter,
    description: desc,
    completion: "Not Completed",
  };

  arr.push(newTask);
  setOnLocalStorage();
  console.log(`Task added: "${newTask.description}"`);
};

// viewTasks
const viewTasks = () => {
  if (arr.length === 0) {
    console.log("No tasks available");
  } else {
    console.log("Tasks: ");
    arr.forEach(task => {
      console.log(`${task.id}. ${task.description} [${task.completion}]`);
    });
  }
};

// toggleTaskCompletion
const toggleTaskCompletion = () => {
  const compID = parseInt(prompt("Enter the task ID to toggle completion:"), 10);
  const task = arr.find(task => task.id === compID);

  if (!task) {
    console.log("Please enter a valid task ID");
    return;
  }

  task.completion = task.completion === "Not Completed" ? "Completed" : "Not Completed";
  setOnLocalStorage();
  console.log(`Task "${task.description}" is now marked as ${task.completion}`);
};

// editTask
const editTask = () => {
  const editID = parseInt(prompt("Enter the task ID to edit:"), 10);
  const task = arr.find(task => task.id === editID);

  if (!task) {
    console.log("Please enter a valid task ID");
    return;
  }

  const newDescription = prompt("Enter the new description:").trim();
  if (!newDescription) {
    console.log("Task description cannot be empty.");
    return;
  }

  task.description = newDescription;
  setOnLocalStorage();
  console.log(`Task "${editID}" updated to: ${newDescription}`);
};

// deleteTask
const deleteTask = () => {
  const deleteID = parseInt(prompt("Enter the task ID to delete:"), 10);
  const taskIndex = arr.findIndex(task => task.id === deleteID);

  if (taskIndex === -1) {
    console.log("Task not found");
    return;
  }

  arr.splice(taskIndex, 1);
  setOnLocalStorage();
  console.log(`Task with ID "${deleteID}" deleted`);
};

// searchTask
const searchTask = () => {
  const searchT = prompt("Enter the task name or part of it to search:").toLowerCase().trim();
  if (!searchT) {
    console.log("Search cannot be empty.");
    return;
  }

  const results = arr.filter(task => task.description.toLowerCase().includes(searchT));
  
  if (results.length === 0) {
    console.log("No tasks found with the given name.");
  } else {
    console.log("Search Results:");
    results.forEach(task => {
      console.log(`${task.id}. ${task.description} [${task.completion}]`);
    });
  }
};


const TaskManager = () => {
  let enter;
  
  do {
    printMenu();
    enter = prompt("Please enter your choice (1-7):");

    switch (enter) {
      case "1":
        addTask();
        break;
      case "2":
        viewTasks();
        break;
      case "3":
        toggleTaskCompletion();
        break;
      case "4":
        editTask();
        break;
      case "5":
        deleteTask();
        break;
      case "6":
        console.log("Exiting Task Manager...");
        break;
      case "7":
        searchTask();
        break;
      default:
        console.log("Invalid choice. Please enter a number between 1 and 7.");
        break;
    }
  } while (enter !== "6");
};

setTimeout(TaskManager, 1);
