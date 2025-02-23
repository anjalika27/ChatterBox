import React, { useState } from 'react'
import axios from "axios"
import { useAuth0 } from '@auth0/auth0-react'

export default function TextInput({ currentChatRoom, setCurrentChatRoom }) {
    const [chatInput, setChatInput] = useState()
    const { user } = useAuth0()

    const addMessage = async () => {

        const recipients = currentChatRoom.userDetails.reduce((acc, u) => {
            if (u.email !== user.email) acc.push(u.email)
            return acc;
        }, [])

        const response = await axios.post('http://localhost:8080/addMessage', {
            sender_id: user.email,
            receiver_id: recipients,
            message: chatInput,
            chat_room_id: currentChatRoom._id
        })
        console.log(response.data, 'new msge added');

    }

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '3px' }}>

            <input type="text" onChange={(e) => setChatInput(e.target.value)} style={{ backgroundColor: 'white', width: '88.5%', borderRadius: '6px', color: 'black', border: '1px solid black' }} className="form-control" placeholder='Start Typing...' />

            <button type="submit" className="btn btn-primary" style={{ borderRadius: '6px' }} onClick={() => addMessage()}>Send</button>
        </div>
    )
}
