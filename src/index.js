let addToy = false;
let toyURL = 'http://localhost:3000/toys';

document.addEventListener("DOMContentLoaded", () => {
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
});

document.addEventListener("DOMContentLoaded", () => {
fetch('http://localhost:3000/toys')
.then(resp => resp.json() )
.then( toys => {
    const toyCollection = document.getElementById('toy-collection');
    for (const toy of toys) {
      createCard(toy, toyCollection);
    }
  })
})

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("form.add-toy-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const name = event.target.name.value;
  const image = event.target.image.value;
  const likes = 0;
  const newToy = {
    name,
    image,
    likes
  }
  createNewToy(newToy)
  });
});

function createNewToy(toy) {
  fetch(toyURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    
    body: JSON.stringify(toy)
  })
  .then(res => res.json())
  .then(function(data) {
    if (data.id) {
      createCard(toy, document.getElementById('toy-collection'))
    } else {
      console.log('unable to create toy')
    }
  })
}

function createCard(toy, parent) {
  const card = document.createElement('div');
  parent.appendChild(card);
  createToy(toy, card);
}

function createToy(toy, parent) {
  const header = document.createElement('h2');
  header.innerText = toy.name;
  parent.appendChild(header);

  const image = document.createElement('img');
  image.src = toy.image;
  image.className = "toy-avatar";
  parent.appendChild(image);

  const numberOfLikes = document.createElement('p');
  numberOfLikes.innerText = toy.likes;
  parent.appendChild(numberOfLikes);

  const button = document.createElement('button');
  button.className = "like-btn";
  button.innerText = "like";
  button.addEventListener('click', function() {
    addLike(toy, numberOfLikes)})
  parent.appendChild(button); 

}

function addLike(toy, numberOfLikes) {
  toy.likes++;
  fetch(`${toyURL}/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    
    body: JSON.stringify(toy)
  })
  .then(res => res.json())
  .then(function(toy) {
    if (toy.id) {
      numberOfLikes.innerText = toy.likes
    } else {
      console.log('unable to like toy')
    }
  })
}