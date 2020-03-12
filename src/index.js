let addToy = false;
const TOY_URL = "http://localhost:3000/toys";

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyCollection = document.getElementById('toy-collection')

  fetch(TOY_URL)
    .then(resp => resp.json())
    .then(data => addToys(data))

    function addToys(toyArray) {
      toyArray.forEach(function(toyObj) {
        appendToy(toyObj);
      })
    }

    function appendToy(toyObj) {
      let div = makeToyCard(toyObj);
      toyCollection.appendChild(div);
    }
    
    function makeToyCard(toy) {
      let card = document.createElement('div');
      card.className = 'card';
    
      let h2 = document.createElement('h2');
      h2.textContent = toy.name;
    
      let img = document.createElement('img');
      img.className = 'toy-avatar';
      img.src = toy.image;
    
      let p = document.createElement('p');
      p.id = `${toy.id}likeNumber`
      p.innerText = `${toy.likes} Likes`
    
      let button = document.createElement('button');
      button.className = "like-btn";
      button.textContent = "Like!";

      button.addEventListener("click", function() {
        let newLikeCount = (parseInt(toy.likes) + 1)
        fetch(TOY_URL + '/' + toy.id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            likes: newLikeCount
          })
        })
        .then(resp => resp.json())
        .then(function(data) {
          if (data.likes>toy.likes) {
            toy.likes = data.likes;
            const likeNum = document.getElementById(`${toy.id}likeNumber`);
            likeNum.innerText = `${data.likes} Likes`
          }
        })

    })
    
      card.appendChild(h2)
      card.appendChild(img)
      card.appendChild(p)
      card.appendChild(button)
    
      return card
    }

  const createToyButton = document.querySelector('form');
  createToyButton.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const image = event.target.image.value;
    const likes = "0";
    const newToy = {
      name,
      image,
      likes
    };
    fetch(TOY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newToy)
    })
    .then(response => response.json())
    .then(data => {
      if (data.id) {
        appendToy(data);
        toyForm.style.display = "none";
        createToyButton.name.value = "";
        createToyButton.image.value = "";
      } else {
        alert("SYSTEM FAILURE!!!!!!!!!")
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
