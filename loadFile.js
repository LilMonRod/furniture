/////// Cargar el Background ////////

/*
var loadFile = function (event) {
let urlImg = URL.createObjectURL(event.target.files[0]);

let container = document.getElementById("main");
container.style.backgroundImage = "url('" + urlImg + "')";
container.style.backgroundRepeat = "no-repeat";
container.style.backgroundPositionX = "0px";
container.style.backgroundPositionY = "0px";

const mainImage = document.querySelector(".main__img");
mainImage.src = urlImg;
mainImage.draggable = false;

let tag = document.getElementById("fileTag");
tag.innerText = "Cambiar imagen";
};
*/

const image_input = document.getElementById("image-input");

image_input.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    document.querySelector("#display-image").src = `${uploaded_image}`;
  });
  reader.readAsDataURL(this.files[0]);
});
