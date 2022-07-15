import { useContext, useState } from "react"
import Input from "../../Form/Input"
import styles from '../../Form/Form.module.css'
import {Link} from 'react-router-dom'
//Context 
import { Context } from "../../../context/UserContext"

const Register = () => {
  const [user,setUser] = useState({})
  const {register} = useContext(Context) 

  const handleChange = (e) => {
    setUser({ ...user , [e.target.name] : e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    //enviar o usuario para o banco 
    register(user)
  }

  return ( 
    <section className={styles.form_container} >
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <Input 
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o seu nome"
          handleOnChange={handleChange}
        />
        <Input 
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu telefone"
          handleOnChange={handleChange}
        />
        <Input 
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o seu email"
          handleOnChange={handleChange}
        />
        <Input 
          text="Password"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />
        <Input 
          text="Confirmação de senha"
          type="password"
          name="confirmPassword"
          placeholder="Comfirme a sua senha"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Cadastrar" />
      </form>
      <p>Já tem conta ? <Link to="/">Clique aqui</Link></p>
    </section>
  )
}

export default Register 