let imgCurrentPage = 1;
let imgsPerPage = 4;
let imgTotalPages = 1;
let allImgs = [];
let allImgsSorted = [];

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
            allImgsSorted = allImgs.sort((a, b) => b.id - a.id);

            imgTotalPages = Math.ceil(allImgsSorted.length / imgsPerPage);
            renderPage(imgCurrentPage);
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
    const imgTemplate = document.getElementById('templateImgs');
    imgsContainer.innerHTML = '';
    const imgStartIndex = (page - 1) * imgsPerPage;
    const imgEndIndex = Math.min(imgStartIndex + imgsPerPage, allImgsSorted.length);

    for (let i = imgStartIndex; i < imgEndIndex; i++) {
        const img = allImgsSorted[i];
        const seeImg = document.importNode(imgTemplate.content, true);
        
        seeImg.getElementById('imgTitle').textContent = img.imageTitle
        seeImg.getElementById('imgUrl').src = img.imageUrl
        seeImg.getElementById('imgLink').addEventListener('click', (event) => {
            const urlTemplate = `components/image.html?id=${img.id}`;
            openPopup(event, urlTemplate);
        });
        document.getElementById('allImgs').appendChild(seeImg)  
        imgsContainer.appendChild(seeImg);
    }
};

function renderPaginationControls() {
    const paginationContainer = document.getElementById('imgPaginationControls');
    paginationContainer.innerHTML = '';

    const prevButton = document.createElement('button');
    prevButton.classList.add('imgPaginationBtn');
    prevButton.textContent = '<<';
    prevButton.disabled = imgCurrentPage === 1;
    prevButton.onclick = () => {
        if (imgCurrentPage > 1) {
            imgCurrentPage--;
            renderPage(imgCurrentPage);
            renderPaginationControls();
        }
    };
    paginationContainer.appendChild(prevButton);

    const pageInfo = document.createElement('span');
    pageInfo.classList.add('imgPaginationNumbers');
    pageInfo.textContent = `${imgCurrentPage} / ${imgTotalPages}`;
    paginationContainer.appendChild(pageInfo);

    const nextButton = document.createElement('button');
    nextButton.classList.add('imgPaginationBtn');
    nextButton.textContent = '>>';
    nextButton.disabled = imgCurrentPage === imgTotalPages;
    nextButton.onclick = () => {
        if (imgCurrentPage < imgTotalPages) {
            imgCurrentPage++;
            renderPage(imgCurrentPage);
            renderPaginationControls();
        }
    };
    paginationContainer.appendChild(nextButton);
};

showImages();
