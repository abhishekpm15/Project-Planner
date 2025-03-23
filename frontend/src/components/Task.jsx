import React from 'react'

const Task = ({userTaskDetails}) => {
  return (
    <div className='w-full bg-gray-700 h-16 flex items-center p-5 rounded-2xl text-2xl'>{userTaskDetails?.task?.taskName}</div>
  )
}

export default Task