import React, { useEffect, useState } from "react";
import Task from "./Task";
import Formtask from "./Formtask";
import { useNavigate } from "react-router-dom";
import "./TaskList.css";  // Ensure this path is correct

function TaskList() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [update, setUpdate] = useState(false);
  const [done, setDone] = useState(false); 

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, [done]);

  return (
    <>
      {!update ? (
        <div className="tasks-container">
          {tasks?.map((e, i) => (
            <div key={i} className="task-wrapper">
              <input
                type="checkbox"
                disabled={e.done}
                checked={e.done}
                onChange={(e) => {
                  const data = localStorage.getItem("tasks");
                  const tasks = JSON.parse(data);

                  tasks[i]["done"] = e.target.checked;
                  e.done = true;
                  localStorage.setItem("tasks", JSON.stringify(tasks));
                  setDone(!done);
                }}
                className="task-checkbox"
                placeholder="done"
              />
              <div
                className="task-container"
                onClick={() => {
                  setUpdate(!update);
                  navigate("/edit/" + i);
                }}
              >
                <Task task={e} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Formtask />
      )}
    </>
  );
}

export default TaskList;
