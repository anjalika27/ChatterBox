import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'

export default function SearchUser() {
    const { user } = useAuth0()
    const [allUsers, setAllUsers] = useState([])
    const [users, setUsers] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        const getAllUsers = async () => {
            const response = await axios.get('http://localhost:8080/allUsers');
            const users = response.data.filter((u) => u.email != user.email)
            setAllUsers(users);
        }
        getAllUsers();
    }, [])

    useEffect(() => {
        if (allUsers.length > 0) {
            const userdata = allUsers.filter((u) => u.email.includes(searchQuery))
            setUsers(userdata)
        }
    }, [searchQuery])

    const addChat = async (receiver_email) => {
        const response = await axios.post('http://localhost:8080/addChatRoom', {
            sender_id: user.email,
            receiver_id: receiver_email
        })
    }

    return (
        <>
            <button className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ padding: 0, margin: 0 }}>
                <img src={'searchIcon.png'} alt="search" style={{ height: '16px', width: '16px' }} />
            </button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <input className="modal-title fs-5" type='text' id="staticBackdropLabel" style={{ backgroundColor: 'white', color: 'black', borderRadius: '6px', padding: '2px' }} onChange={(e) => setSearchQuery(e.target.value)}></input>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ul className="list-group">
                                {
                                    users.map((u) => {
                                        return <li key={u.email} className="list-group-item" onClick={() => addChat(u.email)}>{u.first_name} {u.last_name} - {u.email}</li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
