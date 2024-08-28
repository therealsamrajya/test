import React,{useState} from 'react'

const SearchFilter = () => {
    const [search, setSearch] = useState("")
    const items=["Baisakh","Jestha","Ashad","Shrawan","Bhadra","Aswin","Kartik","Mangsir","Poush","Magh","Falgun","Chaitra"]

    const filteredItems=items.filter(item => item.toLowerCase().includes(search.toLowerCase()))


  return (
    <div  className=' bg-gradient-to-br from-purple-100 to-indigo-200 h-full flex flex-col justify-center flex-wrap '>

        <div className='mt-basic'>
            <h1 className='text-3xl font-bold'>Kun Month chai Agadi Aula ta?</h1>
        <div className='mt-basic'>
            <input type="text" value={search} className='p-2 rounded-md' onChange={(e)=>setSearch(e.target.value)} placeholder="Enter the Month" />
        </div>
        <ul className='flex flex-col items-center '>
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <li key={item} className='hover:bg-indigo-50 transition duration-150 ease-in-out p-2 rounded-md cursor-pointer'>
              {item}
            </li>
          ))
        ) : (
          <li className='text-gray-500'>No matching months found</li>
        )}
        </ul>
        </div>

    </div>
  )
}

export default SearchFilter