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
  toys.forEach(element => () {
    renderToys(toy);
  });
}

const toyCollectionDiv = document.querySelector("#toy-collection");
const addToyDiv = document.createElement("div");


function renderToys(toys) {
  addToyDiv.className = "card";
  addToyDiv.id = `${toy.name}`

  addToyDiv.append()
  toyCollectionDiv.appendChild(addToyDiv)



}

