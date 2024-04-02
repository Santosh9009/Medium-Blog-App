import React from 'react'

const Appbar = ({authorname}) => {
  return (
    <div className='w-full flex justify-between px-5 py-3 border-2'>
      <div className='font-medium text-xl'>Medium</div>
      <div>
      <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full mr-2">
          <span className="font-medium text-gray-600 ">
           H
          </span>
        </div>
      </div>
    </div>
  )
}

export default Appbar