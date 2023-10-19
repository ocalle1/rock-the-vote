import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props){
  const { logout, token } = props // 13; added 19.1 token
  return (
    <div className="navbar">
      {/* 19 */}
      {/* { token && <Link to="/profile">Profile</Link> } */}
      <Link to="/profile">Profile</Link> 
      <Link to="/public">Public</Link>

      {/* 13. button; 19.1 conditional rendering */}
     {/* { token && <button onClick={logout}>Logout</button> }  */}
     <button onClick={logout}>Logout</button>  
    </div>
  )
}