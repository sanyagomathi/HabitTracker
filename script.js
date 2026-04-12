
let target = "22:30";
let completedDays = [1, 3, 4, 8, 11, 15, 19, 23];
let currentDate = new Date();

function openPopup(){
  document.getElementById("popup").style.display = "flex";
}

function formatTime(time24) {
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
}

function saveTarget(){
  const newTarget = document.getElementById("newTarget").value;
  if(!newTarget) return;
  target = newTarget;
  document.getElementById("targetTime").innerText = formatTime(target);
  document.getElementById("popup").style.display = "none";
}

function saveDay(){
  const sleepTime = document.getElementById("sleepInput").value;

  if(sleepTime === ""){
    alert("Enter your sleep time");
    return;
  }

  const today = new Date().getDate();
  document.getElementById("todaySleep").innerText = formatTime(sleepTime);

  if(sleepTime <= target){
    if(!completedDays.includes(today)){
      completedDays.push(today);
    }
    document.getElementById("statusText").innerText = "On Time";
  } else {
    document.getElementById("statusText").innerText = "Late";
  }

  renderCalendar();
}

function renderCalendar(){
  const cal = document.getElementById("calendar");
  cal.innerHTML = "";

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  document.getElementById("monthYear").innerText =
    currentDate.toLocaleString("default", { month: "long" }) + " " + year;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  days.forEach(d => {
    const div = document.createElement("div");
    div.className = "day-name";
    div.innerText = d;
    cal.appendChild(div);
  });

  for(let i = 0; i < firstDay; i++){
    cal.appendChild(document.createElement("div"));
  }

  for(let i = 1; i <= lastDate; i++){
    const box = document.createElement("div");
    box.classList.add("day-box");
    box.innerText = i;

    if(completedDays.includes(i)){
      box.classList.add("done");
    }

    cal.appendChild(box);
  }
}

function prevMonth(){
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}

function nextMonth(){
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}

renderCalendar();
document.getElementById("targetTime").innerText = formatTime(target);
document.getElementById("targetHeader").innerText = `Sleep Before ${formatTime(target)}`;

const ctx = document.getElementById('myChart');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Sleep Before Target Trend',
      data: [23.4, 22.9, 23.1, 22.7],
      tension: 0.4
    }]
  },
  options: {
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            const hour = Math.floor(value);
            const minutes = Math.round((value - hour) * 60).toString().padStart(2, '0');
            const hour12 = hour % 12 || 12;
            const ampm = hour >= 12 ? 'PM' : 'AM';
            return `${hour12}:${minutes} ${ampm}`;
          }
        }
      }
    }
  }
});
