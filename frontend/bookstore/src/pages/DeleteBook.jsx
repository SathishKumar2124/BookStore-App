import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import '../App.css'
const DeleteBook = () => {
  const [loading,setLoading] =useState(false)
  const navigate = useNavigate()
  const {id} = useParams()
  const handleDelete = () => {
    setLoading(true)
    axios.delete(`http://localhost:3000/books/${id}`)
    .then(()=>{
      setLoading(false)
      navigate('/')
    }).catch((err)=>{
      setLoading(false)
      console.log(err)
    })
  }
  return (
    <div className='delete'>
      <h1>Delete Book</h1>
      <div>
        <h3>are you sure , you want to delete this book?</h3>
        <button type="button" onClick={handleDelete}  className='del-btn'>yes,delete it</button>
      </div>
    </div>
  )
}

export default DeleteBook