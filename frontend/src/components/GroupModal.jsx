import { useAuth0 } from '@auth0/auth0-react';
import { useState, React } from 'react'
import { Modal, Button } from "react-bootstrap";


export default function GroupModal({ addChat, groupChatModal, setGroupChatModal, users, onClose }) {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groupChatName, setGroupChatName] = useState('')

    const handleCheckboxChange = (option) => {
        setSelectedUsers((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
        );
    };


    return (
        <>
            {groupChatModal &&

                <Modal show={groupChatModal} onHide={() => setGroupChatModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ fontSize: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h2>New Group</h2>

                                <input onChange={(e) => setGroupChatName(e.target.value)} style={{ backgroundColor: 'white', borderRadius: "18px", marginLeft: '20px', color: 'black' }}></input>
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
                            {users.map((option) => (
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
                        <button className='btn btn-primary' onClick={() => { addChat(selectedUsers, groupChatName, true), setGroupChatModal(false) }}>Add</button>
                    </Modal.Footer>
                </Modal>
            }
        </>
    )
}
