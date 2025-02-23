import React from 'react'

export default function TextInput() {
    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '3px' }}>
            <input type="text" style={{ backgroundColor: 'white', width: '88.5%', borderRadius: '6px', color: 'black', border: '1px solid black' }} className="form-control" placeholder='Start Typing...' />
            <button type="submit" className="btn btn-primary" style={{ borderRadius: '6px' }}>Send</button>
        </div>
    )
}
