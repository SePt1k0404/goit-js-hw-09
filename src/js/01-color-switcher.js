const btnStartEl = document.querySelector('button[data-start]');
const btnStopEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

btnStartEl.addEventListener('click', startChangeColor);
btnStopEl.addEventListener('click', stopChangeColor);

let intervalId = null;

function startChangeColor() {
  btnStartEl.setAttribute('disabled', 'true');
  btnStopEl.removeAttribute('disabled');
  intervalId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopChangeColor() {
  btnStartEl.removeAttribute('disabled');
  btnStopEl.setAttribute('disabled', 'true');
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
