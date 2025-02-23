import { useState, React, useEffect } from 'react'
import ChatUsersList from './ChatUsersList.jsx'
import TextInput from './TextInput.jsx'
import Navbar from './Navbar.jsx'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import ChatElement from './ChatElement.jsx'

export default function ChatRoom() {
    const { user } = useAuth0()
    const [chatRooms, setChatRooms] = useState([])
    const [currentChatRoom, setCurrentChatRoom] = useState()
    const [currentMessageList, setCurrentMessageList] = useState([])

    useEffect(() => {
        //get all chatrooms of current user and pass the usestate to searchbar and add the new chat if made in the current chatroom usestate
        const getAllChatRooms = async () => {
            const response = await axios.get('http://localhost:8080/getAllChatRooms', {
                params: { email: user.email }
            })
            console.log(response.data, 'chatrooms');
            setChatRooms(response.data);
            if (response.data.length > 0) setCurrentChatRoom(response.data[0])
        }
        getAllChatRooms();
    }, [])

    useEffect(() => {
        console.log(currentChatRoom, 'currentchatroom');
        const fetchAllChats = async () => {
            const response = await axios.get('http://localhost:8080/getAllMessages', {
                params: { chat_room_id: currentChatRoom._id }
            })
            // fetch all messages for this chatroom in descending order
            console.log(response.data, 'messages list');
            setCurrentMessageList(response.data);
        }
        if (currentChatRoom)
            fetchAllChats()
    }, [currentChatRoom])

    return (
        <>
            <Navbar chatRooms={chatRooms} setChatRooms={setChatRooms} currentChatRoom={currentChatRoom} setCurrentChatRoom={setCurrentChatRoom} />
            <div className='container' style={{ display: 'flex', padding: 0, height: '93.5%' }}>
                <div style={{ width: '30%', height: '100%', borderRight: '0.1px solid grey' }}>
                    <ChatUsersList chatRooms={chatRooms} />
                </div>
                <div style={{ width: '70%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div className="messageList" style={{ height: '95%' }}>
                        {currentMessageList.length > 0 &&
                            currentMessageList.map((m) => <ChatElement message={m} />)
                        }
                    </div>
                    <TextInput currentChatRoom={currentChatRoom} setCurrentChatRoom={setCurrentChatRoom} />
                </div>
            </div>
        </>
    )
}
