const STORAGE_KEY = "utc-hour-format";

const clockElement = document.getElementById("clock");
const localClockElement = document.getElementById("local-clock");
const timezoneElement = document.getElementById("timezone");
const toggle = document.getElementById("hour-format-toggle");

function formatTime(hours, minutes, seconds, use12Hour) {
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  if (!use12Hour) {
    return { time: `${String(hours).padStart(2, "0")}:${mm}:${ss}`, suffix: "" };
  }

  const suffix = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return { time: `${String(hours).padStart(2, "0")}:${mm}:${ss}`, suffix };
}

function formatUtcTime(date, use12Hour) {
  return formatTime(date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), use12Hour);
}

function formatLocalTime(date, use12Hour) {
  return formatTime(date.getHours(), date.getMinutes(), date.getSeconds(), use12Hour);
}

function getStoredFormat() {
  return localStorage.getItem(STORAGE_KEY) === "12";
}

function renderTime(element, { time, suffix }) {
  if (suffix) {
    element.innerHTML = `${time}<span class="ampm"> ${suffix}</span>`;
  } else {
    element.textContent = time;
  }
}

function updateClock() {
  const now = new Date();
  renderTime(clockElement, formatUtcTime(now, toggle.checked));
  renderTime(localClockElement, formatLocalTime(now, toggle.checked));
}

function handleToggleChange() {
  localStorage.setItem(STORAGE_KEY, toggle.checked ? "12" : "24");
  updateClock();
}

toggle.checked = getStoredFormat();
toggle.addEventListener("change", handleToggleChange);

timezoneElement.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;

updateClock();
setInterval(updateClock, 1000);
