const el = document.getElementById('otp');
if (el) {
    el.addEventListener('submit', async function sendLoginInfos(e) {
        e.preventDefault();

        let email = sessionStorage.getItem('email');
        let otp = document.getElementById('codeOtp').value;
    
        if(!otp) {
            alert ("merci de renseigner le code otp");
        }
        else {
            try {
                let response = await fetch(`${urlApi}/users/verify`, {
                        method: 'POST',
                        body: JSON.stringify({
                            email,
                            otp
                        }),
                        headers: { 
                            'Content-Type': 'application/json',
                        }
                }) 
                if(response.status === 200) { 
                    response = await response.json()
                    console.log(response)
                    sessionStorage.setItem("token", response.token)
                    sessionStorage.setItem("username", response.username)
                    sessionStorage.setItem("useremail", response.email)
                    sessionStorage.setItem("loginmsg", response.message)
                    sessionStorage.setItem('isAuthenticated', true)
                    window.location = 'backoffice.html';
                } else { 
                    alert ("OTP incorrect")
                    sessionStorage.setItem('isAuthenticated', false)
                }
            } catch (error) {
                console.log(error);
            }
        }
    });
} else {
    console.log("no el")
}