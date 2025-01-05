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

function addClickListener(buttonId, elementId, modulePath) {
    const button = document.getElementById(buttonId);
    const element = document.getElementById(elementId);

    if (!button) {
        console.error(`Le bouton avec l'ID ${buttonId} n'a pas été trouvé.`);
        return;
    }

    if (!element) {
        console.error(`L'élément avec l'ID ${elementId} n'a pas été trouvé.`);
        return;
    }

    button.addEventListener("click", async function (event) {
        event.preventDefault();

        showElement(elementId);

        if (modulePath) {
            import(modulePath)
                .then(module => {
                    if (typeof module.initialize === "function") {
                        module.initialize();
                    }
                })
                .catch(error => {
                    console.error(`Erreur lors du chargement du module ${modulePath} :`, error);
                });
        }
    });
    button.click();
}

addClickListener("loadSeePosts", "seePosts", "./fetchPosts.js");
addClickListener("loadImages", "images", "./fetchImages.js");
addClickListener("loadCreatePost", "createPost");
//addClickListener("loadCreateImage", "createImage", "./createImage.js");