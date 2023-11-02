import React, { useContext, useState, useEffect } from 'react' // 12. useContext
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Auth from './components/Auth.js';
import Profile from './components/Profile.js';
import Public from './components/Public.js';
import { UserContext } from './context/UserProvider.js';  
import ProtectedRoute from './components/ProtectedRoute.js';
import { IssueContext } from './context/IssueProvider.js';



export default function App(){
const { token, logout } = useContext(UserContext); 




  return (
  
    <div className="app">
      {/* 19. if theres a token load the Navbar */}
       {/* <Navbar logout={logout} token={token}/>   ORRRRR*/}
       { token &&<Navbar logout={logout} token={token}/> }
      <Routes>
        <Route 
          path="/" 
          element={ token ? <Navigate to="/profile" /> : <Auth />} // 12.
        />
        <Route 
          path="/profile"
          // 20. changed element={<Profile />} to;  If you try to access profile page it takes you back to the login page---- /profile
          element={<ProtectedRoute token={token} redirectTo="/">
        <Profile />
        </ProtectedRoute>}
        />
        <Route 
          path="/public"
          // 20. changed element={<Public />} to 
          element={<ProtectedRoute token={token} redirectTo="/">
        <Public />
        </ProtectedRoute>}
        />
      </Routes>
    </div>
  )
}