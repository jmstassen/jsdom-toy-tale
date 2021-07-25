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

function fetchToys() {
  return fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(json => renderToys(json));
}

function renderToys(toys) {
  const div = document.getElementById('toy-collection');
  toys.forEach(toy=> {
    const card = document.createElement('div');
    card.classList.add("card")
    h2 = document.createElement('h2')
    h2.innerHTML = toy.name
    card.appendChild(h2)
    img = document.createElement('img')
    img.src = toy.image
    img.classList.add("toy-avatar")
    card.appendChild(img)
    p = document.createElement('p')
    p.id = toy.id
    p.innerHTML = toy.likes + " Likes"
    card.appendChild(p)
    button = document.createElement('button')
    button.classList.add("like-btn")
    button.innerHTML = "Like <3"
    // button.value = toy.id
    button.addEventListener("click", function(event) {
      event.preventDefault();
      console.log("click");
      updateLikes(toy.id)
    })
    card.appendChild(button)
    div.appendChild(card)
  });
}

document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();
  const div = document.getElementById('toy-collection');
  const card = document.createElement('div');
  card.classList.add("card")
  h2 = document.createElement('h2')
  toyName = document.getElementsByName("name")[0].value
  h2.innerHTML = toyName
  card.appendChild(h2)
  img = document.createElement('img')
  toyImage = document.getElementsByName("image")[0].value
  img.src = toyImage
  img.classList.add("toy-avatar")
  card.appendChild(img)
  p = document.createElement('p')
  p.innerHTML = "0 Likes"
  card.appendChild(p)
  button = document.createElement('button')
  button.classList.add("like-btn")
  button.innerHTML = "Like <3"
  card.appendChild(button)
  div.appendChild(card)
  submitData(toyName, toyImage)
  document.getElementsByName("name")[0].value = ""
  toyImage = document.getElementsByName("image")[0].value = ""
})

function submitData(name, image) {
  return fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify({
          name: name,
          image: image,
          likes: 0
      })
  })
}

document.addEventListener("DOMContentLoaded", () => {
  fetchToys()
})

function updateLikes(toyId) {
  let p = document.getElementById(toyId)
  let number = Number(p.innerHTML.split(" ")[0]);
  let newNumber = number + 1;
  p.innerHTML = newNumber + " Likes"
  function submitNewLike(toyId) {
    let likeUrl = "http://localhost:3000/toys/" + toyId
    return fetch(likeUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: newNumber
      })
    }) 
  }
  submitNewLike(toyId)
}