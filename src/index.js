
document.addEventListener("DOMContentLoaded", () => {
  let addToy = false;
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', function(e) {
        e.preventDefault();
        postToy(e)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetchToys()
});

function fetchToys() {
  fetch(`http://localhost:3000/toys`)
  .then(resp=>resp.json())
  .then(toys=>{
    toys.forEach(toy=>{
      createToyCard(toy)
    })
  })
}

function fetchToy(toy) {
  fetch(`http://localhost:3000/toys/${toy.id}`)
  .then(resp=>resp.json())
  .then(toy=>console.log(toy))
}

function postToy(event) {
  console.log(event.target.image.value)
  toy = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0
  }
  fetch(`http://localhost:3000/toys`, {
    method: 'POST',
    headers: {
      'Content-Type':'Application/json',
      Accepts: 'Application/json'
    },
    body: JSON.stringify(toy)
  })
  .then(resp=>resp.json())
  .then(toy=>{
    const toyFormContainer = document.querySelector(".container");
    createToyCard(toy)
  })
}

function deleteToy(toy, div) {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'DELETE'
  })
  .then(resp=>resp.json())
  .then(div.remove())
}

function addLike(toy, p) {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type':'Application/json',
      Accepts: 'Application/json'
    },
    body: JSON.stringify({likes: toy.likes + 1})
  })
  .then(resp=>resp.json())
  .then(p.innerText = parseInt(toy.likes += 1))
}

function createToyCard(toy) {
  const toyCollection = document.querySelector('#toy-collection')
  const div = document.createElement('div')
  const h2 = document.createElement('h2')
  const img = document.createElement('img')
  const p = document.createElement('p')
  const likebtn = document.createElement('button')
  const deletebtn = document.createElement('button')

  div.className = 'card'
  h2.innerText = toy.name
  img.src = toy.image
  img.className = 'toy-avatar'
  p.innerText = toy.likes
  likebtn.className = 'like-btn'
  likebtn.innerText = 'Like'
  deletebtn.className = 'like-btn'
  deletebtn.innerText = 'Delete'

  deletebtn.addEventListener('click', () => deleteToy(toy, div))
  likebtn.addEventListener('click', () => addLike(toy, p))

  div.append(h2, img, p, likebtn, deletebtn)
  toyCollection.appendChild(div)
}


