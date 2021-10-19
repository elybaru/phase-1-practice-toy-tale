let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(data => init(data))

function init(toys) {
  toys.forEach(toy => {
    renderToy(toy);
  });
  const createToyForm = document.querySelector(".add-toy-form")
  createToyForm.addEventListener("submit", createToy);
}

const toyCollectionDiv = document.querySelector("#toy-collection");


function renderToy(toy) {
  const addToyDiv = document.createElement("div");
  addToyDiv.className = "card";

  const img = document.createElement("img");
  img.className = "toy-avatar"
  img.src = toy.image
  console.log(img, "Here is the image render in renderToy")

  const toyName = document.createElement("h2");
  toyName.innerText = toy.name

  const likesNum = document.createElement("h5");
  likesNum.className = "likes-num"
  likesNum.textContent = toy.likes

  p = document.createElement("p");
  p.innerText = "Likes"

  const likesBttn = document.createElement("button");
  likesBttn.className = "like-btn"
  likesBttn.innerText = "Like"
  likesBttn.addEventListener("click", () => increaseLikes(toy, likesNum))


  addToyDiv.append(img, toyName, p, likesNum, likesBttn)
  toyCollectionDiv.appendChild(addToyDiv)

}



function createToy(event) {
  event.preventDefault();
  console.log(event)
  // const name = document.querySelector("#input-name-input").value;
  // const img = document.querySelector("#input-toy-image").value;

  const toy = {
    name: event.target[0].value,
    image: event.target[1].value,
    likes: 0
  };
  console.log("Here's a long string ", event.target[1].value)

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toy),
  };

  fetch("http://localhost:3000/toys", configObj)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (toy) {
      console.log(toy)
      renderToy(toy)
    })

}

function increaseLikes(toy, likesNum) {
  toy.likes++;
  likesNum.textContent = toy.likes
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({ likes: toy.likes++ })
  }
  )

}
