import React from 'react'
import SearchFilter from '../../components/SearchFilter'

const Home = () => {
  return (
    <div>
        <span className='text-xs'>Note : Please refresh the page 4 5 times if the data is not being fetched </span>
        <SearchFilter/>
    </div>
  )
}

export default Home