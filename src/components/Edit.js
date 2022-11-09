import { useContext } from "react";
import { TaskContext } from "../App";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Create.css";

const Edit = () => {
  const { handleReload } = useContext(TaskContext);
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:9000/todos/${taskId}`)
      .then((res) => res.data)
      .then((data) => {
        const { title, text } = data;
        setTitle(title);
        setText(text);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [taskId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    axios
      .patch(`http://localhost:9000/todos/${taskId}`, {
        title: title,
        text: text
      })
      .then(() => {
        setIsPending(false);
        handleReload();
        navigate(-1);
      });
  };

  return (
    <div className="create">
      <h2>Create a Edit Task</h2>
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

        {!isPending && <button>Update</button>}
        {isPending && <button disabled>Updating...</button>}
      </form>
    </div>
  );
};

export default Edit;
