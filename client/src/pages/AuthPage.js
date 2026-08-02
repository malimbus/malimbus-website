import React from 'react'
import Auth from '../components/Auth/Auth'
import { Link } from 'react-router-dom'


const layoutStyle = {
    padding: '120px 0px 100px 0px'
}

const AuthPage = () => {
    return (
        <div style={layoutStyle}>
            <Auth />
            <Link to="forgot"><p style={{textAlign: 'center', color: '#1d7dd6', marginTop: '20px'}}>Forgotten Password?</p></Link>
        </div>
    )
}

export default AuthPage
