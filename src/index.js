let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
  const toys = document.getElementById('toy-collection')
  fetch('http://localhost:3000/toys')
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    for(let i = 0; i < data.length; i++){

      const newDiv = document.createElement('div')
      newDiv.className = "card"

      const h2 = document.createElement('h2')
      h2.textContent = data[i].name

      const img = document.createElement('img')
      img.className = 'toy-avatar'
      img.setAttribute('src', data[i].image)

      const pTag = document.createElement('p')
      pTag.textContent = data[i].likes

      const button = document.createElement('button')
      button.className = 'like-btn'
      button.textContent = 'Like <3'
      button.addEventListener("click", function(event){
        const likeConfigObj = {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            "likes" : data[i].likes + 1
          })
        }
        fetch(`http://localhost:3000/toys/${data[i].id}`, likeConfigObj)
        .then(function(res){
          return res.json()
        })
        .then(function(data){
          const editedDiv = document.createElement('div')
          editedDiv.className = "card" 
          const h2 = document.createElement('h2')
          h2.textContent = data.name
          const img = document.createElement('img')
          img.className = 'toy-avatar'
          img.setAttribute('src', data.image)
          const pTag = document.createElement('p')
          pTag.textContent = data.likes
          const button = document.createElement('button')
          button.className = 'like-btn'
          button.textContent = 'Like <3'
          editedDiv.appendChild(h2)
          editedDiv.appendChild(img)
          editedDiv.appendChild(pTag)
          editedDiv.appendChild(button)
          toys.replaceChild(editedDiv, newDiv)
        })
      })

      newDiv.appendChild(h2)
      newDiv.appendChild(img)
      newDiv.appendChild(pTag)
      newDiv.appendChild(button)
      toys.appendChild(newDiv)
    }
  })


  const newToyForm = document.querySelector("form")
  newToyForm.addEventListener('submit', function(event){
    event.preventDefault()
    let toyConfigObj = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": event.target["name"].value,
        "image": event.target["image"].value
      })
    }
    fetch('http://localhost:3000/toys', toyConfigObj)
    .then(function(res){
      return res.json()
    })
    .then(function(data){
      //im sorry for myself
      if(data.id){

        const newDiv = document.createElement('div')
        newDiv.className = "card"

        const h2 = document.createElement('h2')
        h2.textContent = data.name

        const img = document.createElement('img')
        img.className = 'toy-avatar'
        img.setAttribute('src', data.image)

        const pTag = document.createElement('p')
        pTag.textContent = data.likes

        const button = document.createElement('button')
        button.className = 'like-btn'
        button.textContent = 'Like <3'

        newDiv.appendChild(h2)
        newDiv.appendChild(img)
        newDiv.appendChild(pTag)
        newDiv.appendChild(button)
        toys.appendChild(newDiv)
      }else{
        console.log("WRONG")
      }
    })
  })
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
