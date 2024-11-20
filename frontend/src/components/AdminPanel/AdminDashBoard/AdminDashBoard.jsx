import React, { useEffect } from 'react'
import './dashboard.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getAllUsers } from '../../redux/reducers/sliceUser'
import { setPosts } from '../../redux/reducers/slicePosts'

const AdminDashBoard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const users = useSelector((users)=>{
        return users.users.users
    })
    const posts = useSelector((posts)=>{
        return posts.posts.posts
    })
    const isLogin = users.filter((elem)=>{
        return elem.is_login == true
    })
    useEffect(() => {
        axios.get('http://localhost:5000/users/all',{
            headers: {
                Authorization: `Bearer ${token}`,
              },
        }).then((res)=>{
            dispatch(getAllUsers(res.data.Users))
            
            
        }).catch((err)=>{
            console.log(err);
            
        })
       
    }, [users]);
    useEffect(() => {
        axios.get('http://localhost:5000/posts',{
            headers: {
                Authorization: `Bearer ${token}`,
              },
        }).then((res)=>{
            if (res.data.Posts.length) {
                dispatch(setPosts(res.data.Posts))
                
            }
            else{
                dispatch(setPosts([]))
            }
            
        }).catch((err)=>{
            console.log(err);
            
        })
       
    }, [posts]);
    
    
  return (
    <div>
        <img src='../../../Preview.png'/>
        <div>
        <div>
            <h3 onClick={(e)=>{
                navigate('./users')
            }}>Users : {users.length}</h3>
        </div>
        <div>
            <h3 onClick={(e)=>{
                navigate('./posts')
            }}>Posts : {posts?.length || 0}</h3>
        </div>
        <div>
            <h3 onClick={(e)=>{
                navigate('./Is/Login')
            }}>Is Login : {isLogin.length}</h3>
        </div>
        <div>
            <h3 onClick={(e)=>{
                navigate('./Reports')
            }}>Reports</h3>
        </div>
        </div>
        <Outlet />
    </div>
  )
}

export default AdminDashBoard