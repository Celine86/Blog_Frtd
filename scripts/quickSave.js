document.addEventListener('DOMContentLoaded', () => {
    const includeElements = document.querySelectorAll('[data-include]');
    includeElements.forEach((el) => {
      const url = el.getAttribute('data-include');
      if (url) {
        fetch(url)
            .then((response) => response.text())
            .then((html) => {
                el.innerHTML = html;
                if (el.id === 'createPost') {
                initializeCreatePostForm(el);
                }
            })
            .catch((error) => console.error('Error loading component:', error));
      }
    });
});
  
function initializeCreatePostForm() {

    const titleForm = document.getElementById('title');
    const contentForm = document.getElementById('content');
    const form = document.getElementById('sendPost');
  
    const savedTitle = localStorage.getItem('title');
    const savedContent = localStorage.getItem('content');
    if (savedTitle) title.innerHTML = savedTitle;
    if (savedContent) content.innerHTML = savedContent;
  
    form.addEventListener('submit', async function sendPostInfos(e) {
        
        e.preventDefault(); 

        let title = titleForm.innerHTML;
        let content = contentForm.innerHTML;

        if(!title || !content) {
            alert ("merci de renseigner le titre et le contenu de l'article");
        }
        else {
            try {
                let response = await fetch(`${urlApi}/posts/create`, {
                        method: 'POST',
                        body: JSON.stringify({
                            title,
                            content
                        }),
                        headers: { 
                            'Content-Type': 'application/json',
                            Authorization: "Bearer " + sessionStorage.getItem("token")
                        }
                }) 
                if(response.status === 200) { 
                    await response.json();
                    const event = new Event('click'); 
                    const urlTemplate = `components/postAdded.html`;
                    openPopup(event, urlTemplate);
                    //document.location.reload();
                } else { 
                    alert ("L'article n'a pas pu être posté");
                    //console.log(response)
                }
            } catch (error) {
                console.log(error)
            }
        }
    });
}

function save() {
    const titleSave = document.getElementById('title').innerHTML;
    const contentSave = document.getElementById('content').innerHTML;
    localStorage.setItem('title', titleSave);
    localStorage.setItem('content', contentSave);
    alert('Draft saved successfully!');
}

function deleteDraft() {
    localStorage.removeItem('title');
    localStorage.removeItem('content');
    const titleDraft = document.getElementById('title');
    const contentDraft = document.getElementById('content');
    titleDraft.innerHTML = '';
    contentDraft.innerHTML = '';
    alert('Draft deleted successfully!');
}
