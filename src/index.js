// no longer working on load for some reason

const TOYS_URL = "http://localhost:3000/toys";
let addToy = false;
let editedCard = null;


//turns "database" objects to DIV's for page.
function makeCard(toy) {
  const toyList = document.getElementById("toy-collection");
  const card = document.createElement("div");
  card.className = "card";
  card.id = `${toy.name}-card`;

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
  button.innerText = "Like <3";
  button.addEventListener("click", function() {
    editCard(toy);
  });
  card.appendChild(button);
  toyList.appendChild(card);
};

function showToys(toyArray) {
  for(let toy of toyArray) {
    makeCard(toy);
  }
};

function editCard(toy) {
  const toyList = document.getElementById("toy-collection")
  editedCard = document.getElementById(`${toy.name}-card`)
  const newCard = addLike(toy);
  console.log(newCard);
  toyList.replaceChild(newCard, editedCard);
}

//call to post Toy to a page.
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
    makeCard(toy);
  })
};


//making a validator for toys.
function required(toy) {
const emptyName = toy.name;
const emptyImage = toy.image;
if (emptyName === "" || emptyImage === "") {
  alert("These values are required.")
} else {
  postToy(toy);
};
}

//add like feature
function addLike(toy) {
  let newNumber = parseInt(toy.likes);
  newNumber++;
  fetch(`${TOYS_URL}/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: newNumber
    })
  }).then(function(response) {
    return response.json()
  }).then(function(data){
    const newCard = makeCard(data);
    return newCard;
  })
}

document.addEventListener("DOMContentLoaded", () => {

  //fetch toys
  let getToys = fetch(TOYS_URL)
  .then(function(response) { return response.json() })
  .then(function(data) { showToys(data) })

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
    required(toy)
  });
});