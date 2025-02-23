import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export default function Signin() {
    const { user, loginWithRedirect } = useAuth0();
    return (
        <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignContent: 'center', marginTop: '40%', width: '100%' }}>
            <h3>Welcome to ChatterBox!</h3>
            <button onClick={() => loginWithRedirect()} className='btn btn-primary'>SignIn</button>
        </div>
    )
}

