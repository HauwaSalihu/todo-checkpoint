import { useState, useEffect } from "react";

function TaskForm({ onSubmit, taskToEdit }) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // When editing an existing task, pre-fill the form
  useEffect(() => {
    if (taskToEdit) {
      setTaskName(taskToEdit.name);
      setTaskDescription(taskToEdit.description);
      setIsEditing(true);
    } else {
      setTaskName("");
      setTaskDescription("");
      setIsEditing(false);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!taskName || !taskDescription) {
      alert("Both fields are required");
      return;
    }

    const newTask = {
      id: isEditing ? taskToEdit.id : Date.now(), // Use current timestamp as ID if adding new
      name: taskName,
      description: taskDescription,
      completed: false,
    };

    onSubmit(newTask);

    // Clear the form
    setTaskName("");
    setTaskDescription("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Name"
        value={taskName}
        className="border"
        onChange={(e) => setTaskName(e.target.value)}
      />
      <textarea
        placeholder="Task Description"
        className="border"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
      <button
        className="bg-black  text-white w-fit p-2 rounded-lg"
        type="submit"
      >
        {isEditing ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;
