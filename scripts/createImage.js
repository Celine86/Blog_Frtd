document.getElementById('sendImage').addEventListener('submit', async function sendImageInfos(event) {
    event.preventDefault();

    let formData = new FormData();
    formData.append('image', document.getElementById('image').files[0]);
    formData.append('title', document.getElementById('title').value);

    try {
        let response = await fetch(`${urlApi}/images/create`, {
            method: 'POST',
            body: formData,
            headers: { 
                Authorization: "Bearer " + sessionStorage.getItem("token"),
                'Accept': 'application/json',
            }
        });
        if(response.status === 200) {
            console.log("image ajoutée");
            window.location.href = "./imageAdded.html";

        } else { 
            console.log(response);
        }
    } catch (error) {
        console.log(error);
    }
});
