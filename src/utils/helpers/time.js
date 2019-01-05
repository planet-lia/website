

export function seconds2time(secondsRaw) {
  secondsRaw = Math.round(secondsRaw);

  let hours   = Math.floor(secondsRaw / 3600);
  let minutes = Math.floor((secondsRaw - (hours * 3600)) / 60);
  let seconds = secondsRaw - (hours * 3600) - (minutes * 60);
  let time = "";

  if (hours !== 0) {
    time = hours+":";
  }
  if (minutes !== 0 || time !== "") {
    minutes = (minutes < 10 && time !== "") ? "0"+minutes : String(minutes);
    time += minutes+":";
  }
  if (time === "") {
    time = seconds+"s";
  }
  else {
    time += (seconds < 10) ? "0"+seconds : String(seconds);
  }
  return time;
}