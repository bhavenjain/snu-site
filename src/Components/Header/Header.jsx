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
        <b style={{display: "flex", alignItems: "center", }}>
          <img src={'/SVG_Profile.svg'} width={25} height={25} style={{marginRight: "10px"}} />
          Hello, {user?.name ? user?.name : "User"}
        </b>
        <span className={styles.logout} onClick={handleLogout}>Logout</span>
    </div>
  )
}

export default Header
