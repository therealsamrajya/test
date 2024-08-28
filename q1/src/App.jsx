import { useState } from 'react'
import './App.css'
import SearchFilter from './SearchFilter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className=''> 
        <SearchFilter/>
      </div>
    </>
  )
}

export default App
