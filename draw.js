import myDataBase from "./database.js";
// Cargar images cuando el window cargue

function getFurniture(value) {
  const auxiliaryParent = document.createElement("div");
  auxiliaryParent.innerHTML = `
    <li 
      class="furniture-picker__list-item"
      draggable="false">
      <div
          data-index="0"
          data-id="${value.id}"
          data-max="${value.amount}"
          draggable="false"
          class="furniture-picker__list-container">
          <img
            draggable="false"
            src="${value.images[value.index]}"
            data-size="${value.size}"
            class="furniture-picker__img ${value.category}"/>
      </div>
      <div
          draggable="false"
          style="pointer-events: none;"
          class="furniture-picker__dimensions">
          <strong draggable="false">Dimensions:</strong>
          <br>
          <strong draggable="false">Height:</strong> ${value.dimensions.height}
          <br>
          <strong draggable="false">Width:</strong> ${value.dimensions.width}
      </div>
    </li>
    `;

  return auxiliaryParent.children[0];
}

function loadImages() {
  const furniturePicker = document.querySelector(".furniture-picker__list");

  for (const value of myDataBase) {
    for (let i = 1; i <= value.amount; i++) {
      const newSRC = `Assets/img${value.id}/Mariano-${i}.png`;
      value.images.push(newSRC);
    }

    let select = document.getElementById("selection");
    if (select?.value == value.category) {
      console.log(getFurniture(value));
      furniturePicker.appendChild(getFurniture(value));
    }
  }
}

// // // /////////////////////////////////////////////////////////
// // // // cargar el array del local storage
// // // /*const displacements = JSON.parse(
// // // 	sessionStorage.getItem('displacements') || '[]' // sessionStorage por ahora por motivos de debugging
// // // )*/
const displacements = [];
// // // let myDBText = JSON.stringify(myDataBase);
// // // let imageDB = JSON.parse(
// // //   sessionStorage.getItem("imageDB") || myDBText // sessionStorage por ahora por motivos de debugging
// // // );
const mainRoom = document.querySelector(".main__room");

displacements.forEach(({ x, y, src, id }) => {
  const container = document.createElement("div");
  container.classList.add("furniture-picker__list-container");
  const furniture = document.createElement("img");

  container.style.position = "absolute";
  container.style.top = y;
  container.style.left = x;
  container.id = `_${id}`;

  furniture.src = src;
  furniture.draggable = false;
  furniture.classList.add("furniture-picker__img");
  furniture.style.pointerEvents = false;
  console.log(furniture);

  container.appendChild(furniture);
  mainRoom.appendChild(container);
});

// Copy del elemento
const mainImage = document.querySelector(".main__img");
const touch = { x: null, y: null };
const slope = { x: null, y: null };
let clone = null;
let ChildSrc = null;

function getCloneDisplacement() {
  return {
    x: `${
      ((touch?.x + window.scrollX - slope?.x) / mainImage.clientWidth) * 100
    }%`,
    y: `${
      ((touch?.y + window.scrollY - slope?.y) / mainImage.clientHeight) * 100
    }%`,
  };
}

// reposition los colocados
let isNew = null;
window.addEventListener("mousedown", setDown);
window.addEventListener("touchdown", setDown);

function setDown({ target, clientX, clientY }) {
  touch.x = clientX;
  touch.y = clientY;

  slope.x = clientX - target.getBoundingClientRect().x;
  slope.y = clientY - target.getBoundingClientRect().y;

  if (target.classList.contains("furniture-picker__rotate-img")) {
    let number = Number(target.parentElement.dataset["index"]);

    for (const value of myDataBase) {
      if (value.id == target.parentElement.dataset["id"]) {
        // change src image
        target.parentElement.children[0].setAttribute(
          "src",
          value.images[
            (++number % Number(target.parentElement.dataset["max"]))
          ]
        );
        target.parentElement.dataset["index"] = number;
      }
    }
  } else if (
    target.classList.contains("furniture-picker__list-item") ||
    (target.parentElement.parentElement?.classList.contains(
      "furniture-picker__list-item"
    ) &&
      target.classList.contains("furniture-picker__img"))
  ) {
    isNew = true;

    clone = target.classList.contains("furniture-picker__list-item")
      ? target.children[0].cloneNode(true)
      : target.parentElement.cloneNode(true);

    let rotateImg = document.createElement("img");
    rotateImg.src = "Assets/rotate.png";
    rotateImg.draggable = false;
    rotateImg.classList.add("furniture-picker__rotate-img");

    if (ChildSrc == null) {
      ChildSrc = target.src;
    }

    clone.style.left = getCloneDisplacement().x;
    clone.style.top = getCloneDisplacement().y;
    clone.style.position = "absolute";
    clone.draggable = false;
    clone.children[0].draggable = false;
    clone.style.zIndex = "1";

    mainRoom.appendChild(clone);
    clone.appendChild(rotateImg);
  } else if (
    target.parentElement.parentElement?.classList.contains("main__room")
  ) {
    isNew = false;
    clone = target.parentElement;
  }
}

function move({ clientX, clientY }) {
  if (clone) {
    touch.x = clientX;
    touch.y = clientY;
    clone.style.left = getCloneDisplacement().x;
    clone.style.top = getCloneDisplacement().y;
  }
}
// guardar posicionados en array
// guardar array en local storage
// eliminar los colocados en el basurero
// update array en local storage
const trashcan = document.querySelector(".furniture-picker__trashcan");

// load images;
window.addEventListener("load", () => {
  loadImages();
  sessionStorage.setItem("imageDB", JSON.stringify(myDataBase));
});

// drag del copy
// position del drag
window.addEventListener("touchstart", move);
window.addEventListener("mousemove", move);
window.addEventListener(
  "mouseup",
  ({ target, clientX, clientY, preventDefault }) => {
    if (clone && isNew) {
      displacements.push({
        src: ChildSrc,
        id: displacements.length,
        ...getCloneDisplacement(),
      });
    } else if (clone && !isNew) {
      const displacement = displacements.find(
        (displacement) => displacement.id === Number(clone.id.replace("_", ""))
      );

      if (displacement) {
        displacement.x = getCloneDisplacement().x;
        displacement.y = getCloneDisplacement().y;
      }
    }

    if (clone) {
      const { x, y, right, bottom } = trashcan.getBoundingClientRect();
      const isInTrashcan =
        clientX >= x && clientX <= right && clientY >= y && clientY <= bottom;
      if (isInTrashcan) {
        const displacementIndex = displacements.findIndex(
          (displacement) =>
            displacement.id === Number(clone.id.replace("_", ""))
        );
        displacements.splice(displacementIndex, 1);
        clone.remove();
      }
    }
    sessionStorage.setItem("displacements", JSON.stringify(displacements));
    touch.x = null;
    touch.y = null;

    slope.x = null;
    slope.y = null;

    clone = null;
    ChildSrc = null;
  }
);


//////////////////////////////////////////////////////////////////////
/////////////////////////// Toggle menu //////////////////////////////
const menu = document.querySelector(".furniture-picker__container");
const furniturePicker = document.querySelector(".furniture-picker");
const hamburger = document.querySelector(".furniture-picker__menu");
const closeIcon = document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");
const closeButton = document.querySelector(".closeButton");
const menuButton = document.querySelector(".menuButton");
const asideCont = document.querySelector(".furniture-picker");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    furniturePicker.classList.remove("furniture-picker--open");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
    closeButton.style.display = "none";
    menuButton.style.display = "block";
    asideCont.style.backgroundColor = "transparent";
  } else {
    menu.classList.add("showMenu");
    furniturePicker.classList.add("furniture-picker--open");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
    closeButton.style.display = "block";
    menuButton.style.display = "none";
    asideCont.style.backgroundColor = "rgba(255, 255, 255, 0.664)";
  }
}

hamburger.addEventListener("click", toggleMenu);

// ///////////////////////////////////////////////////////////////////
// ///////////////////////////// Select /////////////////////////////
const select = document.getElementById("selection");
select.addEventListener("change", Sort);

function Sort(e) {
  const furniturePicker = document.querySelector(".furniture-picker__list");
  furniturePicker.innerHTML = "";

  for (const value of myDataBase) {
    if (e.target.value == value.category) {
      furniturePicker.appendChild(getFurniture(value));
    }
  }
}
