let enter;
const arr = JSON.parse(localStorage.getItem("tasks")) || [];

// get the ID of the last task stored in LocalStorage
let taskIdCounter = arr.length > 0 ? Math.max(...arr.map((task) => task.id)) : 0;

const Tasks = {
  description: "null",
  completion: "Not Completed",
};

const print = () => {
  console.log(
    "Task Manager Menu:\n 1. Add Task \n 2. View Tasks \n 3. Toggle Task Completion \n 4. Edit Task \n 5. Delete Task \n 6. Exit \n 7. Search Task"
  );
};

// Save tasks in localStorage
const setOnLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(arr));
};

const TaskManager = () => {
  do {
    print();
    enter = prompt("Please enter your choice (1-7):");

    switch (enter) {
      case "1":
        let desc = prompt("Enter the task description:");

        const newTask = { ...Tasks };
        taskIdCounter++; 
        newTask.id = taskIdCounter; 
        newTask.description = desc.trim() === "" ? "null" : desc;

        arr.push(newTask);
        setOnLocalStorage();
        console.log(`Task added: "${newTask.description}"`);
        break;

      case "2":
        if (arr.length === 0) {
          console.log("No tasks available");
        } else {
          console.log("Tasks: ");
          arr.forEach((element) => {
            console.log(
              `${element.id}. ${element.description} [${element.completion}]`
            );
          });
        }
        break;

      case "3":
        let compID = prompt("Enter the task ID to toggle completion:");
        let indexToComp = arr.findIndex((ele) => ele.id == compID);

        if (indexToComp == -1) {
          console.log("Please enter a valid task ID");
        } else {
          arr[indexToComp].completion =
            arr[indexToComp].completion == "Not Completed"
              ? "Completed"
              : "Not Completed";

          console.log(
            `Task "${arr[indexToComp].description}" is now marked as ${arr[indexToComp].completion}`
          );
          setOnLocalStorage(); 
        }
        break;

      case "4":
        let editID = prompt("Enter the task ID to edit:");
        let indexToUpdated = arr.findIndex((ele) => ele.id == editID);

        if (indexToUpdated != -1) {
          let newDescription = prompt("Enter the new description:");
          arr[indexToUpdated].description = newDescription;
          console.log(`Task "${editID}" updated to: ${newDescription}`);
          setOnLocalStorage(); 
        } else {
          console.log("Please enter a valid task ID");
        }
        break;

      case "5":
        let deleteID = prompt("Enter the task ID to delete:");
        let indexToDelete = arr.findIndex((ele) => ele.id == deleteID);

        if (indexToDelete !== -1) {
          arr.splice(indexToDelete, 1);
          console.log(`Task with ID "${deleteID}" deleted`);
          setOnLocalStorage(); 
        } else {
          console.log("Task not found");
        }
        break;

      case "6":
        console.log("Exiting Task Manager...");
        break;

        case "7":
            let search = prompt("Enter the task name or part of it to search:");
            const results = arr.filter(task => task.description.toLowerCase().includes(search.toLowerCase()));
            
            if (results.length === 0) {
                console.log("No tasks found with the given name.");
            } else {
                console.log("Search Results:");
                results.forEach(task => {
                    console.log(
                        `${task.id}. ${task.description} [${task.completion}]`
                    );
                });
            }
            break;

      default:
        console.log("Invalid choice. Please enter a number between 1 and 7.");
        break;
    }
  } while (enter !== "6");
};

setTimeout(TaskManager, 1);
