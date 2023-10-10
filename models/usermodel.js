import mongoose, { model, models } from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"]
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        match: [/^[a-zA-Z0-9]{8,20}$/, "Not a valid username, it should contain 8-20 alphanumeric characters."]
    },
    image: {
        type: String
    }
});
// check if the model already exist, is yes use the existing one else create a new one.
const User = models.User || model('User', userSchema);

export default User;