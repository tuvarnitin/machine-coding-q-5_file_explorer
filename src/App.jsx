import { useState } from 'react'
import files from './data.json'
import { List } from './List'



const App = () => {
  const [data,setData] = useState([{
      "id": 0,
      "name": "root",
      "isFolder": true,
      "isExpanded": true,
      "children": []
  }])
  return (
    <div className='container'>
      {!data && alert("Enter name of first folder")}
      {data && <List data={data} setData={setData}/>}
    </div>
  )
}

export default App
