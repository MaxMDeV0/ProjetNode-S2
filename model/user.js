import mongoose from "./index.js";

const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
})
  

export default mongoose.model('user', userSchema)