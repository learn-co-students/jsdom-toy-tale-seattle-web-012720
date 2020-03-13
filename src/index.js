let addToy = false;
const TOYS_URL = "http://localhost:3000/toys"
let edittedToy = null 


function fetchToys(url) {
  fetch(TOYS_URL)
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    makeCard(data)
  })
};

function createToy(toy) {
  const toyList = document.getElementById("toy-collection")
  const div = document.createElement("div")
  div.classname = "card"
  const h2 = document.createElement("h2")
  h2.textContent = toy.name
  const image = document.createElement("img")
  image.src = toy.image
  const p = document.createElement("p")
  p.textContent = toy.likes
  p.id = `${toy.name}-likes`
  const button = document.createElement("button")
  button.class = "like-btn"
  button.textContent = "Like"
  button.addEventListener("click", function(){
    updateToy(toy)
  })
  div.appendChild(h2);
  div.appendChild(image);
  div.appendChild(p);
  div.appendChild(button);
  toyList.appendChild(div);
};


function makeCard(array) {
  array.forEach(function(toy){
    createToy(toy)
  })
}; 

function postToy(toy) {
  fetch(TOYS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json" 
    },
    body: JSON.stringify(toy)
  })
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      if (data.id) {
        createToy(toy);
      } else {
        alert("YOU WRONG")
      }
    })
}

function updateToy(toy) {
  const likes = (toy.likes + 1)
  fetch(`${TOYS_URL}/${toy.id}`, {
    method: "PATCH",
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": `${likes}`
    })
  })
    .then(function(res) {
      return res.json()
    })
    .then(function(data) {
      //document.location.reload()
      let thingy = document.getElementById(`${data.name}-likes`)
      thingy.likes = data.likes
      console.log(thingy)
    })
}


// PATCH http://localhost:3000/toys/:id
// headers: 
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }
// body: JSON.stringify({
//   "likes": <new number>
// })

// }).then(function(res) {
//   return res.json()
// }).then(function(data) {
//   const newCard = makeBookCard(data);
//   document.getElementById("book-list").replaceChild(newCard, editedCard)
// })


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", (event) => {
    // hide & seek with the form

    toyForm.addEventListener("submit", function(event) {
      event.preventDefault()
      const name = event.target.name.value
      const image = event.target.image.value
      const likes = 0
      const newToy = {
        name,
        image,
        likes
      }
      postToy(newToy)
    })

    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
  fetchToys(TOYS_URL)
});
