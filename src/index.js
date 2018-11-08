document.addEventListener('DOMContentLoaded', () => {


const tableBody = document.querySelector('#table-body')
const dogForm = document.querySelector('#dog-form')

let nameInput = document.querySelector('input[name="name"]')
let breedInput = document.querySelector('input[name="breed"]')
let sexInput = document.querySelector('input[name="sex"]')

let namePlaceholder = document.querySelector('input[placeholder="name"][value=""]')


function render() {
  tableBody.innerHTML = ""
fetch('http://localhost:3000/dogs').then(response => response.json())
.then(json => {


    json.forEach(json => {
      tableBody.innerHTML += `<tr><td>Dog ${json.name}</td> <td>${json.breed}</td>
      <td>${json.sex}</td>
      <td id=${json.id}><button class=editButton>Edit Dog</button></td>
      </tr>`

    })
})
}

document.addEventListener('click', event => {
  // event.preventDefault()
    let currentDogName = event.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML
    let currentDogBreed = event.target.parentElement.previousElementSibling.previousElementSibling.innerHTML
    let currentDogSex = event.target.parentElement.previousElementSibling.innerHTML
    let editId = event.target.parentElement.id

  if (event.target.className === 'editButton') {
    nameInput.value = currentDogName
    nameInput.dataset.id = editId
    breedInput.value = currentDogBreed
    sexInput.value = currentDogSex
    console.log(nameInput.dataset)
  }
})

dogForm.addEventListener('submit', event => {
  event.preventDefault()

  let eventId = event.target.children[0].dataset.id

  fetch(`http://localhost:3000/dogs/${eventId}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify({
        name: nameInput.value,
        breed: breedInput.value,
        sex: sexInput.value
      })
  }).then( () => render())
  })

  render()
})


  // let submitBt = event.target.children[3].type
  // let id = event.target.children[3].id
  // if (submitBt === 'submit'){
//     fetch(`http://localhost:3000/dogs/${eventId}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-type': 'application/json',
//         Accepts: 'application/json'
//       },
//       body: JSON.stringify({
//         name: nameInput.value,
//         breed: breedInput.value,
//         sex: sexInput.value
//       })
//     }).then(response => response.json())
//     .then(json => {
//       currentNameHTML.innerText = `${json.name}`
//     })
//   // }
//
// }
// }

// document.addEventListener('click', event => {
// event.preventDefault()
//   if (event.target.className === 'editButton') {
//
//   }
//
// })
