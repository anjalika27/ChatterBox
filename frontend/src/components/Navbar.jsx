import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import SearchUser from './SearchUser'
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';

export default function Navbar({ chatRooms, setChatRooms, currentChatRoom, setCurrentChatRoom }) {
    const { user, isAuthenticated, logout } = useAuth0()
    const [profile, setProfile] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([])

    const [groupChatModal, setGroupChatModal] = useState(false);
    const handleCheckboxChange = (option) => {
        setSelectedUsers((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
        );
    };

    async function updateGroup() {
        const response = await axios.post('http://localhost:8080/updateGroup/' + currentChatRoom._id, {
            users: selectedUsers
        }, {
            headers: { 'Content-Type': 'application/json' },
        })

        if (typeof response == 'object') {
            setCurrentChatRoom(response.data)
        }
    }

    useEffect(() => {
        const getAllUsers = async () => {
            const response = await axios.get('http://localhost:8080/allUsers');
            const users = response.data.filter((u) => u.email != user.email)
            setAllUsers(users);
        }
        getAllUsers();
    }, [])

    useEffect(() => {
        if (currentChatRoom)
            setSelectedUsers(currentChatRoom.participants)
    }, [currentChatRoom])

    return (
        <>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '4px 10px', borderBottom: '0.1px solid grey' }}>

                <SearchUser chatRooms={chatRooms} setChatRooms={setChatRooms} currentChatRoom={currentChatRoom} setCurrentChatRoom={setCurrentChatRoom} />

                <div style={{ fontWeight: 'bold', marginTop: '5px' }}>ChatterBox</div>

                <div style={{ display: 'flex', gap: '7px' }}>
                    <strong onClick={() => setGroupChatModal(true)} style={{ margin: 0, display: 'flex', alignItems: 'center', border: '1px solid grey', padding: "2px 5px", borderRadius: '8px' }}>{currentChatRoom?.group_name ? currentChatRoom.group_name : ""}</strong>
                    <img src="notification-icon.png" alt="" height={'16px'} width={'16px'} style={{ marginTop: '7px' }} />
                    <button className="btn btn-outline-info" onClick={() => setProfile(true)} style={{ padding: 0 }}>
                        <img src={isAuthenticated ? user.picture : "user.png"} alt="user" style={{ height: '28px', width: '28px' }} />
                    </button>
                </div>
            </div>

            {profile && <Modal show={profile} onHide={() => setProfile(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: '20px' }}>Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center" style={{ fontSize: '14px' }}>
                    <img
                        src={isAuthenticated ? user.picture : "user.png"}
                        alt="user"
                        style={{
                            height: "120px",
                            width: "120px",
                            borderRadius: "50%",
                            marginBottom: "10px",
                        }}
                    />
                    <p>
                        <strong>Name: </strong>
                        {isAuthenticated ? user.name : "Guest"}
                    </p>
                    <p>
                        <strong>Email: </strong>
                        {isAuthenticated ? user.email : "Not Available"}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => logout()}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal >}

            {groupChatModal &&
                <Modal show={groupChatModal} onHide={() => setGroupChatModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ fontSize: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h2>{currentChatRoom.group_name}</h2>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ fontSize: '14px', padding: 0, overflowY: 'scroll', scrollbarWidth: 'thin', height: '100px' }}>
                        <div
                            style={{
                                position: "absolute",
                                // top: "50%",
                                height: '100px',
                                left: "0",
                                width: "100%",
                                border: "1px solid #ccc",
                                background: "#fff",
                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                zIndex: 1000,
                                padding: "10px",
                            }}
                        >
                            {allUsers.map((option) => (
                                <label
                                    key={option._id}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        marginBottom: "5px",
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.includes(option.email)}
                                        onChange={() => handleCheckboxChange(option.email)}
                                        style={{ marginRight: "8px" }}
                                    />
                                    {option.first_name + " " + option.last_name}
                                </label>
                            ))}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-primary' onClick={() => { updateGroup(), setGroupChatModal(false) }}>Add</button>
                    </Modal.Footer>
                </Modal>
            }
        </>
    )


}
