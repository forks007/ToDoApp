import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Create.css";

const Create = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    const task = { title, text, status: "new" };
    axios({
      method: "post",
      url: "http://localhost:9000/todos",
      data: task
    }).then(() => {
      setIsPending(false);
      navigate(`/`);
    });
  };

  return (
    <div className="create">
      <h2>Create a new Task.</h2>
      <form onSubmit={handleSubmit}>
        <label> Task title</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label> Task Details</label>
        <textarea
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        {!isPending && <button>Add Task</button>}
        {isPending && <button disabled>Adding Task...</button>}
      </form>
    </div>
  );
};

export default Create;
