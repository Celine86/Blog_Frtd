import {renderPage} from "./renderPage";

export function renderPaginationControls() {
    const paginationContainer = document.getElementById('paginationControls');
    paginationContainer.innerHTML = '';

    const prevButton = document.createElement('button');
    prevButton.classList.add('paginationBtn');
    prevButton.textContent = '<<';
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            renderPage(currentPage, 'allPosts', 'templatePosts');
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
            renderPage(currentPage, 'allPosts', 'templatePosts');
            renderPaginationControls();
        }
    };
    paginationContainer.appendChild(nextButton);
}
