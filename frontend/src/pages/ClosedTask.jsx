import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../assets/not-found.svg";
import Navbar from "../components/Navbar";
import { Loading } from "../components/Loading";
import Modal from "../components/Modal";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import { DatePicker, Form, Input, Rate, Select, Upload, Button } from "antd";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const getPriorityLabel = (priority) => {
  if (priority <= 2) return "Low";
  if (priority === 3) return "Medium";
  if (priority === 4) return "High";
  return "Critical";
};

const ClosedTask = () => {
  const [userDetails, setUserDetails] = useState("");
  const params = useParams();
  const [load, setLoad] = useState(false);
  const [closedTask, setClosedTask] = useState([]);

  useEffect(() => {
    setLoad(true);
    axios
      .get(`${API_URL}/api/users/getUserById/${params.id}`)
      .then((res) => {
        setUserDetails(res.data.user);
      })
      .catch((err) => {
        console.log("error " + err);
      })
      .finally(() => {
        setLoad(false);
      });
  }, [params.id]);

  useEffect(() => {
    if (!userDetails || !userDetails.userId) return;
    setLoad(true);
    if (userDetails !== "") {
      axios
        .get(`${API_URL}/api/task/${userDetails.userId}`)
        .then((res) => {
          const closedTasks = res.data.task.filter((task) => task.task.status === "Closed");
          setClosedTask(closedTasks);
        })
        .catch((error) => {
          console.log("error user tasks" + error.response.data.message);
        })
        .finally(() => {
          setLoad(false);
        });
    }
  }, [userDetails]);

  if (load) return <Loading />;

  if (closedTask.length === 0)
    return (
      <div>
        <Navbar />
        <div className="w-screen h-full flex justify-center items-center p-10">
          <div className="flex items-center">
            <img src={NotFound} alt="not-found" width={300} className="mx-5" />
            <div>
              <div>
                <span className="bg-red-500 p-4 rounded-bl-4xl rounded-tr-4xl mx-2 text-4xl">
                  No closed tasks found
                </span>
                <span className="text-4xl">for {userDetails.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="w-screen h-screen flex items-center flex-col mt-[7%]">
      <Navbar />
      <div className="text-2xl bg-amber-600 rounded-xl px-5 py-2">Closed Tasks</div>
      <div className="w-screen flex justify-start p-10 text-4xl">
        <div className="flex flex-wrap gap-5">
          {closedTask.map((taskDetail, index) => (
            <TaskCard
              key={index}
              userTasks={taskDetail}
              userTaskDetails={closedTask}
              setUserTaskDetails={setClosedTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClosedTask;
