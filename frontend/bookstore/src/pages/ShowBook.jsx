import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import '../app.css'

const ShowBook = () => {
  const [book,setBook] = useState({})
  const [loading,setLoading] = useState(false)
  const {id} = useParams()
  useEffect(()=>{
    setLoading(true)
    axios.get(`http://localhost:3000/books/${id}`)
    .then((response)=>{
      setBook(response.data)
      setLoading(false)
    }).catch((err)=>{
      console.log(err)
      setLoading(false)
    })
  },[])
  return (
    <div className='card'>
      <h1 className='show'>Show Book</h1>
      {
        loading ? <h1>no Book</h1> :
        <div className='details'>
          <div className='id'> book id :
              {book._id}
          </div>
          <div> Title :
            {book.title}
          </div>
          <div> Author : 
            {book.author}
          </div>
          <div>PublishYear : 
            { book.publishYear}
          </div>
          <div>Create Time :
              {new Date(book.createdAt).toString()}
          </div>
          <div>Last Updated Time :
              {new Date(book.updatedAt).toString()}
          </div>
        </div>
      }
    </div>
  )
}

export default ShowBook