const searchbox = document.getElementById("search");

const container = document.getElementById("container");

const newButton = document.getElementById("newButton");
newButton.addEventListener("click", () =>{
  newChara();
});

const request = new XMLHttpRequest();
request.open("GET", "https://character-database.becode.xyz/characters", true);
request.onload = function () {
  // Begin accessing JSON data here
  const data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach((character) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");
      card.setAttribute("id", "card");
      container.appendChild(card);

      const image = document.createElement("img");
      image.setAttribute("class", "rounded");
      image.src = `data:image/png;base64,${character.image}`;
      card.appendChild(image);

      const h1 = document.createElement("h2");
      h1.setAttribute("class", "cardtitre");
      h1.textContent = character.name;
      card.appendChild(h1);

      const p = document.createElement("p");
      p.textContent = `${character.shortDescription.substring(0, 150)}...`;
      card.appendChild(p);


      searchbox.addEventListener("keyup", () => {
        searchBar();
      });
      

      const charaButton = document.createElement("button");
      charaButton.setAttribute("id", "charaButton");
      charaButton.innerText = "See character";
      card.appendChild(charaButton);
      charaButton.addEventListener("click", function () {
        let idChara = character.id;
        let nameChara = character.name;
        let descriptionChara = character.description;
        let shortDesChara = character.shortDescription;
        let imgChara = `data:image/png;base64,${character.image}`;
      
        sessionStorage.setItem("idChara", idChara);
        sessionStorage.setItem("nameChara", nameChara);
        sessionStorage.setItem("descriptionChara", descriptionChara);
        sessionStorage.setItem("shortDesChara", shortDesChara);
        sessionStorage.setItem("imgChara", imgChara);
         
        window.location.href = "chara.html";
      });
    });
  } else {
    const errorMessage = document.createElement("marquee");
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();


function searchBar() {
  let input, filter, cards, cardContainer, title, i;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  cardContainer = document.getElementById("container");
  cards = cardContainer.getElementsByClassName("card");

  for (i = 0; i < cards.length; i++) {
    title = cards[i].querySelector(".cardtitre");
    if (title.innerText.toUpperCase().indexOf(filter) > -1) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
}


function newChara() {
  window.location.href = "newchara.html";
}