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
    console.log(toy)
    renderToy(toy);
  });
  const createToyBttn = document.querySelector(".submit")
  createToyBttn.addEventListener("submit", createToy)
}

const toyCollectionDiv = document.querySelector("#toy-collection");


function renderToy(toy) {
  const addToyDiv = document.createElement("div");
  addToyDiv.className = "card";

  const img = document.createElement("img");
  img.className = "toy-avatar"
  img.src = toy.image

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
  const name = document.querySelector("#input-text").value;
  const img = document.querySelector("#input-toy-image").value;

  const toy = {
    name: name,
    img: img,
    likes: 0
  };

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toy),
  };

  fetch("http://localhost:3000/toys/", configObj)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (toy) {
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
