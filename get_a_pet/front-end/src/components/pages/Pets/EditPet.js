import api from '../../../utils/api'

import { useState,useEffect } from 'react'

import styles from './AddPet.module.css'

import { useParams } from 'react-router-dom'

import PetForm from '../../Form/PetForm'

//hooks
import userFlashMessage from '../../../hooks/useFlashMessage'

const EditPet = () => {
    const [pet,setPet] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const {id} = useParams()
    const { setFlashMessage } = userFlashMessage()

    useEffect(() => {
        api.get(`/pets/${id}`,{
            headers:{
                Authorization:`Bearer ${JSON.parse(token)}`
            }
        })
        .then((res) => {
            setPet(res.data.pet)
            console.log(setPet._id + 'pet')
        })

    },[token,id])
    const updatePet = async(pet) => {
        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(pet).forEach((key) => {
            if(key === 'images'){
                for(let i = 0; i < pet[key].length; i++){
                    formData.append('images',pet[key][i])
                }
            }else{
                formData.append(key,pet[key])
            }
        })
        const data = await api.patch(`pets/${pet._id}`,formData,{
            headers:{
                Authorization:`Bearer ${JSON.parse(token)}`,
                'Content-Type':'multipart/form-data'
            }
        }).then((res) => {
            return res.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })
        setFlashMessage(data.message,msgType)
    }

    console.log(pet.name)
    console.log(pet._id)
  return (
    <section>
       <div className={styles.addpet_header}>
        <h1>Editando o Pet: {pet.name} </h1>
        <p>Depois de edição os dados serão atualizados no sistema</p>
       </div>
       {pet.name && (
            <PetForm handleSubmit={updatePet} petData={pet} btnText="Atualizar" />
       )}
    </section>
  )
}

export default EditPet