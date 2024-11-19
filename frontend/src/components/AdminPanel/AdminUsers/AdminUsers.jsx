import React from 'react'
import './users.css'
import { useSelector } from 'react-redux'
import { Avatar } from 'antd'
const AdminUsers = () => {
    const users = useSelector((users)=>{
        return users.users.users
    })
  return (
    <div>
        {users?.map((elem)=>{
            return (
                <div>
                    <h2>{elem.user_name}</h2>
                    <Avatar src={elem.profile_image}/>
                </div>
            )
        }) }
    </div>
  )
}

export default AdminUsers