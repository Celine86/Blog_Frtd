let currentPage = 1;
let imgsPerPage = 10;
let totalPages = 1;
let allImgs = [];

async function showImages() {
    try {
            const response  = await fetch(`${urlApi}/images/allimages`, {
                method: 'GET',
                headers: { 
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            }
        });

        if (response.status === 200) {
            const data = await response.json();
            allImgs = data.allImages;
            totalPages = Math.ceil(allImgs.length / imgsPerPage);
            renderPage(currentPage);
            renderPaginationControls();
        } else {
            console.log(response);
        }
    } catch (error) {
        console.log(error);
    }
};

function renderPage(page) {
    const imgsContainer = document.getElementById('allImgs');
    const template = document.getElementById('templateImgs');
    imgsContainer.innerHTML = '';
    const startIndex = (page - 1) * imgsPerPage;
    const endIndex = Math.min(startIndex + imgsPerPage, allImgs.length);

    for (let i = startIndex; i < endIndex; i++) {
        const img = allImgs[i];
        const seeImg = document.importNode(template.content, true);
        
        seeImg.getElementById('imgTitle').textContent = img.imageTitle
        seeImg.getElementById('imgUrl').src = img.imageUrl
        seeImg.getElementById('imgLink').href = `myimage.html?id=${img.id}`
        document.getElementById('allImgs').appendChild(seeImg)  
    
        imgsContainer.appendChild(seeImg);
    }
};

function renderPaginationControls() {
    const paginationContainer = document.getElementById('paginationControls');
    paginationContainer.innerHTML = '';

    const prevButton = document.createElement('button');
    prevButton.classList.add('paginationBtn');
    prevButton.textContent = '<<';
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            renderPage(currentPage);
            renderPaginationControls();
        }
    };
    paginationContainer.appendChild(prevButton);

    const pageInfo = document.createElement('span');
    pageInfo.classList.add('paginationNumbers');
    pageInfo.textContent = `${currentPage} / ${totalPages}`;
    paginationContainer.appendChild(pageInfo);

    const nextButton = document.createElement('button');
    nextButton.classList.add('paginationBtn');
    nextButton.textContent = '>>';
    nextButton.disabled = currentPage === totalPages;
    nextButton.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderPage(currentPage);
            renderPaginationControls();
        }
    };
    paginationContainer.appendChild(nextButton);
};

showImages();
