import React, { useContext } from 'react' // 12. useContext
import { Routes, Route, Navigate } from 'react-router-dom' // 12. Navigate
import Navbar from './components/Navbar.js'
import Auth from './components/Auth.js'
import Profile from './components/Profile.js'
import Public from './components/Public.js'
import { UserContext } from './context/UserProvider.js' // 12. 
import ProtectedRoute from './components/ProtectedRoute.js'// 20.



export default function App(){
const { token, logout } = useContext(UserContext) // 12. token(UserProviders.js => initState) - if logged in truthy value and if not logged in falsey = ""
// 13. logout
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