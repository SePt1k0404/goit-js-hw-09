import Notiflix from 'notiflix';

Notiflix.Notify.init({
  clickToClose: true,
});

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', handlerForm);

function handlerForm(evt) {
  evt.preventDefault();
  let promDelay = Number(evt.target.elements.delay.value);
  const promStep = Number(evt.target.elements.step.value);
  const promAmount = Number(evt.target.elements.amount.value);
  for (let i = 1; i <= promAmount; i += 1) {
    createPromise(i, promDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    promDelay += promStep;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
