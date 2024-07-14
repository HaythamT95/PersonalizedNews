import User from "../model/user.js";

const userData = async (userID) => {
    const user = await User.findById(userID);

    if (!user) {
        throw new Error('User not found');
    }

    return user;
}

const createOrReplacePreferences = async (userID, preferences) => {
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

export { userData, updatePreferences, createOrReplacePreferences, deletePreference };