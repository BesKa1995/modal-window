
const cars = [
  { id: 1, title: 'BMW M3', price: 20000, img: 'https://www.tuningblog.eu/wp-content/uploads/2022/06/BMW-M3-Touring-G81-13.jpg' },
  { id: 2, title: 'BMW M5', price: 50000, img: 'https://cdn.motor1.com/images/mgl/Bz1jR/s1/2020-bmw-m5-edition-35-years.jpg' },
  { id: 3, title: 'BMW M6', price: 600000, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSsNi2dsjmX90fHNHZHxI6AIKfpbCwxTwcRw&usqp=CAU' },
]

const toHTML = fruit => `
<div class="col">
  <div class="card" style="width: 18rem; height:25rem">
    <img src="${fruit.img}" class="card-img-top" alt="${fruit.title}">
    <div class="card-body">
      <h5 class="card-title">${fruit.title}</h5>
      <a href="#" class="btn btn-primary" data-btn="price">See Price</a>
      <a href="#" class="btn btn-danger">Delete</a>
    </div>
  </div>
</div>
`

function render() {
  const html = cars.map(toHTML).join('')
  document.querySelector('#fruits').innerHTML = html
}


render()
const modal = $.modal({
  title: 'Vladilen Modal',
  closable: true,
  content: `
     <h1>Modal is working</h1>
     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, sunt.</p>
  `,
  width: '400px',
  footerButtons: [
    {
      text: 'Ok', type: 'primary', handler() {
        modal.close()
      }
    },
    {
      text: 'Close', type: 'danger', handler() {
        modal.close()
      }
    }
  ]
})

document.addEventListener('click', event => {
  event.preventDefault()
  const btnType = event.target.dataset.btn
  if (btnType === 'price') {
    modal.open()
  }
})

