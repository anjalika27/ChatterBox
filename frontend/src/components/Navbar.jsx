import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export default function Navbar() {
    const { user, isAuthenticated } = useAuth0()
    return (
        <>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '4px 10px' }}>
                <div>sljerb</div>
                <button className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ padding: 0 }}>
                    <img src={isAuthenticated ? user.picture : "user.png"} alt="user" style={{ height: '28px', width: '28px' }} />
                </button>
            </div>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Profile</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <img src={isAuthenticated ? user.picture : "user.png"} alt="user" style={{ height: '120px', width: '120px', marginLeft: '38%', borderRadius: '50%' }} />
                            <p><strong>Name: </strong>{isAuthenticated ? user.name : ""}</p>
                            <p><strong>Email: </strong>{isAuthenticated ? user.email : ""}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )


}
