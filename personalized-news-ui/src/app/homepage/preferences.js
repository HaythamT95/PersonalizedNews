'use client'
import { useEffect, useState } from 'react';
// import './preferences.css'

const Preferences = () => {
    const [user, setUser] = useState(null)
    const [inputCount, setInputCount] = useState(0);
    const [msgUpdate, setMsgUpdate] = useState('')

    useEffect(() => {
        const userData = localStorage.getItem('userData')
        if (userData) {
            const parsedUserData = JSON.parse(userData);
            setUser(parsedUserData);
            if (parsedUserData.user && parsedUserData.user.preferences) {
                const preferences = parsedUserData.user.preferences;
                const inputGroup = document.querySelector('.inp-group');
                inputGroup.innerHTML = '';
                setInputCount(0);
                populatePreferences(preferences.newsCategories, 'News');
                populatePreferences(preferences.techUpdates, 'Technology');
            }
        }
        const inputGroup = document.querySelector('.inp-group');
        setInputCount(inputGroup.querySelectorAll('.flex').length);
    }, []);


    function populatePreferences(preferencesArray, type) {
        if (preferencesArray) {
            preferencesArray.forEach(name => {
                addInputWithValues(type, name);
            });
        }
    }

    function addInput() {
        addInputWithValues('', '');
    }

    function addInputWithValues(typeValue, nameValue) {
        const inputGroup = document.querySelector('.inp-group');
        const currentElements = inputGroup.querySelectorAll('.flex').length;

        if (currentElements >= 10) {
            setMsgUpdate('Maximum of 10 elements can be added.');
            setTimeout(() => setMsgUpdate(''), 5000);
            return;
        }

        const type = document.createElement('select');

        const option1 = document.createElement('option');
        option1.value = 'Technology';
        option1.text = 'Technology';

        const option2 = document.createElement('option');
        option2.value = 'News';
        option2.text = 'News';

        type.appendChild(option1);
        type.appendChild(option2);

        type.value = typeValue;

        const name = document.createElement('input');
        name.type = "text";
        name.placeholder = "Enter name";
        name.value = nameValue;

        const btn = document.createElement('a');
        btn.className = "delete";
        btn.innerHTML = "&times;";

        btn.addEventListener('click', function () {
            this.parentElement.remove();
            setInputCount(inputCount => inputCount - 1);
        });

        const flex = document.createElement('div');
        flex.className = "flex";

        flex.appendChild(type);
        flex.appendChild(name);
        flex.appendChild(btn);

        inputGroup.appendChild(flex);
        setInputCount(inputCount + 1);
    }

    async function submitPreferences() {
        const inputGroup = document.querySelector('.inp-group');
        const preferences = {
            newsCategories: [],
            techUpdates: []
        };

        inputGroup.querySelectorAll('.flex').forEach(flex => {
            const type = flex.querySelector('select').value;
            const name = flex.querySelector('input').value;

            if (type === 'News') {
                if (name.trim()) {
                    preferences.newsCategories.push(name);
                }
            } else if (type === 'Technology') {
                if (name.trim()) {
                    preferences.techUpdates.push(name);
                }
            }
        });

        const userId = user?.user?._id;
        if (!userId) {
            console.error('User ID is missing');
            setMsgUpdate("Error occured")
            setTimeout(() => setMsgUpdate(''), 5000);
            return;
        }

        try {
            const response = await fetch(`http://localhost:5557/user/create-or-replace-preferences/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(preferences)
            });

            if (response.ok) {
                console.log('Preferences saved successfully');
                const updatedUserData = {
                    ...user,
                    user: {
                        ...user.user,
                        preferences
                    }
                };

                localStorage.setItem('userData', JSON.stringify(updatedUserData));
                setUser(updatedUserData);
                setMsgUpdate('Preferences has been updated')
                setTimeout(() => setMsgUpdate(''), 5000);

            } else {
                console.error('Error saving preferences');
                setMsgUpdate('Error during saving')
                setTimeout(() => setMsgUpdate(''), 5000);
            }
        } catch (error) {
            console.error('Network error:', error);
            setMsgUpdate("Error occured")
            setTimeout(() => setMsgUpdate(''), 5000);
        }
    }

    return (
        <div className='container'>
            <div className='wrap'>
                <h1>Preferences</h1>
                <a href="#" className='add' onClick={addInput}>&#43;</a>
            </div>
            <div className='inp-group'>

            </div>
            {msgUpdate && <div className='center-div'><p className="error-message">{msgUpdate}</p></div>}

            {inputCount > 0 &&
                <div className='center-div'>
                    <button type="submit" className='submit-btn' onClick={submitPreferences}>Submit</button>
                </div>}
        </div>
    )
}

export default Preferences;