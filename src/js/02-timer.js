import flatpickr from 'flatpickr';
require('flatpickr/dist/themes/dark.css');
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '300px',
});

const btnStartEl = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

const INTERVAL_DURATION = 1000;
let timeLine = null;

btnStartEl.setAttribute('disabled', 'true');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    timeLine = selectedDates[0] - currentDate;
    if (timeLine <= 0) {
      Notiflix.Notify.failure('Please choose a date in the future! ❌');
      btnStartEl.setAttribute('disabled', 'true');
    } else {
      btnStartEl.removeAttribute('disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

btnStartEl.addEventListener('click', handlerStart);

function handlerStart() {
  btnStartEl.setAttribute('disabled', 'true');
  const intervalID = setInterval(() => {
    if (timeLine >= 0) {
      addDate(convertMs(timeLine));
      timeLine -= INTERVAL_DURATION;
    } else {
      clearInterval(intervalID);
      Notiflix.Notify.success('The time has come! ✔', { width: '200px' });
    }
  }, INTERVAL_DURATION);
}

function addDate(date = {}) {
  const { days, hours, minutes, seconds } = date;
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
