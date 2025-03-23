import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../assets/not-found.svg';
import Navbar from '../components/Navbar';
import { Loading } from '../components/Loading';
import Modal from '../components/Modal';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import { DatePicker, Form, Input, Rate, Select, Upload, Button } from 'antd'

const API_URL = import.meta.env.VITE_BACKEND_URL;

const getPriorityLabel = priority => {
  if (priority <= 2) return 'Low'
  if (priority === 3) return 'Medium'
  if (priority === 4) return 'High'
  return 'Critical'
}


const UserPage = () => {
  const [userDetails, setUserDetails] = useState('');
  const [error, setError] = useState('');
  const params = useParams();
  const [load, setLoad] = useState(false);
  const [openResponsive, setOpenResponsive] = useState(false);
  const [userTaskDetails, setUserTaskDetails] = useState([]);
  const [form] = Form.useForm()

  const onFinish = values => {
    console.log('Form Values:', values)
    axios
      .post(`${API_URL}/api/task/addTasks`, {
        userId: userDetails.userId,
        taskName: values.taskName,
        taskDescription: values.description,
        serviceName: values.service,
        priority: getPriorityLabel(values.priority),
        dueDate: values.endDate
      })
      .then(res => {
        console.log('response ' + res)
        setUserTaskDetails((prev) => [...prev, res.data.task]);
        form.resetFields();
        setOpenResponsive(false)
      })
      .catch(error => {
        console.log('error ' + error)
      })
  }

  useEffect(() => {
    setLoad(true);
    axios
      .get(`${API_URL}/api/users/getUserById/${params.id}`)
      .then((res) => {
        console.log('user details' + JSON.stringify(res.data.user));
        setUserDetails(res.data.user);
      })
      .catch((err) => {
        console.log('error ' + err);
      })
      .finally(() => {
        setLoad(false);
      });
  }, [params.id]);

  useEffect(() => {
    setLoad(true)
    if (userDetails !== '') {
      axios
        .get(`${API_URL}/api/task/${userDetails.userId}`)
        .then((res) => {
          console.log('get User Tasks' + JSON.stringify(res.data.task));
          setUserTaskDetails(res.data.task);
        })
        .catch((error) => {
          console.log('error user tasks' + error.response.data.message);
          setError(error.response.data.message)
        }).finally(() => {
          setLoad(false)
        })
    }
  }, [userDetails]);

  console.log('params' + JSON.stringify(params.id));
  console.log('user task details' + userTaskDetails.length);

  if (load) return <Loading />;

  if (userTaskDetails.length === 0)
    return (
      <div>
        <Navbar />
        <Modal openResponsive={openResponsive} setOpenResponsive={setOpenResponsive}>
          <TaskForm userId={userDetails.userId} setOpenResponsive={setOpenResponsive} onFinish={onFinish} form={form}/>
        </Modal>
        <div className='w-screen h-full flex justify-center items-center p-10'>
          <div className='flex items-center'>
            <img src={NotFound} alt='not-found' width={300} className='mx-5' />
            <div>
              <div>
                <span className='bg-red-500 p-4 rounded-bl-4xl rounded-tr-4xl mx-2 text-4xl'>
                  {error}
                </span>
                <span className='text-4xl'>for {userDetails.name}</span>
              </div>
              <div className='flex justify-center mt-10 hover:scale-110 duration-150 text-sm'>
                <button
                  className='bg-blue-500 text-white'
                  onClick={() => {
                    setOpenResponsive(true);
                  }}
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className='w-screen h-screen flex items-center flex-col mt-[10%]'>
      <Navbar />
      <div className='flex justify-center hover:scale-110 duration-150 text-sm'>
        <button
          className='bg-blue-500 text-white'
          onClick={() => {
            setOpenResponsive(true);
          }}
        >
          Add Task
        </button>
      </div>
      <div className='w-screen flex justify-start p-10 text-4xl'>
        <Modal openResponsive={openResponsive} setOpenResponsive={setOpenResponsive}>
          <TaskForm userId={userDetails.userId} setOpenResponsive={setOpenResponsive} onFinish={onFinish} form={form}/>
        </Modal>
        <div className='flex flex-wrap gap-4'>
          {userTaskDetails.map((taskDetail, index) => (
            <TaskCard key={index} userTaskDetails={taskDetail} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
