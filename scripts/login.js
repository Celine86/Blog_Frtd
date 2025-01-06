const el = document.getElementById('login');
if (el) {
    el.addEventListener('submit', async function sendLoginInfos(e) {
        e.preventDefault();
    
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
    
        if(!email || !password) {
            alert ("merci de renseigner l'identifiant et le mot de passe");
        }
        else {
            try {
                let response = await fetch(`${urlApi}/users/login`, {
                        method: 'POST',
                        body: JSON.stringify({
                            email,
                            password
                        }),
                        headers: { 
                            'Content-Type': 'application/json',
                        }
                }) 
                if(response.status === 200) { 
                    response = await response.json()
                    sessionStorage.setItem("email", email)
                    window.location = 'otp.html';
                } else { 
                    alert ("Mot de passe ou Identifiant incorrect");
                }
            } catch (error) {
                console.log(error);
            }
        }
    });
} else {
    console.log("no el")
};
