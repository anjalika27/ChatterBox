import { useState } from 'react'
import './App.css'

import TextInput from './components/TextInput.jsx'
import ChatElement from './components/ChatElement.jsx'

function App() {

  return (
    <>
      <div className='main-body'>
        <ChatElement />
        <TextInput />
      </div>
    </>
  )
}

export default App
