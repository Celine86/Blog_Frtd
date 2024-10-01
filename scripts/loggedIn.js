
async function fetchUser() {
    token =  sessionStorage.getItem("token");
    if(!token) {
        console.log("vous n'êtes pas connecté")
    } else {
        try {
            const response  = await fetch(`${urlApi}/users/loggedIn`, {
                method: 'GET',
                    headers: { 
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                }
            })           
            if(response.status === 200) { 
                console.log('bien connecté');
                localStorage.setItem('isAuthenticated', 'true');
            } else {
                console.log('non autorisé');
                localStorage.setItem('isAuthenticated', 'false');
            }
        }catch(error) {
            console.log(error)
        }
    }
}
fetchUser();