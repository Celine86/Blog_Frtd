const myPostIdEquals = window.location.search;
const myPostIdOnly = new URLSearchParams(myPostIdEquals);
const myPostId = myPostIdOnly.get("id");

async function fetchPost() {
    try {
        const response  = await fetch(`${urlApi}/posts/${myPostId}`, {
            method: 'GET',
        })
        if(response.status === 200) { 
            const data = await response.json();
            const templateMyPost = document.getElementById('templateThisPost')
            const seePost = document.importNode(templateMyPost.content, true)
            seePost.getElementById('thisPostTitle').innerHTML = data.title
            seePost.getElementById('thisPostContent').innerHTML = data.content
            document.getElementById('thisPost').appendChild(seePost)  
        } else {
            console.log(response)
            //throw new Error(response.status)
        }
    }catch(error) {
        console.log(error)
    }
}
fetchPost();
