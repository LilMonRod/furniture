myDataBase = {
    image1: {
        cantidad: 2,
        foldername: "img1",
        ext: "png",
		dimensiones: {
			altura: "80cm",
			ancho: "40cm"
		},
        categoria: "SofaCama",
        imagenes: [],
        index: 0
    },
    image2: {
        cantidad: 2,
        foldername: "img2",
        ext: "png",
		dimensiones: {
			altura: "80cm",
			ancho: "40cm"
		},
        categoria: "Reclinables",
        imagenes: [],
        index: 0
    },
    image3: {
        cantidad: 2,
        foldername: "img3",
        ext: "png",
		dimensiones: {
			altura: "80cm",
			ancho: "40cm"
		},
        categoria: "Cama",
        imagenes: [],
        index: 0
    },
	image4: {
        cantidad: 2,
        foldername: 'img4',
        ext: "png",
		dimensiones: {
			altura: "80cm",
			ancho: "40cm"
		},
        categoria: "MesasAuxiliares",
        imagenes: [],
        index: 0
    },
    image5: {
        cantidad: 2,
		foldername: 'img5',
        ext: "png",
		dimensiones: {
			altura: "80cm",
			ancho: "40cm"
		},
        categoria: "Sofa",
        imagenes: [],
        index: 0
    },
    image6: {
        cantidad: 2,
		foldername: 'img6',
        ext: "png",
		dimensiones: {
			altura: "80cm",
			ancho: "40cm"
		},
        categoria: "MesasDeNoche",
        imagenes: [],
        index: 0
    },
    image7: {
        cantidad: 2,
		foldername: 'img7',
        ext: "png",
		dimensiones: {
			altura: "80cm",
			ancho: "40cm"
		},
        categoria: "Mesas", //////////////////////////////
        imagenes: [],
        index: 0
    },
	image8: {
        cantidad: 2,
		foldername: 'img8',
        ext: "png",
		dimensiones: {
			altura: "80cm",
			ancho: "40cm"
		},
        categoria: "Sillas",
        imagenes: [],
        index: 0
    },
    image9: {
        cantidad: 2,
		foldername: 'img9',
        ext: "png",
		dimensiones: {
			altura: "80cm",
			ancho: "40cm"
		},
        categoria: "Bufeteras",
        imagenes: [],
        index: 0
    },
    image10: {
        cantidad: 2,
		foldername: 'img10',
        ext: "png",
		dimensiones: {
			altura: "80cm",
			ancho: "40cm"
		},
        categoria: "LamparasDeMesa",
        imagenes: [],
        index: 0
    },
    image11: {
        cantidad: 2,
		foldername: 'img11',
        ext: "png",
		dimensiones: {
			altura: "80cm",
			ancho: "40cm"
		},
        categoria: "LamparasDeMesa",
        imagenes: [],
        index: 0
    },
	image12: {
        cantidad: 2,
		foldername: 'img12',
        ext: "png",
		dimensiones: {
			altura: "80cm",
			ancho: "40cm"
		},
        categoria: "LamparasDePie",
        imagenes: [],
        index: 0
    },
    image13: {
        cantidad: 2,
		foldername: 'img13',
        ext: "png",
		dimensiones: {
			altura: "80cm",
			ancho: "40cm"
		},
        categoria: "LaparasColgantes",
        imagenes: [],
        index: 0
    },
    image14: {
        cantidad: 2,
		foldername: 'img14',
        ext: "png",
		dimensiones: {
			altura: "80cm",
			ancho: "40cm"
		},
        categoria: "Escritorios",
        imagenes: [],
        index: 0
    },
    image15: {
        cantidad: 2,
		foldername: 'img15',
        ext: "png",
		dimensiones: {
			altura: "80cm",
			ancho: "40cm"
		},
        categoria: "Alfombras",
        imagenes: [],
        index: 0
    },
	image16: {
        cantidad: 2,
		foldername: 'img16',
        ext: "png",
		dimensiones: {
			altura: "80cm",
			ancho: "40cm"
		},
        categoria: "SillasEjecutivas",
        imagenes: [],
        index: 0
    },
	image17: {
        cantidad: 2,
		foldername: 'img17',
        ext: "png",
		dimensiones: {
			altura: "80cm",
			ancho: "40cm"
		},
        categoria: "Cuadros",
        imagenes: [],
        index: 0
    }
	/*image18: {
        cantidad: 1,
        ext: "png",
        categoria: "BarStool",
        imagenes: [],
        index: 0
    },
	image19: {
        cantidad: 1,
        ext: "png",
        categoria: "Modulos",
        imagenes: [],
        index: 0
    }
	*/
}
// Cargar imagenes cuando el window cargue
window.addEventListener('load', (event) => {
    const furniturePicker = document.querySelector('.furniture-picker__list');

    let index = 1
    for (const [imagen, value] of Object.entries(myDataBase)) {        
        for (let i = 1; i < value.cantidad; i++) {
          const newSRC = `${value.foldername}/Mariano-${i}.${value.ext}`;
          value.imagenes.push(newSRC);
        }
        index++;

		let select = document.getElementById('selection'); 
		if (select.value == value.categoria){
			let newLi = document.createElement("li");
			newLi.classList.add("furniture-picker__list-item");

			let newDiv = document.createElement("div");
			newDiv.classList.add("furniture-picker__list-container");
			let dimDiv = document.createElement("div");
			dimDiv.classList.add("furniture-picker__dimensions");
			dimDiv.innerHTML = `<strong>Dimensiones:</strong> <br>
			<strong>altura:</strong>  ${value.dimensiones.altura}<br>
			<strong>ancho:</strong>  ${value.dimensiones.ancho}`;

			let newImg = document.createElement("img");
			newImg.src = value.imagenes[value.index];
			newImg.classList.add("furniture-picker__img");
			newImg.classList.add(value.categoria);

			newDiv.appendChild(newImg);
			newLi.appendChild(newDiv);
			newLi.appendChild(dimDiv);
			furniturePicker.appendChild(newLi);	
		}
    }
    sessionStorage.setItem('imageDB', JSON.stringify(myDataBase))
});

/////////////////////////////////////////////////////////
// cargar el array del local storage
/*const displacements = JSON.parse(
    sessionStorage.getItem('displacements') || '[]' // sessionStorage por ahora por motivos de debugging
)*/
const displacements = []
console.log(displacements)
let myDBText = JSON.stringify(myDataBase)
let imageDB = JSON.parse(
sessionStorage.getItem('imageDB') || myDBText // sessionStorage por ahora por motivos de debugging
)
  const mainRoom = document.querySelector('.main__room')
  
  displacements.forEach(({x, y, src, id}) => {
	const container = document.createElement('div');
	container.classList.add('furniture-picker__list-container');
    const furniture = document.createElement('img')
  
    container.style.position = 'absolute'
    container.style.top = y
    container.style.left = x
	container.id = `_${id}`


    furniture.src = src
    furniture.draggable = false
    furniture.classList.add('furniture-picker__img')
    
	container.appendChild(furniture);
    mainRoom.appendChild(container);
  })
  
  // Copy del elemento
  const mainImage = document.querySelector('.main__img')
  const mouse = {x: null, y: null}
  let clone = null
  let cloneChild = null;
  let ChildSrc = null;
  
  function getCloneDisplacement() {
    return {
      x: `${(mouse?.x + window.scrollX) / mainImage.clientWidth * 100}%`,
      y: `${(mouse?.y + window.scrollY) / mainImage.clientHeight * 100}%`,
    }
  }
  
  // reposition los colocados
  let isNew = null
  window.addEventListener('mousedown', ({target, clientX, clientY}) => {
	  console.log("mousedown")
    mouse.x = clientX
    mouse.y = clientY
    if (target.parentElement.parentElement?.classList.contains('furniture-picker__list-item')) {
		
      isNew = true
      clone = target.parentElement.cloneNode()
	  cloneChild = target.cloneNode()
	  if (ChildSrc == null) {
	  ChildSrc = target.src
	}
	  clone.appendChild(cloneChild)
      
      clone.style.left = getCloneDisplacement().x
      clone.style.top = getCloneDisplacement().y
      clone.style.position = 'absolute'
	  clone.style.zIndex = '1'
  
      mainRoom.appendChild(clone)
    }
  
    if (target.parentElement.parentElement?.classList.contains('main__room')) {
      isNew = false
      clone = target.parentElement
	  cloneChild = target

	  clone.appendChild(cloneChild)
      
      clone.style.left = getCloneDisplacement().x
      clone.style.top = getCloneDisplacement().y
      clone.style.position = 'absolute'
	  clone.style.zIndex = '1'
  
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
        src: ChildSrc,
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
	cloneChild = null
	ChildSrc = null
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


///////////////////////////////////////////////////////////////////
///////////////////////////// Select /////////////////////////////
const select = document.getElementById('selection');
select.addEventListener('change', Sort);

function Sort(e) {
	const furniturePicker = document.querySelector('.furniture-picker__list');
	furniturePicker.innerHTML = "";
	console.log(e.target.value)

    for (const [imagen, value] of Object.entries(myDataBase)) {        
		if (e.target.value == value.categoria){
			let newLi = document.createElement("li");
			newLi.classList.add("furniture-picker__list-item");

			
			let newDiv = document.createElement("div");
			newDiv.classList.add("furniture-picker__list-container");

			let newImg = document.createElement("img");
			newImg.src = value.imagenes[value.index];
			newImg.classList.add("furniture-picker__img");
			newImg.classList.add(value.categoria);

			newDiv.appendChild(newImg);
			newLi.appendChild(newDiv);
			furniturePicker.appendChild(newLi);
		}
    }
}