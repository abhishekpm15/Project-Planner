import React from 'react'
import { DatePicker, Form, Input, Rate, Select, Upload, Button } from 'antd'

const priorityMap = { Low: 2, Medium: 3, High: 4, Critical: 5 }

const TaskCard = ({ userTaskDetails }) => {
  console.log('JSON.' + JSON.stringify(userTaskDetails))
  return (
    <div className=' h-auto w-72 relative bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:scale-105 duration-150'>
      <span
        className={`w-2 h-2 rounded-full inline-block absolute mr-1 right-3 top-3 ${
          userTaskDetails?.task?.status === 'To Do'
            ? 'bg-red-400'
            : 'bg-green-400'
        }`}
      ></span>
      <div className='p-5'>
        <h5 className='text-xl h-10 font-bold tracking-tight text-gray-900 dark:text-white text-left text-ellipsis'>
          {userTaskDetails?.task?.taskName}
        </h5>
        <p className='text-sm h-20 font-normal text-white/70 text-left flex items-center '>
          {userTaskDetails?.task?.taskDescription}
        </p>
      </div>
      <div className='flex text-xs items-center px-5 text-left'>
        Priority level:{' '}
        <div className='font-bold ml-3 flex items-center'>
          {userTaskDetails?.task?.priority}
        </div>
      </div>
      <div className='px-5 mt-1'>
        <Form.Item name='priority'>
          <Rate
            defaultValue={priorityMap[userTaskDetails?.task?.priority] || 3}
            disabled={true}
          />
        </Form.Item>
      </div>
      {/* <div className={`-mt-4 px-5 text-lg pb-3`}>
        {userTaskDetails?.task?.status}
      </div> */}
    </div>
  )
}

export default TaskCard
