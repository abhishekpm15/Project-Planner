import React, { useEffect, useState } from "react";
import { DatePicker, Form, Input, Rate, Upload, Button } from "antd";
import Steps from "./Steps";
import Select from "./Select";
import { toast } from "react-toastify";
import axios from "axios";

const priorityMap = { Low: 2, Medium: 3, High: 4, Critical: 5 };

const URL = import.meta.env.VITE_BACKEND_URL;

console.log("outisde task id ");

const Task = ({ userTasks, setUserTaskDetails, userTaskDetails, setOpenResponsive }) => {
  const [status, setStatus] = useState(userTasks?.task?.status);
  console.log("task id " + userTasks?._id);
  console.log("user task details " + JSON.stringify(userTaskDetails));

  const handleChange = (value) => {
    // setStatus((prev) => (prev !== value) ?  value : prev);
    console.log(`selected ${value}`);
    setStatus(value);
  };

  const handleSubmit = () => {
    if (status !== userTasks?.task?.status) {
      console.log("Status changed to " + status);
      axios
        .post(`${URL}/api/task/updateTaskStatus`, {
          taskId: userTasks._id,
          status: status,
        })
        .then((response) => {
          console.log("response " + response);
          toast.success(response.data.message);
          console.log("user task details chekc" + JSON.stringify(userTasks));
          setUserTaskDetails((prev) => {
            const updatedTaskDetails = prev.map((taskDetail) => 
              (taskDetail._id === userTasks._id ? {...taskDetail, task: {...taskDetail.task, status: status}} : taskDetail)
            )
            return updatedTaskDetails
          })
          setOpenResponsive(false);
        })
        .catch((error) => {
          console.log("error " + error);
          toast.error(error.message);
        });
    }
  };

  return (
    <div className="w-full flex flex-col space-y-3 p-5 rounded-2xl text-2xl">
      <div className="space-y-5">
        <div className="flex space-x-10">
          <div className="text-lg font-semibold flex-1">Task Name:</div>
          <div className="font-normal flex-3 text-xl">
            {userTasks?.task?.taskName}
          </div>
        </div>
        <div className="flex space-x-10">
          <div className="text-lg font-semibold flex-1">Service Name:</div>
          <div className="font-normal flex-3 text-xl">
            {userTasks?.task?.serviceName}
          </div>
        </div>
        <div className="flex space-x-10">
          <div className="text-lg font-semibold flex-1">Task Description:</div>
          <div className="font-normal flex-3 text-xl">
            {userTasks?.task?.taskDescription}
          </div>
        </div>
        <div className="flex space-x-10">
          <div className="text-lg font-semibold flex-1">Priority:</div>
          <div className="font-normal flex-3 text-xl flex item-center gap-3">
            {userTasks?.task?.priority}
            <Form.Item name="priority">
              <Rate
                defaultValue={priorityMap[userTasks?.task?.priority] || 3}
                disabled={true}
              />
            </Form.Item>
          </div>
        </div>
        <div className="flex space-x-10">
          <div className="text-lg font-semibold flex-1">Task End Date:</div>
          <div className="font-normal flex-3 text-xl">
            {userTasks?.task?.dueDate.split("T")[0]}
          </div>
        </div>
        <div className="flex space-x-10">
          <div className="text-lg font-semibold flex-1">Status: </div>
          <div className="font-normal flex-3 text-xl">
            <Select
              handleChange={handleChange}
              status={userTasks?.task?.status}
            />
          </div>
        </div>
        {(userTasks?.task?.status !== "Completed" && userTasks?.task?.status !== "Closed")  && (
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </div>

      {/* <Steps /> */}
    </div>
  );
};

export default Task;
