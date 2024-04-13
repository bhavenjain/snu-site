import React from 'react'
import Cookies from 'js-cookie'

// Styles
import styles from "./Header.module.css"

const Header = () => {
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : {}
  return (
    <div className={styles.header}>
        <b>Hello, {user?.name}</b>
    </div>
  )
}

export default Header
