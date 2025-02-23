import { useState } from 'react'
import './App.css'
import { useAuth0 } from '@auth0/auth0-react'
import TextInput from './components/TextInput.jsx'
import ChatElement from './components/ChatElement.jsx'
import Signin from './components/Signin.jsx'
import ChatRoom from './components/ChatRoom.jsx'

function App() {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0()
  console.log(user, 'current');
  return (
    <>
      <div className='main-body' style={{ height: `${isAuthenticated ? '90vh' : '100%'}` }}>
        {!isAuthenticated ? <Signin /> : <ChatRoom />}
      </div>
    </>
  )
}

export default App
