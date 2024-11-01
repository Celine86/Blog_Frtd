function showElement(elementId) {
    const allPostContainers = document.querySelectorAll(".backofficeComponent");

    allPostContainers.forEach(container => {
        container.style.display = "none";
    });

    const selectedElement = document.getElementById(elementId);
    selectedElement.style.display = "block";
}

function addClickListener(buttonId, elementId) {
    document.getElementById(buttonId).addEventListener("click", function(event) {
        event.preventDefault();
        showElement(elementId);
    });
}

addClickListener("loadCreatePost", "createPost");
addClickListener("loadSeePosts", "seePosts");
addClickListener("loadImages", "images");
