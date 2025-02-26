import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

export default function ChatUsersList({ chatRooms, currentChatRoom, setCurrentChatRoom }) {
    const { user } = useAuth0()

    return (
        <ul className="list-group" style={{ border: '0.1px solid grey' }}>
            {chatRooms.length > 0 &&
                chatRooms.map((c, index) => {
                    console.log(c, 'chatsss');

                    const userobj = c.userDetails.filter((p) => p.email != user.email)
                    console.log(userobj, 'userrrrrrrr');

                    const chat_name = c.group_chat ? c.group_name : (userobj[0].first_name + " " + userobj[0].last_name)
                    return (<button type="button" key={chat_name} onClick={() => setCurrentChatRoom(chatRooms[index])} style={{ width: '100%', padding: '2px 3px', fontSize: '13px', border: currentChatRoom._id === c._id ? "0.7px solid #242489" : '0.7px solid grey', backgroundColor: currentChatRoom._id === c._id ? '#adb5bd' : 'white' }} className="btn">{chat_name}</button>)
                })
            }
        </ul>
    )
}

