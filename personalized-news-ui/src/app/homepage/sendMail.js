
'use client'
// import './sendMail.css'

const SendMail = () => {

    async function sendMail() {
        const userData = localStorage.getItem('userData');
        if (userData) {
            const parsedUserData = JSON.parse(userData);
            if (parsedUserData.user && parsedUserData.user._id && parsedUserData.user.email) {
                const userID = parsedUserData.user._id;
                const email = parsedUserData.user.email;

                const response = await fetch(`http://localhost:5559/mail/send-mail/${userID}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(email)
                })

                if(!response.ok){
                    alert("Error during sending")
                }
            }
        }
    }


    return (
        <div>
            <button className='sendmail-btn' onClick={sendMail}><i className="fa-solid fa-paper-plane" /> Send to mail</button>
        </div>
    )
}

export default SendMail;