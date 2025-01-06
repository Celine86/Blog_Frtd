async function fetchLastPost() {
    try {
        const response = await fetch(`${urlApi}/posts/all`, {
            method: 'GET',
        });

        if (response.status === 200) {
            const data = await response.json();
            console.log(data)

            if (!data.allPosts || !Array.isArray(data.allPosts)) {
                throw new Error('La réponse de l\'API ne contient pas un tableau sous la clé "posts".');
            }
            const posts = data.allPosts;

            const lastPostId = posts.reduce((latest, post) => 
                new Date(post.createdAt) > new Date(latest.createdAt) ? post : latest
            ).id;
            console.log(lastPostId)

            const postResponse = await fetch(`${urlApi}/posts/${lastPostId}`, {
                method: 'GET',
            });

            if (postResponse.status === 200) {
                const lastPostData = await postResponse.json();
                const templateMyPost = document.getElementById('templateThisPost');
                const seePost = document.importNode(templateMyPost.content, true);
                seePost.getElementById('thisPostTitle').innerHTML = lastPostData.title;
                seePost.getElementById('thisPostContent').innerHTML = lastPostData.content;
                document.getElementById('thisPost').appendChild(seePost);
            } else {
                console.log('Erreur avec le statut (détails):', postResponse.status, postResponse.statusText);
            }
        } else {
            console.log('Erreur avec le statut (liste):', response.status, response.statusText);
        }
    } catch (error) {
        console.log('Erreur lors de la récupération du dernier post:', error);
    }
}

fetchLastPost();
