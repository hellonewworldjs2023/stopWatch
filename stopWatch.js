const start = document.getElementsByClassName("start-button")[0];
const stop = document.getElementsByClassName("stop-button")[0];
const reset = document.getElementsByClassName("reset-button")[0];
const lap = document.getElementsByClassName("lap-button")[0];

const time = document.getElementsByClassName("time")[0];
const lapElement = document.getElementsByClassName("lap-time")[0]

let startTime;
let stopTime = 0;
let timeoutID;

const lapTime = [];

function countTime(){
    const currentTime = new Date(Date.now() - startTime + stopTime);
    const h = String(currentTime.getHours()-9).padStart(2,"0");//時差によるずれ修正
    const m = String(currentTime.getMinutes()).padStart(2,"0");
    const s = String(currentTime.getSeconds()).padStart(2,"0");
    const ms = String(currentTime.getMilliseconds()).padStart(3,"0");

    time.textContent =`${h}:${m}:${s}.${ms}`;
    timeoutID = setTimeout(countTime,10);
}


start.addEventListener("click",() =>{
    start.disabled = true;
    stop.disabled = false;
    reset.disabled = true;
    lap.disabled = false;
    startTime = Date.now();
    countTime();
});

stop.addEventListener("click",() =>{
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = false;
    lap.disabled = true;
    clearTimeout(timeoutID);
    stopTime += (Date.now() - startTime);
});

reset.addEventListener("click",() =>{
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = true;
    lap.disabled = true;
    time.textContent = "00:00:00.000";
    stopTime = 0;
    lapTime.length = 0;
    lapElement.textContent = "";
});

lap.addEventListener("click",() =>{
    lapTime.push((lapTime.length+1)+". "+time.textContent);
    lapElement.innerHTML=lapTime.join('<br>');
})