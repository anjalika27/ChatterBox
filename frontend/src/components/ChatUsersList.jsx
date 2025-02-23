import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

export default function ChatUsersList({ chatRooms }) {
    const { user } = useAuth0()

    return (
        <ul className="list-group" style={{ border: '0.1px solid grey' }}>
            {
                chatRooms.map((c) => {

                    const userobj = c.userDetails.filter((p) => p.email != user.email)

                    const chat_name = c.group_chat ? chat_name : (userobj[0].first_name + " " + userobj[0].last_name)

                    return (<button type="button" key={chat_name} style={{ width: '100%', padding: '2px 3px' }} className="btn">{chat_name}</button>)
                }
                )
            }
        </ul>

    )
}
