'use strict'

import express from 'express'
import { addAnimal, updateA, deleteA, getAnimal, getAnimals } from './animal.controller.js'

const api = express.Router()

api.post('/addAnimal', addAnimal)
api.put('/updateAnimal/:id', updateA)
api.delete('/deleteAnimal/:id', deleteA)
api.get('/getAnimals/', getAnimals)
api.get('/getAnimal/:id', getAnimal)

export default api