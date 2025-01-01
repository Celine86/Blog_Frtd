const myImgIdEquals = window.location.search;
const myImgIdOnly = new URLSearchParams(myImgIdEquals);
const myImgId = myImgIdOnly.get("id");

async function fetchMyImg() {
    try {
        const response  = await fetch(`${urlApi}/images/${myImgId}`, {
            method: 'GET'
        })
        if(response.status === 200) { 
            const data = await response.json();
            const img = data.image
            localStorage.setItem("myImgUrl", img.imageUrl)
            const templateMyImg = document.getElementById('templateMyImg')
            const seeImg = document.importNode(templateMyImg.content, true)
            seeImg.getElementById('myImgTitle').textContent = img.imageTitle
            seeImg.getElementById('myImgUrl').src = img.imageUrl
            document.getElementById('myImg').appendChild(seeImg)  
        } else {
            console.log(response)
            //throw new Error(response.status)
        }
    }catch(error) {
        console.log(error)
    }
}
fetchMyImg();

/*
function getMyImgUrl() {
    const myImg = localStorage.getItem('myImgUrl');
    const existingContent = localStorage.getItem('content');
    const data = existingContent ? existingContent + `<img src="${myImg}"></img>` : `<img src="${myImg}"></img>`;
    localStorage.setItem('content', data);
    localStorage.removeItem("myImgUrl");
    window.location = 'editor.html';
}

async function dontGetMyImgUrl() {
    localStorage.removeItem("myImgUrl")
    window.location = 'images.html';
}
*/