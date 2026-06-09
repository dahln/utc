const STORAGE_KEY = "utc-hour-format";

const clockElement = document.getElementById("clock");
const toggle = document.getElementById("hour-format-toggle");

function formatUtcTime(date, use12Hour) {
  let hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  if (!use12Hour) {
    return `${String(hours).padStart(2, "0")}:${minutes}:${seconds}`;
  }

  const suffix = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${String(hours).padStart(2, "0")}:${minutes}:${seconds} ${suffix}`;
}

function getStoredFormat() {
  return localStorage.getItem(STORAGE_KEY) === "12";
}

function updateClock() {
  clockElement.textContent = formatUtcTime(new Date(), toggle.checked);
}

function handleToggleChange() {
  localStorage.setItem(STORAGE_KEY, toggle.checked ? "12" : "24");
  updateClock();
}

toggle.checked = getStoredFormat();
toggle.addEventListener("change", handleToggleChange);

updateClock();
setInterval(updateClock, 1000);
