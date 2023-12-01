import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate ,useParams} from 'react-router-dom'

const EditBook = () => {
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [publishYear,setPublishYear] = useState('')
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const {id} = useParams()
  useEffect(()=>{
    setLoading(true)
    axios.get(`http://localhost:3000/books/${id}`)
    .then((response)=>{
      setAuthor(response.data.author)
      setTitle(response.data.title)
      setPublishYear(response.data.publishYear)
      setLoading(false)
    }).catch((err)=>{
      console.log(err)
      setLoading(false)
    })
  },[])
  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    }
    setLoading(true)
    axios.put(`http://localhost:3000/books/${id}`,data)
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
      <h1>Edit Book</h1>
      {
        loading ? <h1>........</h1> : 
        <div className='create-form'>
          <div className='title'>
            <label >title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className='title'>
            <label >Author</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
          </div>
          <div className='title'>
            <label >publishYear</label>
            <input type="number" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} />
          </div >
          <div className='btn'>
            <button type="button" onClick={handleEditBook} className='save-btn'>save</button>
          </div>
        </div>
      }
    </div>
  )
}

export default EditBook