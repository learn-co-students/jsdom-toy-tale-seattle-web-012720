const toysURL = "http://localhost:3000/toys";
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");

  fetch(toysURL).then(function(response) {
    return response.json()
  })
    .then(function(data) {
      showToys(data)
    });
    addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
});
function showToys(toys) {
  toys.forEach(function(toy) {
    writeToy(toy);
  })
}
function writeToy(toy) {
  //make a div
  //save a constant
  const toyList = document.getElementById("toy-collection");
  const div = makeToyCard(toy);
  toyList.appendChild(div);
  // div.appendChild(div);
}
function makeToyCard(toy) {

  const div = document.createElement("div");
  div.className = "card";

  const h2 = document.createElement("h2");
  h2.innerText = `${toy.name}`

  const img = document.createElement("img");
  img.src = toy.image;
  img.className = "toy-avatar";

  const p = document.createElement("p");
  p.innerText = `${toy.likes} Likes`;

  const button = document.createElement("button");
  button.className = "like-btn"
  button.innerText = "Like!!!!"

  button.addEventListener("click", function() {
    const newToy = clickLike(toy, div)
  })

  div.appendChild(h2);
  div.appendChild(img);
  div.appendChild(p);
  div.appendChild(button);
  
  return div;
}

function clickLike(toy, card) {
  fetch( `${toysURL}/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": toy.likes + 1
    })
  })
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    const newCard = makeToyCard(data);
    const oldCard = document.getElementById("toy-collection");
    oldCard.replaceChild(newCard, card);
  })

};