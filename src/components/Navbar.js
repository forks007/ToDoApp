import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <>
      <div>
        <ul className="menu">
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? "#fff" : "#545e6f",
              backgroundColor: isActive ? "#000000" : "transparent"
            })}
          >
            <li>New Task</li>
          </NavLink>
          <NavLink
            to="/ongoing"
            style={({ isActive }) => ({
              color: isActive ? "#fff" : "#545e6f",
              backgroundColor: isActive ? "#000000" : "transparent"
            })}
          >
            <li>Task in progress</li>
          </NavLink>
          <NavLink
            to="/finished"
            style={({ isActive }) => ({
              color: isActive ? "#fff" : "#545e6f",
              backgroundColor: isActive ? "#000000" : "transparent"
            })}
          >
            <li>Finished Task</li>
          </NavLink>
          <NavLink
            to="/create"
            style={({ isActive }) => ({
              color: isActive ? "#fff" : "#545e6f",
              backgroundColor: isActive ? "#000000" : "transparent"
            })}
          >
            <li>Create Task</li>
          </NavLink>
        </ul>
      </div>
    </>
  );
}
