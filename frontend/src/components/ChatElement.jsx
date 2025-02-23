import React from 'react'
import { MessageBox } from 'react-chat-elements'


function ChatElement() {
    return (
        <div className="card" style={{ width: '50%', backgroundColor: 'whitesmoke', position: 'relative' }}>
            <div className="card-body" style={{ padding: 3 }}>
                This is some text within a card body.
            </div>
        </div>
    )
}

export default ChatElement
