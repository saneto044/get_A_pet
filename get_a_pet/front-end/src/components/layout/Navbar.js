import { Link } from "react-router-dom"

import Logo from '../../assets/img/logo.png'
import styles from './Navbar.module.css'

// Context
import { Context } from "../../context/UserContext"
import { useContext } from "react"

const Navbar = () => {
    const {authenticated, logout} = useContext(Context)
    return (
    <div className={styles.navbar}>
        <div className={styles.navbar_logo}>
            <Link to="/">
                <img src={Logo} alt='logo' />
                <h2>Get A Pet</h2>
            </Link>
            
        </div>
        <ul>
            <li>
                <Link to='/'>Adotar</Link>
            </li>
            { authenticated ? (
                <>
                    <li>
                        <Link to="/pet/myadoptions">Minhas Adoções</Link>
                    </li>
                    <li>
                        <Link to="/pet/mypets">Meus Pets</Link>
                    </li>
                    <li>
                        <Link to='/user/profile'>Perfil</Link>
                    </li>
                    <li onClick={logout}>
                            Sair
                    </li>
                </>
            ):(
                <>
                    <li>
                        <Link to='/login'>Entrar</Link>
                    </li>
                    <li>
                        <Link to='/Register'>Cadastrar</Link>
                    </li>
                </>
            )}
        </ul>
    </div>
  )
}

export default Navbar