const STORAGE_KEY = "utc-hour-format";
const DIGIT_TO_SEGMENTED = {
  0: "🯰",
  1: "🯱",
  2: "🯲",
  3: "🯳",
  4: "🯴",
  5: "🯵",
  6: "🯶",
  7: "🯷",
  8: "🯸",
  9: "🯹",
};

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

function toSegmentedDisplay(text) {
  return text.replace(/\d/g, (digit) => DIGIT_TO_SEGMENTED[digit]);
}

function updateClock() {
  const formattedTime = formatUtcTime(new Date(), toggle.checked);
  clockElement.textContent = toSegmentedDisplay(formattedTime);
  clockElement.setAttribute("aria-label", formattedTime);
}

function handleToggleChange() {
  localStorage.setItem(STORAGE_KEY, toggle.checked ? "12" : "24");
  updateClock();
}

toggle.checked = getStoredFormat();
toggle.addEventListener("change", handleToggleChange);

updateClock();
setInterval(updateClock, 1000);
