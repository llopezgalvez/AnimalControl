'use strict'

import User from './user.model.js'
import { checkPassword, checkUpdate, encrypt } from '../utils/validator.js'

export const test = (req, res)=>{
    return res.send('Hello world')
}

export const register = async(req, res) =>{
    try {
        let data = req.body

        data.password = await encrypt(data.password)

        data.role = 'CLIENT'

        let user = new User(data)

        await user.save()

        return res.send({message: 'Registered succcessfully'})

    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error registering user', error})
    }
}

export const login = async (req, res) =>{
    try {
        let {username , password } = req.body
        let user = await User.findOne({ username })
        
        if(user && await checkPassword(password, user.password)){
            let loggedUserd = {
                username: user.username,
                name: user.name,
                role: user.role
            }
            return res.send({message: `Welcome ${loggedUserd.name}`, loggedUserd})
        }
        return res.send.status(404).send({message: 'Invalid credentials'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Failed to login'})
    }
}

export const update = async(req, res)=>{
    try {
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})

        let updateUser = await User.findOneAndUpdate(
            {_id: id}, 
            data, 
            {new: true} 
        )
        if(!updateUser) return res.status(401).send({message: 'User not found and not updated'})

        return res.send({message: 'Updated user', updateUser})
    } catch (error) {
        console.error(error)
        if(error.keyValue.username) return res.status(400).send({message: `Username ${error.keyValue.username} is already taken`})
        return res.status(500).send({message: 'Error updating account'})
    }
}


export const deleteU = async(req, res)=>{
    try {
        let {id} = req.params
        let deleteUser = await User.findOneAndDelete({_id: id})
        if(!deleteUser) return res.status(404).send({message: 'Account not found and not deleted'})

        return res.status(200).send({message: `Account with username ${deleteUser.username} deteled successfully`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error deleting user'})
    }
}