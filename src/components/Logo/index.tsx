import logo from "/public/filmhublogo.svg"
import styles from "./logo.module.scss"

const Logo = () => {
  return (
    <img src={logo} alt="logo" className={styles.img}/>
  )
}

export default Logo