let currentPage = 1;
const postsPerPage = 6;
let totalPages = 1;
let allPosts = [];

async function fetchPosts() {
    try {
        const response = await fetch(`${urlApi}/posts/all`, {
            method: 'GET',
        });

        if (response.status === 200) {
            const data = await response.json();
            allPosts = data.allPosts;
            totalPages = Math.ceil(allPosts.length / postsPerPage);
            renderPage(currentPage);
            renderPaginationControls();
        } else {
            console.log(response);
        }
    } catch (error) {
        console.log(error);
    }
}

function renderPage(page) {
    const postsContainer = document.getElementById('allPosts');
    postsContainer.innerHTML = '';

    const startIndex = (page - 1) * postsPerPage;
    const endIndex = Math.min(startIndex + postsPerPage, allPosts.length);

    /*
    const templatePosts = document.getElementById('templatePosts');
    if (!templatePosts) {
        console.error("L'élément template avec l'ID 'templatePosts' est introuvable.");
        return;
    }
    */

    for (let i = startIndex; i < endIndex; i++) {
        const post = allPosts[i];
        const seePost = document.importNode(templatePosts.content, true);
        seePost.getElementById('postTitle').textContent = post.title;
        seePost.getElementById('postContent').textContent = (post.content.length > 120 ? post.content.slice(0, 120) + '...' : post.content);
        seePost.getElementById('postLink').href = `post.html?id=${post.id}`;
        postsContainer.appendChild(seePost);
    }
}

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
}

fetchPosts();
