// REST routes
const TOYS_URL = "http://localhost:3000/toys";

//Hiding form on load.
let addToy = false;

function makeCard(toy) {
  const toyList = document.getElementById("toy-collection");
  const card = document.createElement("div");
  card.className = "card";

  const name = document.createElement("h2");
  name.innerText = toy.name;
  card.appendChild(name);

  const image = document.createElement("img");
  image.src = toy.image;
  card.appendChild(image);

  const likes = document.createElement("p");
  likes.innerText = toy.likes;
  card.appendChild(likes)

  const button = document.createElement("button");
  button.class = "like-btn";
  button.innerText = "Like <3"
  button.addEventListener("click", function() {
    //figure out the event later
  });
  card.appendChild(button);
  toyList.appendChild(card)
};

function showToys(toyArray) {
  
  for(let toy of toyArray) {
    let card = makeCard(toy)
    
  }
};

function postToy(toy) {
  fetch(TOYS_URL, {
    method: "POST",
    headers: {
      "Content-Type": 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toy)
  })
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    if (data.id) {
      makeCard(toy)
    } else {
      alert("!!!")
    }
  })
};

document.addEventListener("DOMContentLoaded", () => {

  //fetch toys
  const getToys = fetch(TOYS_URL)
  .then(function(response) { return response.json() })
  .then(function(data) { showToys(data) });

  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  toyForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const image = event.target.image.value;
    const likes = 0;
    const toy = {
      name, 
      image,
      likes
    };
    postToy(toy)
  });
});