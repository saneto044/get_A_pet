import api from '../utils/api'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'
const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const {setFlashMessage} = useFlashMessage()
  const Navigate = useNavigate()
  
  useEffect(() => {
    const token = localStorage.getItem('token')

    if(token){
      api.defaults.headers.Athorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }
  },[])

  const register = async (user) => {
    let msgText = 'Cadastro realizado com sucesso!'
    let msgType = 'success' 
    try {
        const data = await api.post('/users/register',user)
        .then((res) => {
            return res.data 
        })
        await authUser(data)
    } catch (error) {
      msgText = error.response.data.message
      msgType = 'error'
    }
    setFlashMessage(msgText,msgType)
  } 

  const authUser = async (data) => {
    setAuthenticated(true)
    localStorage.setItem('token', JSON.stringify(data.token))
    Navigate('/')
  }
  
  const login = async (user) => {
    let msgText = 'Login feito com sucesso'
    let msgType = 'success'
    try {

      const data = await api.post('/users/login', user)
      .then((res) => {
        return res.data
      })
      await authUser(data)
    } catch (error) {
      msgText = error.response.data.message 
      msgType = 'error' 
    } 
    setFlashMessage(msgText,msgType)

  }
  const logout = async () => {
    const msgText = 'Logout feito com sucesso!'
    const msgType = 'success'

    setAuthenticated(false)
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = undefined
    Navigate('/login')
    setFlashMessage(msgText,msgType)
  }
  return{ authenticated,register, logout,login }
}

export default useAuth