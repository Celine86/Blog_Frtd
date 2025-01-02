function showElement(elementId) {
    const allBackofficeContainers = document.querySelectorAll(".backofficeComponent");
    const defaultBackofficeContainer = document.querySelector(".backofficeDefault");

    allBackofficeContainers.forEach(container => {
        container.style.display = "none";
    });
    defaultBackofficeContainer.style.display = "none";

    const selectedElement = document.getElementById(elementId);
    selectedElement.style.display = "block";
}

function addClickListener(buttonId, elementId) {
    document.getElementById(buttonId).addEventListener("click", function(event) {
        event.preventDefault();
        showElement(elementId);
    });
}

addClickListener("loadSeePosts", "seePosts");
addClickListener("loadCreatePost", "createPost");
addClickListener("loadImages", "images");


