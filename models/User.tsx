import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'email already exists!'],
        required: [true, 'email is required!']
    },
    username: {
        type: String,
        required: [true, 'username is required'],
        match: [/^(?!.*[_.]{2})[a-zA-Z0-9._]{5,20}$/, "Username invalid, it should contain 5-20 alphanumeric letters!"]
    },
    image: {
        type: String,
    }
})

const User = models.User || model("User", UserSchema);

export default User;