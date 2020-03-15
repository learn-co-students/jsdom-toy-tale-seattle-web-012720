let addToy = false;


function createToyCard(toy) {
    const toyCollection = document.getElementById("toy-collection")
    const div = document.createElement('div')
    const h2 = document.createElement('h2')
    const img = document.createElement('img')
    const p = document.createElement('p')
    const likeButton = document.createElement('button')

    likeButton.className = 'like-btn'
    likeButton.innerText = 'Like <3'
    img.setAttribute('src', toy.image)
    p.innerText = toy.likes
    img.className = 'toy-avatar'
    h2.innerText = toy.name
    div.className = 'card'

    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(likeButton)

    toyCollection.appendChild(div)

    const configLike = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        likes: toy.likes + 1
      })
    }
    likeButton.addEventListener('click', function(event) {
      event.preventDefault();
      fetch(`http://localhost:3000/toys/${toy.id}`, configLike)
      .then(function(resp) {
        return resp.json()
      })
      .then(function(toy) {
        const toyCollection = document.getElementById("toy-collection")
        const newDiv = document.createElement('div')
        const newH2 = document.createElement('h2')
        const newImg = document.createElement('img')
        const newP = document.createElement('p')
        const likeButton = document.createElement('button')
    
        likeButton.className = 'like-btn'
        likeButton.innerText = 'Like <3'
        newImg.setAttribute('src', toy.image)
        newP.innerText = toy.likes
        newImg.className = 'toy-avatar'
        newH2.innerText = toy.name
        newDiv.className = 'card'
    
        newDiv.appendChild(newH2)
        newDiv.appendChild(newImg)
        newDiv.appendChild(newP)
        newDiv.appendChild(likeButton)

        toyCollection.replaceChild(newDiv,div)
      })
    })
    // Why can I not click the like button more than once?
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  fetch("http://localhost:3000/toys")
  .then(function(resp) {
    return resp.json()
  })
  .then(function(data) {
    // console.log(data)
    data.forEach(function(toy) {
      createToyCard(toy);
    })
  })
  
  toyForm.addEventListener('submit', function(event) {
    event.preventDefault();
    // console.log(event.target.name.value)
    // console.log(event.target.image.value)

    const configToy = {
      // method
      method: 'POST',
      //header
      headers: {
        "Content-Type": 'application/json',
        Accept: 'application/json'
      },
      //body
      body: JSON.stringify({
        name: event.target.name.value,
        image: event.target.image.value
      })
    }
    
    fetch("http://localhost:3000/toys", configToy)
    .then(function(resp) {
      return resp.json()
    })
    .then(function(toy) {
      console.log(toy)
      if (toy.id) {
        createToyCard(toy)
      } else {
        console.log("error")
      }
    })
  })



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
