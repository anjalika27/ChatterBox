import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import SearchUser from './SearchUser'
import { Modal, Button } from "react-bootstrap";

export default function Navbar({ chatRooms, setChatRooms, currentChatRoom, setCurrentChatRoom }) {
    const { user, isAuthenticated, logout } = useAuth0()
    const [profile, setProfile,] = useState(false)
    return (
        <>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '4px 10px', borderBottom: '0.1px solid grey' }}>

                <SearchUser chatRooms={chatRooms} setChatRooms={setChatRooms} currentChatRoom={currentChatRoom} setCurrentChatRoom={setCurrentChatRoom} />

                <div style={{ fontWeight: 'bold', marginTop: '5px' }}>ChatterBox</div>

                <button className="btn btn-outline-info" onClick={() => setProfile(true)} style={{ padding: 0 }}>
                    <img src={isAuthenticated ? user.picture : "user.png"} alt="user" style={{ height: '28px', width: '28px' }} />
                </button>
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
        </>
    )


}
