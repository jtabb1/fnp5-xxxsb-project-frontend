import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/NavBar.css'

export default function NavBar() {
    return (
        <div className="navbar">
            <Link to="/">Home</Link> &nbsp;
            <Link to="/employees">All Employees</Link> &nbsp;
            <Link to="/tasks">All Tasks</Link> &nbsp;
            <Link to="/trainings">All Trainings</Link>
        </div>
    )
}
