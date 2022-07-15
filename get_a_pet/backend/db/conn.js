const mongoose = require('mongoose')
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD

const conn = async () => {
    try{
        const dbConn = await mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.tcdxk.mongodb.net/?retryWrites=true&w=majority`)
        console.log('BD conectado com sucesso')
        return dbConn
    }catch(error){
        console.log(error)
    }
}
conn()
module.exports = conn ; 