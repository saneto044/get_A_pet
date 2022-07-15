import bus from '../utils/bus'

const userFlashMessage = () => {
    const setFlashMessage = (msg,type) => {
        bus.emit('flash', {
            message:msg,
            type:type,
        })
    }
    return {setFlashMessage}
} 

export default userFlashMessage