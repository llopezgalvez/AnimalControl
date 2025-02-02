//Encriptar, validar... diferentes datos

import { compare, hash } from 'bcrypt'

export const encrypt  = (password) =>{
    try {
        return hash(password, 10) //El 10 es para indicar que queremos 10 capaz de seguridad, minimo 8 a 10
    } catch (error) {
        console.error(error)
        return error
    }
}

export const checkPassword = async(password, hash)=>{
    try {
        return await compare(password, hash)
    } catch (error) {
        console.error(error)
        return error
    }
}

export const checkUpdate = (data, userId) =>{
    if(userId){
        if(
            Object.entries(data).length === 0 || 
            data.password ||
            data.password == '' ||
            data.role ||
            data.role == ''
        ) return false
        return true
    }else{
        return false
    }
}
