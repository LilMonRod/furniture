myDataBase = {
    image1: {
        cantidad: 21,
        ext: "jpg",
        categoria: "Sofa",
        imagenes: [],
        index: 0
    },
    image2: {
        cantidad: 3,
        ext: "jpg",
        categoria: "Sofa",
        imagenes: [],
        index: 0
    },
    image3: {
        cantidad: 12,
        ext: "jpg",
        categoria: "Sofa",
        imagenes: [],
        index: 0
    },
	image4: {
        cantidad: 12,
        ext: "png",
        categoria: "Sofa",
        imagenes: [],
        index: 0
    }
}

// Cargar imagenes cuando el window cargue
window.addEventListener('load', (event) => {
    const furniturePicker = document.querySelector('.furniture-picker__list');

    let index = 1
    for (const [imagen, value] of Object.entries(myDataBase)) {        
        for (let i = 1; i < value.cantidad; i++) {
          const newSRC = `img${index}/Mariano-${i}.${value.ext}`;
          value.imagenes.push(newSRC);
        }
        index++;
		let newLi = document.createElement("li");
		newLi.classList.add("furniture-picker__list-item");

		let newImg = document.createElement("img");
		newImg.src = value.imagenes[value.index];
		newImg.classList.add("furniture-picker__img");

		newLi.appendChild(newImg);
		furniturePicker.appendChild(newLi);
    }
    sessionStorage.setItem('imageDB', JSON.stringify(myDataBase))
});


/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// cargar el array del local storage
const displacements = JSON.parse(
    sessionStorage.getItem('displacements') || '[]' // sessionStorage por ahora por motivos de debugging
  )
let imageDB = JSON.parse(
sessionStorage.getItem('imageDB') || myDataBase // sessionStorage por ahora por motivos de debugging
)
console.log(imageDB)
  const mainRoom = document.querySelector('.main__room')
  
  displacements.forEach(({x, y, src, id}) => {
    const furniture = document.createElement('img')
  
    furniture.style.position = 'absolute'
    furniture.style.top = y
    furniture.style.left = x
    furniture.src = src
    furniture.draggable = false
    furniture.classList.add('furniture-picker__img')
    furniture.id = `_${id}`
  
    mainRoom.appendChild(furniture)
  })
  
  // Copy del elemento
  const mainImage = document.querySelector('.main__img')
  const mouse = {x: null, y: null}
  let clone = null
  
  function getCloneDisplacement() {
    return {
      x: `${(mouse?.x + window.scrollX) / mainImage.clientWidth * 100}%`,
      y: `${(mouse?.y + window.scrollY) / mainImage.clientHeight * 100}%`,
    }
  }
  
  // reposition los colocados
  let isNew = null
  window.addEventListener('mousedown', ({target, clientX, clientY}) => {
    mouse.x = clientX
    mouse.y = clientY
    if (target.parentElement?.classList.contains('furniture-picker__list-item')) {
      isNew = true
      clone = target.cloneNode()
      
      clone.style.left = getCloneDisplacement().x
      clone.style.top = getCloneDisplacement().y
      clone.style.position = 'absolute'
  
      mainRoom.appendChild(clone)
    }
  
    if (target.parentElement?.classList.contains('main__room')) {
      isNew = false
      clone = target
      
      clone.style.left = getCloneDisplacement().x
      clone.style.top = getCloneDisplacement().y
      clone.style.position = 'absolute'
  
      mainRoom.appendChild(clone)
    }
  })
  
  // drag del copy
  // position del drag
  window.addEventListener('mousemove', ({target, clientX, clientY}) => {
    if (clone) {
      mouse.x = clientX
      mouse.y = clientY
      clone.style.left = getCloneDisplacement().x
      clone.style.top = getCloneDisplacement().y
    }
  })
  
  // guardar posicionados en array
  // guardar array en local storage
  // eliminar los colocados en el basurero
  // update array en local storage
  const trashcan = document.querySelector('.furniture-picker__trashcan')
  
  window.addEventListener('mouseup', ({target, clientX, clientY}) => {
    if (clone && isNew) {
      displacements.push({
        src: clone.src,
        id: displacements.length,
        ...getCloneDisplacement()
      })
    } else if (clone && !isNew) {
      const displacement = displacements.find(displacement => (
        displacement.id === Number(clone.id.replace('_', ''))
      ))
  
      if (displacement) {
        displacement.x = getCloneDisplacement().x
        displacement.y = getCloneDisplacement().y  
      }
    }
    
    if (clone) {
      const {
        x, y, right, bottom
      } = trashcan.getBoundingClientRect()
      const isInTrashcan = (
        clientX >= x && clientX <= right &&
        clientY >= y && clientY <= bottom
      )
      if (isInTrashcan) {
        const displacementIndex = displacements.findIndex(displacement => (
          displacement.id === Number(clone.id.replace('_', ''))
        ))
        displacements.splice(displacementIndex, 1)
        clone.remove()
      }
    }
    sessionStorage.setItem('displacements', JSON.stringify(displacements))
    mouse.x = null
    mouse.y = null
    clone = null 
  })


  /////// Cargar el Background /////////
  var loadFile = function(event) {
    let urlImg =  URL.createObjectURL(event.target.files[0]);

    let container = document.getElementById('main');
    container.style.backgroundImage = "url('" + urlImg + "')";
    container.style.backgroundRepeat = "no-repeat";
    container.style.backgroundPositionX = "0px";
    container.style.backgroundPositionY = "0px";

    const mainImage = document.querySelector('.main__img');
    mainImage.src = urlImg;
    
    let tag = document.getElementById('fileTag');
    tag.innerText = "Cambiar imagen";
};


//////////////////////////////////////////////////////////////////////
/////////////////////////// Toggle menu //////////////////////////////
const menu = document.querySelector(".furniture-picker__container");
const furniturePicker = document.querySelector(".furniture-picker");
const hamburger= document.querySelector(".furniture-picker__menu");
const closeIcon= document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    furniturePicker.classList.remove("furniture-picker--open");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    furniturePicker.classList.add("furniture-picker--open");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}

hamburger.addEventListener("click", toggleMenu);


let newLi = document.createElement("li");
newLi.classList.add("furniture-picker__list-item");

let newImg = document.createElement("img");
newImg.src = value.imagenes[value.index];
newImg.classList.add("furniture-picker__img");
newImg.classList.add(value.categoria);

