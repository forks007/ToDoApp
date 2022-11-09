import axios from "axios";
import React, { useEffect, useState } from "react";
import Task from "./components/Task";
import Navbar from "./components/Navbar";
import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./components/Create";
import Edit from "./components/Edit";

export const TaskContext = React.createContext();

export default function App() {
  const [reload, setReload] = useState({});
  const [tasks, setTasks] = useState([]);

  const fetchQuote = async () => {
    try {
      const res = await axios.get("http://localhost:9000/todos");

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchQuote();
  }, [reload]);

  const handleStart = (task) => {
    axios
      .patch(`http://localhost:9000/todos/${task.id}`, { status: "ongoing" })
      .then(() => {
        setReload({});
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleFinish = (task) => {
    axios
      .patch(`http://localhost:9000/todos/${task.id}`, { status: "finished" })
      .then(() => {
        setReload({});
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleReset = (task) => {
    task.status = "new"; 
    axios
      .patch(`http://localhost:9000/todos/${task.id}`, { status: "new" })
      .then(() => {
        setReload({});
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:9000/todos/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setReload({});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleReload = () => {
    setReload({});
  };
  return (
    <BrowserRouter>
      <TaskContext.Provider
        value={{
          tasks: tasks,
          handleDelete: handleDelete,
          handleReset: handleReset,
          handleFinish: handleFinish,
          handleStart: handleStart,
          handleReload: handleReload
        }}
      >
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Task title="New task" />} />
            <Route path="/ongoing" element={<Task title="ongoing task" />} />
            <Route path="/finished" element={<Task title="completed task" />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:taskId" element={<Edit />} />
          </Routes>
        </div>
      </TaskContext.Provider>
    </BrowserRouter>
  );
}
