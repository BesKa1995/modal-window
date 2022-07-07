
let cars = [
  { id: 1, title: 'BMW M3', price: 20000, img: 'https://www.tuningblog.eu/wp-content/uploads/2022/06/BMW-M3-Touring-G81-13.jpg' },
  { id: 2, title: 'BMW M5', price: 50000, img: 'https://cdn.motor1.com/images/mgl/Bz1jR/s1/2020-bmw-m5-edition-35-years.jpg' },
  { id: 3, title: 'BMW M6', price: 600000, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSsNi2dsjmX90fHNHZHxI6AIKfpbCwxTwcRw&usqp=CAU' },
]

const toHTML = car => `
<div class="col">
  <div class="card" style="width: 18rem; height:25rem">
    <img src="${car.img}" class="card-img-top" alt="${car.title}">
    <div class="card-body">
      <h5 class="card-title">${car.title}</h5>
      <a href="#" class="btn btn-primary" data-btn="price" data-id="${car.id}">See Price</a>
      <a href="#" class="btn btn-danger" data-btn="remove" data-id="${car.id}">Delete</a>
    </div>
  </div>
</div>
`

function render() {
  const html = cars.map(toHTML).join('')
  document.querySelector('#cars').innerHTML = html
}


render()
const prcieModal = $.modal({
  title: 'Price on the car',
  closable: true,
  width: '400px',
  footerButtons: [
    {
      text: 'close', type: 'primary', handler() {
        prcieModal.close()
      }
    }
  ]
})

const confirm = $.modal({
  title: 'Are you sure?',
  closable: true,
  width: '400px',
  footerButtons: [
    {
      text: 'cancel', type: 'secondary', handler() {
        confirm.close()
      }
    }, {
      text: 'Delete', type: 'danger', handler() {
        confirm.close()
      }
    }
  ]
})



document.addEventListener('click', event => {
  event.preventDefault()
  const btnType = event.target.dataset.btn
  const id = +event.target.dataset.id
  const car = cars.find(car => car.id === id)

  if (btnType === 'price') {
    prcieModal.setContent(`
    <p>Price ${car.title}: <strong>${car.price}$</strong></p>
    `)
    prcieModal.open()
  } else if (btnType == 'remove') {
    $.confirm({
      title: 'Are you sure?',
      content: `<p>You are removing: <strong>${car.title}</strong>`
    })
      .then(() => {
        cars = cars.filter(car => car.id !== id)
        render()
      })
      .catch(() => {
        console.log('Canceling')
      })
  }
})

