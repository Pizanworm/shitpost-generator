const form = document.querySelector('form');
const memeSound = new Audio('meme.mp3')

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  showSpinner();
  const data = new FormData(form);
  const text = data.get('prompt')

  const response = await fetch('/dream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: text
    }),
  });
  const { image } = await response.json();
  const mainContainer = document.querySelector('#main');
  mainContainer.innerHTML = `
  <div class="demo-container">
  <div class="img-container">
    <img class="demo-img" src="${image}">
  </div>
  <div class="demo-text-container"> 
    <p class="demo-text" >${text}</p>
  </div>
</div>
  `;
  memeSound.play()
  hideSpinner();
});

function showSpinner() {
  const button = document.querySelector('button')
  button.disabled = true
  button.innerHTML = 'Generating... <span class="spinner">💩</span>'
}

function hideSpinner() {
  const button = document.querySelector('button')
  button.disabled = false
  button.innerHTML = 'Generate'
}