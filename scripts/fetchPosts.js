async function showPosts() {
    try {
        const response  = await fetch(`${urlApi}/posts/all`, {
            method: 'GET',
        })
        if(response.status === 200) { 
            const data = await response.json();
            const allPosts = data.allPosts;
            console.log(data)
            for (let post in allPosts){
                post = allPosts[post]
                const templatePosts = document.getElementById('templatePosts')
                const seePost = document.importNode(templatePosts.content, true)
                seePost.getElementById('postTitle').textContent = post.title
                seePost.getElementById('postContent').textContent = (post.content.length > 120 ? post.content.slice(0, 120) + '...' : post.content)
                seePost.getElementById('postLink').href = `post.html?id=${post.id}`
                document.getElementById('allPosts').appendChild(seePost)  
            }
        } else {
            console.log(response)
        }
    } catch (error) {
        console.log(error)
    }
}
showPosts();