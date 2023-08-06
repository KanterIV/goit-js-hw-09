import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  dateInput: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('button'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.startBtn.setAttribute('disabled', true);
refs.startBtn.addEventListener('click', onStartTimerClick);
let intervalId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
      refs.startBtn.setAttribute('disabled', true);
      setTimeout(() => {
        Notify.failure('Please choose a date in the future');
      }, 250);
    } else {
      refs.startBtn.removeAttribute('disabled');
    }
  },
};

const fp = flatpickr(refs.dateInput, options);

function onStartTimerClick() {
  refs.startBtn.setAttribute('disabled', true);
  intervalId = setInterval(() => {
    const currentTime = new Date().getTime();
    const chosenTime = new Date(refs.dateInput.value).getTime();
    const timeDifference = chosenTime - currentTime;
    const convertTime = convertMs(timeDifference);

    refs.days.textContent = convertTime.days;
    refs.hours.textContent = convertTime.hours;
    refs.minutes.textContent = convertTime.minutes;
    refs.seconds.textContent = convertTime.seconds;

    if (
      refs.days.textContent === '00' &&
      refs.hours.textContent === '00' &&
      refs.minutes.textContent === '00' &&
      refs.seconds.textContent === '00'
    ) {
      clearInterval(intervalId);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
