import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export default function Logout() {
    const { user, logout } = useAuth0();
    return (
        <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignContent: 'center', marginTop: '40%', width: '100%' }}>
            <button onClick={e => logout()} className='btn btn-primary'>SignIn</button>
        </div>
    )
}
