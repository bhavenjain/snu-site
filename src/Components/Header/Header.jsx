import React from 'react'
import Cookies from 'js-cookie'

// Styles
import styles from "./Header.module.css"

const Header = () => {
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : {}

  const handleLogout = () => {
    Cookies.set("token", "")
    Cookies.set("user", "")
    window.location.href = "/login"
  }

  return (
    <div className={styles.header}>
        <b>Hello, {user?.name}</b>
        <span onClick={handleLogout}>Logout</span>
    </div>
  )
}

export default Header
