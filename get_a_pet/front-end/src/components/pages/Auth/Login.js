import {useState,useContext} from 'react'
import Input from '../../Form/Input'

import styles from '../../Form/Form.module.css'
import { Link } from 'react-router-dom'

//Context
import {Context} from '../../../context/UserContext'

const Login = () => {
  const [user,setUser] = useState({})
  const {login} = useContext(Context)

  const handleChange = (e) =>{
    setUser({...user,[e.target.name]: e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(user)
    login(user)
  }
  return (
    <section className={styles.form_container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input 
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o seu e-mail"
          handleOnChange={handleChange}
        />

        <Input 
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />
        <input type='submit' value="Entrar" />
      </form>
      <p>
        Não tem conta <Link to="/register">Clique Aqui</Link>
      </p>
    </section>
  )
}

export default Login