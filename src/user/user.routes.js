'use strict'

import express from 'express'
import {test, register, login, update, deleteU} from './user.controller.js'

const api = express.Router()

api.get('/test', test)
api.post('/register', register)
api.post('/login', login)
api.put('/update/:id', update)
api.delete('/delete/:id', deleteU)

export default api