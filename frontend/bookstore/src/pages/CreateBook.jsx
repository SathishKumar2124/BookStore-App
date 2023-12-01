import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateBook = () => {
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [publishYear,setPublishYear] = useState('')
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    }
    setLoading(true)
    axios.post('http://localhost:3000/books',data)
    .then(()=>{
      setLoading(false)
      navigate('/')
    }).catch((err)=>{
      setLoading(false)
      console.log(err)

    })
  }
  return (
    <div className='create'>
      <h1>Create Book</h1>
      {
        loading ? <h1>........</h1> : 
        <div className='create-form'>
          <div className='title'>
            <label >title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter Title'/>
          </div>
          <div className='title'>
            <label >Author</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder='Enter Author'/>
          </div>
          <div className='title'>
            <label >publishYear</label>
            <input type="number" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} placeholder='Enter Publish Year' />
          </div>
          <div className='btn'>
            <button type="button" onClick={handleSaveBook} className='save-btn'>save</button>
          </div>
        </div>
      }
    </div>
  )
}

export default CreateBook