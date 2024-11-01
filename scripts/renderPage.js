export function renderPage(page, postsContainerId = 'allPosts', templateId = 'templatePosts') {
    const postsContainer = document.getElementById(postsContainerId);
    const template = document.getElementById(templateId);
    postsContainer.innerHTML = '';
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = Math.min(startIndex + postsPerPage, allPosts.length);

    for (let i = startIndex; i < endIndex; i++) {
        const post = allPosts[i];
        const seePost = document.importNode(template.content, true);
        
        seePost.getElementById('postTitle').textContent = post.title;
        seePost.getElementById('postContent').textContent = (post.content.length > 120 ? post.content.slice(0, 120) + '...' : post.content);
        seePost.getElementById('postLink').href = `post.html?id=${post.id}`;
        
        /*const archiveButton = seePost.getElementById('archiveButton');
        if (archiveButton) {
            archiveButton.addEventListener('click', () => archivePost(post.id));
        }*/

        postsContainer.appendChild(seePost);
    }
}

/*function archivePost(postId) {
    console.log(`Post avec l'ID ${postId} archivé.`);
}*/
