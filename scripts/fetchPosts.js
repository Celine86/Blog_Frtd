import {renderPage} from "./renderPage";
import {renderPaginationControls} from "./renderPaginationControls";
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
            renderPage(currentPage, 'allPosts', 'templatePosts');
            renderPaginationControls();
        } else {
            console.log(response);
        }
    } catch (error) {
        console.log(error);
    }
}

fetchPosts();
