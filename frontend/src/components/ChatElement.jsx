import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { MessageBox } from 'react-chat-elements'


function ChatElement({ message, key }) {
    const { user } = useAuth0()

    return (
        <div key={key} style={{
            display: 'flex',
            justifyContent: message.sender_id !== user.email ? 'start' : 'end'
        }}>
            <div className="card" style={{ width: '50%', backgroundColor: 'whitesmoke', right: 0 }}>
                <div className="card-body" style={{ padding: '3px' }}>
                    <div style={{ display: 'flex', justifyContent: 'start', gap: '4px' }}>
                        <img src={'user.png'} alt="" height={'16px'} width={'16px'} style={{ marginTop: '1.5px' }} />
                        <p style={{ fontWeight: '600', fontSize: '13px', margin: 0 }}>
                            {message.senderDetails[0].first_name + ' ' + message.senderDetails[0].last_name}</p>
                    </div>
                    {message.message}
                </div>
            </div>
        </div>
    )
}

export default ChatElement;
