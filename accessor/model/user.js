import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    preferences: {
        newsCategories: [{
            type: String,
        }],
        techUpdates: [{
            type: String
        }]
    }
})

export default mongoose.model("User", userSchema, "user");