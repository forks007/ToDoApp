import { useContext } from "react";
import { TaskContext } from "../App";
import { useLocation, Link } from "react-router-dom";
import "./Task.css";

export default function Task({ title }) {
  // const navigate = useNavigate();
  const context = useContext(TaskContext);
  const {
    tasks,
    handleDelete,
    handleFinish,
    handleReset,
    handleStart
  } = context;
  let filteredTasks = [];
  const location = useLocation();
  if (location.pathname === "/") {
    filteredTasks = tasks?.filter((task) => task.status === "new");
  }
  if (location.pathname === "/ongoing") {
    filteredTasks = tasks?.filter((task) => task.status === "ongoing");
  }
  if (location.pathname === "/finished") {
    filteredTasks = tasks?.filter((task) => task.status === "finished");
  }

  // console.log("location",location);

  return (
    <div>
      <div>
        <h1 className="title">{title}</h1>
        {filteredTasks.length > 0 &&
          filteredTasks.map((task) => (
            <div className="task-card" key="task.id">
              <h1 className="task-title">{task.title}</h1>
              <p className="task-desc">{task.text}</p>

              {task.status === "new" && (
                <button onClick={() => handleStart(task)}>Start</button>
              )}
              {task.status === "ongoing" && (
                <>
                  <button onClick={() => handleFinish(task)}>
                    Mark as complete
                  </button>
                  <button onClick={() => handleReset(task)}>Reset</button>
                </>
              )}
              {task.status === "finished" && (
                <button onClick={() => handleStart(task)}>Restart</button>
              )}
              <Link to={`/edit/${task.id}`}>
                <button className="edit">Edit</button>
              </Link>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          ))}
      </div>
    </div>
  );
}
