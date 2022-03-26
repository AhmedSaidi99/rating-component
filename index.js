

let rateNums = '';
for (let i = 1; i < 6; i++) {
  rateNums += `<div class="rating--num circle-bg" data-rate="${i}" onclick="handleClick(this)">${i}</div>`
}

// First state: When user is choosing the rate
function rateState(rateNumbers) {
  return `<img class="card--star circle-bg" src="./images/icon-star.svg" alt="Star" />
<h1 class="card--title">How did we do?</h1>
<p class="card--desc">
  Please let us know how we did with your support request. All feedback
  is appreciated to help us improve our offering!
</p>
<div class="card--rating">
  ${rateNumbers}
</div>
<button class="card--btn" onclick="handleSubmit()">Submit</button>`
};

// Second state: When user submit the rate
function submittedState(rate) {
  return `<div class="card--img">
  <img
  src="./images/illustration-thank-you.svg"
  alt="Star"
  />
</div>
<h1 class="card--result">You selected ${rate} out of 5</h1>
<p class="card--desc">
<span>Thank you!</span><br />We appreciate you taking the time to give a rating. If you
ever need more support, don’t hesitate to get in touch!
</p>`};

const card = document.querySelector('.card')
let cardContent = document.querySelector('.card--content');


if (!card.classList.contains('thank-state')) {
  cardContent.innerHTML = rateState(rateNums);
}

let rate = 0;
let btn = document.querySelector('.card--btn');
let backBtn = document.createElement('span');

backBtn.textContent = 'UNDO'
backBtn.classList.add('back--btn')


function handleClick(e) {
  document.querySelectorAll('.rating--num').forEach(num => {
    num.classList.remove('active')
  })
  e.classList.add('active')
  rate = e.dataset.rate
  JSON.stringify(localStorage.setItem('rate', rate))
}


function handleSubmit() {
  card.appendChild(backBtn)
  card.classList.add('thank-state')
  cardContent.style.textAlign = 'center'
  cardContent.innerHTML = submittedState(JSON.parse(localStorage.getItem('rate')))
  backBtn.style.display = 'block'
}

backBtn.addEventListener('click', () => {
  card.classList.remove('thank-state')
  cardContent.innerHTML = rateState(rateNums)
  cardContent.style.textAlign = 'left'
  backBtn.style.display = 'none'
  localStorage.removeItem('rate')
})