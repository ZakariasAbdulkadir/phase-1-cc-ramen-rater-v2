// // index.js

// import { data } from "happy-dom/lib/PropertySymbol";



const edit = () => {
  const form = document.querySelector('#edit-ramen')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = {}
    data.rating = e.target.rating.value
    data.comment = e.target['new-comment'].value
    fetch('http://localhost:3000/ramens/1', {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => console.log(data))
  })
}

// Callbacks
const handleClick = (ramen) => {
  // Add code
  const h2 = document.querySelector('.name')
  const h3 = document.querySelector('.restaurant')
  const img = document.querySelector('.detail-image')
  h2.textContent = ramen.name
  h3.textContent = ramen.restaurant
  img.src = ramen.image
};

const firstLoad = () => {   
  fetch('http://localhost:3000/ramens')
  .then(res => res.json())
  .then(data => {
    const ramen = data[0]
    const h2 = document.querySelector('.name')
    const h3 = document.querySelector('.restaurant')
    const img = document.querySelector('.detail-image')
    h2.textContent = ramen.name
    h3.textContent = ramen.restaurant
    img.src = ramen.image
  })
}
 
const addSubmitListener = () => {
  // Add code
  const form = document.querySelector('#new-ramen')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = {}
    data.name = e.target.name.value
    data.restaurant = e.target.restaurant.value
    data.image = e.target.image.value
    data.rating = e.target.rating.value
    data.comment = e.target['new-comment'].value
    fetch('http://localhost:3000/ramens', {
      method: "post",
      body: JSON.stringify(data)
    })
  })

}


const displayRamens = () => {
  const div = document.querySelector('#ramen-menu')
  // Add code
  fetch('http://localhost:3000/ramens')
  .then(res => res.json())
  .then(data => {
    data.forEach(ramen => {
      const img = document.createElement('img')
      img.src = ramen.image
      div.append(img)
      img.addEventListener('click', (event) => {
        handleClick(ramen)
      })
    });
  })
};


const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here
  firstLoad()
  addSubmitListener()
  displayRamens()
  edit()
}

main()

// // Export functions for testing
// export {
//   displayRamens,
//   addSubmitListener,
//   handleClick,
//   main,
// }
