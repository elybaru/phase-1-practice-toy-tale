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


}

function increaseLikes(toy, likesNum) {
  ++toy.likes;
  likesNum.textContent = toy.likes
}
