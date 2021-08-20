import { handleDrop } from "./handleDrop.js";
import { backButton } from "./backBtn.js";
    
const idChara = sessionStorage.getItem("idChara")
const nameChara =sessionStorage.getItem("nameChara")
const descriptionChara = sessionStorage.getItem("descriptionChara")
const shortDesChara = sessionStorage.getItem("shortDesChara")
const imgChara = sessionStorage.getItem("imgChara")

  document.getElementById("name").innerHTML = nameChara;
  document.getElementById("shortDescription").innerHTML = shortDesChara;
  document.getElementById("editor").innerHTML = descriptionChara;
    


const // where files are dropped + file selector is opened
	dropRegion = document.getElementById("drop-region"),
	// where images are previewed
	imagePreviewRegion = document.getElementById("image-preview");


// open file selector when clicked on the drop region
const fakeInput = document.createElement("input");
fakeInput.type = "file";
fakeInput.accept = "image/*";
fakeInput.multiple = true;
dropRegion.addEventListener('click', () => {
	fakeInput.click();
});


fakeInput.addEventListener("change", () => {
	var files = fakeInput.files;
	handleFiles(files);
});


function preventDefault(e) {
	e.preventDefault();
  e.stopPropagation();
}

dropRegion.addEventListener('dragenter', preventDefault, false)
dropRegion.addEventListener('dragleave', preventDefault, false)
dropRegion.addEventListener('dragover', preventDefault, false)
dropRegion.addEventListener('drop', preventDefault, false)


dropRegion.addEventListener('drop', handleDrop, false);



function handleFiles(files) {
	for (let i = 0, len = files.length; i < len; i++) {
		if (validateImage(files[i]))
			previewImage(files[i]);
	}
}

function validateImage(image) {
	// checking the type
	const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
	if (validTypes.indexOf( image.type ) === -1) {
		alert("Invalid File Type");
		return false;
	}

	// checking the size
  let maxSizeInBytes = 10e6; // 10MB
	if (image.size > maxSizeInBytes) {
		alert("File too large");
		return false;
	}

	return true;

}

// container
const imgView = document.createElement("div");
imgView.className = "image-view";
imagePreviewRegion.appendChild(imgView);

// previewing image
const img = document.createElement("img");
img.setAttribute("id","prevmage");
img.className="rounded";
imgView.appendChild(img);
img.src = imgChara;

function previewImage(image) {
	// read the image...
	const reader = new FileReader();
	reader.onload = function(e) {
		img.src = e.target.result;
  };
	reader.readAsDataURL(image);
}


const buttonSolo = document.createElement("div");
buttonSolo.setAttribute("class", "buttonSolo");
cardSolo.appendChild(buttonSolo);

const updateButton = document.createElement("input");
updateButton.setAttribute("id", "updateButton");
updateButton.setAttribute("type", "submit");
updateButton.setAttribute("value", "Save New Character");;
buttonSolo.appendChild(updateButton);
updateButton.addEventListener("click",async() =>{
    const prevMage = document.getElementById("prevmage");
    let text = Array.from(document.querySelectorAll("textarea"));
    let values = text.map(({value})=>{
        return value.trim();
    });
    if (values.some((value) => value === "")) {
        alert("Please fill in all fields");
        return;
      }
  
      let [name, shortDescription] = values;
      let image = prevMage.src;
      image = image.substr(22);
      let id = idChara;
      let description = document.getElementById("editor").innerHTML;
 
  
      const postData = await fetch("https://character-database.becode.xyz/characters/"+id, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, shortDescription, description, image }),
      });

      window.location.href="index.html"
    });


const deleteButton = document.createElement("button");
deleteButton.setAttribute("id", "deleteButton");
deleteButton.innerText = "Delete character";
buttonSolo.appendChild(deleteButton);
deleteButton.addEventListener("click", () => {
 back();
});


backButton.addEventListener("click", () => {
 back();
            })
cardSolo.appendChild(backButton);          


document
  .querySelectorAll('[data-tiny-editor]')
  .forEach(editor =>
    editor.addEventListener('input', e => console.log(e.target.innerHTML)
  )
);

async function back() {
    window.location.href="index.html"
  } 