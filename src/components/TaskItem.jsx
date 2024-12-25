import { Card } from "antd";

function TaskItem({ task, onDelete, onEdit, onToggleCompletion }) {
  const { id, name, description, completed } = task;

  return (
    <div className={`task-item ${completed ? "completed" : ""} m-5`}>
      <Card title={name} bordered={false} className="bg-gray-50">
        <p className="m-5">{description}</p>
        <button
          onClick={() => onToggleCompletion(id)}
          className="bg-blue-400 p-1 rounded font-semibold"
        >
          {completed ? "Mark as Incomplete" : "Mark as Completed"}
        </button>
        <button
          onClick={() => onEdit(task)}
          className="bg-green-500 p-1 px-2 rounded font-semibold"
        >
          Edit
        </button>
        <button
          className="bg-red-600 p-1 px-2 rounded font-semibold"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this task?")) {
              onDelete(id);
            }
          }}
        >
          Delete
        </button>
      </Card>
    </div>
  );
}

export default TaskItem;
