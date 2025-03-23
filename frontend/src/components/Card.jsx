import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ id, name, designation, image }) => {
  return (
    <div className='w-64 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:scale-105 duration-150'>
      <div className='p-5'>
        <div className='h-28'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center'>
            {name}
          </h5>
          <p className='mb-3 font-normal text-gray-700 dark:text-gray-400 text-center'>
            {designation}
          </p>
        </div>
        <img
          src={image}
          width={200}
          height={200}
          className='mb-5 rounded-4xl'
          alt={name}
        />
        <div className='flex items-center justify-center'>
          <Link
            to={`/home/${id}`}
            className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white'
          >
            View Status
            <svg
              className='rtl:rotate-180 w-3.5 h-3.5 ms-2'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 10'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M1 5h12m0 0L9 1m4 4L9 9'
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Card
