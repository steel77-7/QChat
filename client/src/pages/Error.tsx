import React from 'react'
import { Link } from 'react-router-dom'
export default function Error() {
  return (
    <div className='flex flex-col gap-4 w-full h-full justify-center items-center'>
    <h1 className='text-6xl text-purple-500 '>404 NOT FOUND</h1>
    <Link to="/" className='hover:text-purple-400'>Return to the home page</Link>
    </div>
  )
}
