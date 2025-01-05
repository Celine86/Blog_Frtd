myImgUrl =  localStorage.getItem("myImgUrl");

function commande(name, arg) {
    if (typeof arg === 'undefined') {
      arg = '';
    }
    switch (name) {
      case "insertImage":
        if(!myImgUrl){
          localStorage.setItem('title', title.innerHTML);
          localStorage.setItem('content', content.innerHTML);
          showComponent("loadImages", "images", "./fetchImages.js");
          //showComponent('images');
          //window.location = 'images.html';
        } else {
          let imgUrl =  localStorage.getItem("myImgUrl")
          console.log(imgUrl)
          arg = imgUrl;
          localStorage.removeItem("myImgUrl");
          break
        }
    }
    document.execCommand(name, false, arg);
}
