import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/NavBar.css'

export default function NavBar() {
    return (
        <div className="navbar">
            <Link to="/">Home</Link> &nbsp;
            <Link to="/users">All Users</Link> &nbsp;
            <Link to="/types">All Types</Link> &nbsp;
            {/* <Link to="/todos">All Todos</Link> */}
        </div>
    )
}
