let addToy = false;
const TOYS_URL = "http://localhost:3000/toys";

//GET
function fetchToys() {
    fetch(TOYS_URL)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      makeToys(data);
    });
}

function postToy(toy){
  fetch(TOYS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toy)
  })
    .then(function(res) {
      console.log(res);
      return res.json();
    })
    .then(function(data) {
      if (data.id) {
        makeToys([data]);
      } else {
        console.log("SOMETHING WENT WRONG");
      }
    });
} 

function updateLike(toy)  {
  fetch(`${TOYS_URL}/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": toy.likes
    })
  })
  {/* .then(function(res) {
    return res.json()
  }).then(function(data) {
    makeToys([data]);
    // document.getElementById("book-list").replaceChild(newCard, editedCard)
  }) */}
}

function makeToys(data) {
  data.forEach(function(toy) { //data = [{},{}]
    const divElement = document.createElement('div');
    divElement.className = "card";

    const toyCollection = document.getElementById('toy-collection');
    toyCollection.appendChild(divElement);

    const h2Element = document.createElement('h2');
    h2Element.innerText = toy["name"];
    divElement.appendChild(h2Element);

    const imgElement = document.createElement('img');
    imgElement.src = toy["image"];
    imgElement.className = "toy-avatar";
    divElement.appendChild(imgElement);

    const pElement = document.createElement('p');
    pElement.innerText = `${toy["likes"]} Likes `;
    divElement.appendChild(pElement);

    const buttonLike = document.createElement("button");
    buttonLike.className = "like-btn";
    buttonLike.textContent = "Like <3";
    divElement.appendChild(buttonLike);
    buttonLike.addEventListener("click", function() {
      toy.likes += 1;
      updateLikeDiv(pElement, toy);
      updateLike(toy);
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.textContent = "Delete";
    divElement.appendChild(deleteButton);
    deleteButton.addEventListener("click", function() {
      deleteToy(divElement);
      deleteToyFromApi(toy.id);
    });

    return divElement;
  });
}

function deleteToy(div) {
  div.parentElement.removeChild(div);
}

function updateLikeDiv(pElement, toy){
  pElement.innerText = `${toy["likes"]} Likes `;
}

// function updateLikeDiv(pElement){
//   pElement.innerText = `${c} Likes `;
//   var anchor = document.querySelector('a');
//   anchor.lastChild.textContent = 'Other text';
// }

function deleteToyFromApi(toyId) {
  // console.log(toyId);
  fetch(`${TOYS_URL}/${toyId}`, {
    method: "DELETE"
  })
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      console.log(data);
    });
}

fetchToys();

document.addEventListener("DOMContentLoaded", () => {
  // fetchToys();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toysObj = document.querySelector("#toy-collection");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  document.querySelector(".add-toy-form").addEventListener("submit", function(event){
    event.preventDefault();
    // console.dir(event.target);
    // console.log('target name', event.target.name.value);
    // console.log('target image', event.target.image.value);
    const name = event.target.name.value;
    const img = event.target.image.value;
    let likes = 0;
    const newToy = {name, img, likes};
    postToy(newToy);
    makeToys(newToy);
  })
});