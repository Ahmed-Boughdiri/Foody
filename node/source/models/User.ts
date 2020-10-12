import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    recipes: [
        {
            label: String,
            source: String,
            image: String,
            link: String,
            ingredints: Array,
            calories: Number,
            time: Number,
            totalNutrients: Array
        }
    ]
})

export default mongoose.model("User", userSchema);
