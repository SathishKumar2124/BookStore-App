import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import {MdOutlineAddBox,MdOutlineDelete} from 'react-icons/md'
import '../app.css'
const Home = () => {
    const [books,setBooks] = useState([])
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        setLoading(true)
        axios.get('http://localhost:3000/books')
        .then((response)=>{
            setBooks(response.data.data)
            setLoading(false)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
  return (
    <div className='main'>
        <h1 className='book-title'>Books</h1><br></br>
        <Link to='/books/create' className='add-icon'><MdOutlineAddBox className='add'/></Link><br/>
        {
            loading ? ( <h1>no books</h1> ) :(
                <table className='table'>
                    <thead>
                        <tr className='row'>
                            <th>No</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>publishYear</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books.map((book ,index)=> (
                                <tr key={book._id}>
                                    <td>{index+1}</td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.publishYear}</td>
                                    <td>
                                        <div className='operations'>
                                            <Link to={`/books/details/${book._id}`} className='info'>
                                                <BsInfoCircle/>
                                            </Link>
                                             <Link to={`/books/edit/${book._id}`} className='edit'>
                                                <AiOutlineEdit />
                                            </Link>
                                             <Link to={`/books/delete/${book._id}`} >
                                                <MdOutlineDelete className='del' />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )
        }
    </div>
  )
}

export default Home