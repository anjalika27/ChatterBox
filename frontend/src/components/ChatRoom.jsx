import React from 'react'
import ChatUsersList from './ChatUsersList.jsx'
import TextInput from './TextInput.jsx'
import Navbar from './Navbar.jsx'

export default function ChatRoom() {
    return (
        <>
            <Navbar />
            <div className='container' style={{ display: 'flex', padding: 0, height: '100%' }}>
                <div style={{ width: '30%', height: '100%' }}>
                    <ChatUsersList />
                </div>
                <div style={{ width: '70%', height: '93%', display: 'flex', flexDirection: 'column' }}>
                    <div className="messageList" style={{ height: '95%' }}>
                        all messages
                    </div>
                    <TextInput />
                </div>
            </div>

        </>
    )
}
