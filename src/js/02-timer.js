import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  dateInput: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('button'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

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
        alert('Please choose a date in the future');
      }, 250);
    } else {
      refs.startBtn.removeAttribute('disabled');
    }
  },
};

const fp = flatpickr(refs.dateInput, options);

function onStartTimerClick() {
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

function doubleNumber(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = doubleNumber(Math.floor(ms / day));
  // Remaining hours
  const hours = doubleNumber(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = doubleNumber(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = doubleNumber(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
