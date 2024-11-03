import { Schema, model } from "mongoose"

const animalSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    race:{
        type: String,
        required: true
    },
    size:{
        type: String,
        required: true
    },
    sex:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    color:{
        type: String,
        required: true
    },
    animalType:{
        type: String,
        required: true
    },
    keeper:{
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    versionKey: false
})

export default model('animal', animalSchema)