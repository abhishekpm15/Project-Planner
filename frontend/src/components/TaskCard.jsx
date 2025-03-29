import React, { useEffect, useState } from 'react'
import { DatePicker, Form, Input, Rate, Select, Upload, Button } from 'antd'
import Modal from './Modal'
import TaskForm from './TaskForm'
import Task from './Task'

const priorityMap = { Low: 2, Medium: 3, High: 4, Critical: 5 }

const TaskCard = ({ userTasks, setUserTaskDetails, userTaskDetails }) => {
  console.log('JSON.' + JSON.stringify(userTasks))
  const [openResponsive, setOpenResponsive] = useState(false);

  return (
    <>
      <Modal openResponsive={openResponsive} setOpenResponsive={setOpenResponsive}>
        <Task userTasks={userTasks} setUserTaskDetails={setUserTaskDetails} userTaskDetails={userTaskDetails} setOpenResponsive={setOpenResponsive}/>
      </Modal>
    <div className='h-auto w-72 relative bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:scale-105 duration-150 cursor-pointer' onClick={()=>{setOpenResponsive(true)}}>

      <span
        className={`w-2 h-2 rounded-full inline-block absolute mr-1 right-3 top-3 ${
          userTasks?.task?.status === 'To Do'
            ? 'bg-red-500'
            : (userTasks?.task?.status === 'In Progress' ?  'bg-blue-500' : 'bg-green-500')
        }`}
      ></span>
      <div className='p-5'>
        <h5 className='text-xl h-10 font-bold tracking-tight text-gray-900 dark:text-white text-left overflow-hidden truncate'>
          {userTasks?.task?.taskName}
        </h5>
        <p className='text-sm h-20 font-normal text-white/70 text-left flex items-center overflow-hidden text-clip'>
          {userTasks?.task?.taskDescription}
        </p>
      </div>
      <div className='flex text-xs items-center px-5 text-left'>
        Priority level:{' '}
        <div className='font-bold ml-3 flex items-center'>
          {userTasks?.task?.priority}
        </div>
      </div>
      <div className='px-5 mt-1'>
        <Form.Item name='priority'>
          <Rate
            defaultValue={priorityMap[userTasks?.task?.priority] || 3}
            disabled={true}
          />
        </Form.Item>
      </div>
    </div>
    </>
  )
}

export default TaskCard
