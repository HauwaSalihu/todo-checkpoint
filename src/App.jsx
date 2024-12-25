import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  // Initial tasks load from localStorage or set to empty array
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Track the task currently being edited
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Update localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add new task to the list
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  // Delete a task from the list
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Edit an existing task
  const editTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setTaskToEdit(null); // Reset editing state after saving the task
  };

  // Mark a task as completed or uncompleted
  const toggleCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Set the task to be edited
  const handleEditClick = (task) => {
    setTaskToEdit(task);
  };

  return (
    <div className="App">
      <h1 className="text-4xl text-center m-5">To-Do List</h1>
      <TaskForm
        onSubmit={taskToEdit ? editTask : addTask}
        taskToEdit={taskToEdit}
      />
      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onEdit={handleEditClick}
        onToggleCompletion={toggleCompletion}
      />
    </div>
  );
}

export default App;
