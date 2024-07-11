import { hashPassword, comparePassword } from "./authService.js";
import User from "../model/user.js";

async function createUser ({ firstName, lastName, email, password }){
    const exist = await User.findOne({ email: email });

    if (exist) {
        throw new Error('Email is taken');
    }

    const hashedPassword = await hashPassword(password);

    await new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword
    }).save()
}

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
        throw new Error('Wrong password');
    }

    return user;
}

export { createUser, loginUser };