import { hashPassword, comparePassword } from "./authService.js";
import User from "../model/user.js";

const createUser = async ({ firstName, lastName, email, password }) => {
    const exist = await User.findOne({ email: email });

    if (exist) {
        throw new Error('Email is taken');
    }

    const hashedPassword = await hashPassword(password);

    const user = await new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword
    }).save()

    return user;
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

const userData = async (userID) => {
    const user = await User.findById(userID);

    if (!user) {
        throw new Error('User not found');
    }

    return user;
}

const addPreferences = async (userID, preferences) => {
    const { newsCategories, techUpdates } = preferences;
    const user = await User.findById(userID);

    if (!user) {
        throw new Error('User not found');
    }

    if (newsCategories) {
        user.preferences.newsCategories = newsCategories;
    }

    if (techUpdates) {
        user.preferences.techUpdates = techUpdates;
    }

    await user.save();
    return user;
};

const updatePreferences = async (userID, preferences) => {
    const { newsCategories, techUpdates } = preferences;

    const user = await User.findById(userID);

    if (!user) {
        throw new Error('User not found');
    }

    if (newsCategories) {
        user.preferences.newsCategories = [...user.preferences.newsCategories, ...newsCategories];
    }

    if (techUpdates) {
        user.preferences.techUpdates = [...user.preferences.techUpdates, ...techUpdates];
    }

    await user.save();
    return user;
};

const deletePreference = async (userID, type, preferences) => {
    const user = await User.findById(userID);

    if (!user) {
        throw new Error('User not found');
    }

    if (type === 'news') {
        user.preferences.newsCategories = user.preferences.newsCategories.filter(cat => !preferences.includes(cat));
    } else if (type === 'tech') {
        user.preferences.techUpdates = user.preferences.techUpdates.filter(update => !preferences.includes(update));
    } else {
        throw new Error('Invalid preference type');
    }
    await user.save();
    return user;
};

export { createUser, loginUser, userData, updatePreferences, addPreferences, deletePreference };