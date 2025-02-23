import { useState, React, useEffect } from 'react'
import ChatUsersList from './ChatUsersList.jsx'
import TextInput from './TextInput.jsx'
import Navbar from './Navbar.jsx'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'

export default function ChatRoom() {
    const { user } = useAuth0()
    const [chatRooms, setChatRooms] = useState([])

    useEffect(() => {
        //get all chatrooms of current user and pass the usestate to searchbar and add the new chat if made in the current chatroom usestate
        const getAllChatRooms = async () => {
            console.log(user);
            const response = await axios.get('http://localhost:8080/getAllChatRooms', {
                params: { email: user.email }
            })
            console.log(response.data);
            setChatRooms(response.data);
        }
        getAllChatRooms();
    }, [])

    return (
        <>
            <Navbar chatRooms={chatRooms} setChatRooms={setChatRooms} />
            <div className='container' style={{ display: 'flex', padding: 0, height: '93.5%' }}>
                <div style={{ width: '30%', height: '100%', borderRight: '0.1px solid grey' }}>
                    <ChatUsersList chatRooms={chatRooms} />
                </div>
                <div style={{ width: '70%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div className="messageList" style={{ height: '95%' }}>
                        all messages
                    </div>
                    <TextInput />
                </div>
            </div>

        </>
    )
}
