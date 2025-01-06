async function fetchLastImage() {
    try {
        const response  = await fetch(`${urlApi}/images/allimages`, {
            method: 'GET',
            headers: { 
            Authorization: "Bearer " + sessionStorage.getItem("token"),
            }
        });

        if (response.status === 200) {
            const data = await response.json();
            
            if (!data.allImages || !Array.isArray(data.allImages)) {
                throw new Error('La réponse de l\'API ne contient pas un tableau sous la clé "images".');
            }
            const images = data.allImages;
            
            const lastImageId = images.reduce((latest, image) => 
                new Date(image.createdAt) > new Date(latest.createdAt) ? latest : image
            ).id;
            console.log(lastImageId)
            
            const imageResponse = await fetch(`${urlApi}/images/${lastImageId}`, {
                method: 'GET',
            });
            console.log(imageResponse)

            if (imageResponse.status === 200) {
                const lastImageData = await imageResponse.json();
                const img = lastImageData.image
                localStorage.setItem("myImgUrl", img.imageUrl)
                const templateThisImage = document.getElementById('templateThisImage');
                const seeImg = document.importNode(templateThisImage.content, true);
                seeImg.getElementById('thisImageTitle').innerHTML = img.imageTitle;
                seeImg.getElementById('thisImageUrl').src = img.imageUrl
                document.getElementById('thisImage').appendChild(seeImg);
            } else {
                console.log('Erreur avec le statut (détails):', imageResponse.status, imageResponse.statusText);
            }
            
        } else {
            console.log('Erreur avec le statut (liste):', response.status, response.statusText);
        }
    } catch (error) {
        console.log('Erreur lors de la récupération du dernier image:', error);
    }
}
fetchLastImage();

function getThisImgUrl() {
    const myImg = localStorage.getItem('myImgUrl');
    const existingContent = localStorage.getItem('content');
    const data = existingContent ? existingContent + `<img src="${myImg}"></img>` : `<img src="${myImg}"></img>`;
    localStorage.setItem('content', data);
    localStorage.removeItem("myImgUrl");
    window.opener.location = `${baseURL}backoffice.html`;
    self.close()
}