const clock = document.getElementById('clock')

let showTime = () => {
    let time = new Date()
    let hour = time.getHours()
    let minutes = time.getMinutes()
    let ampm = "PM"

    if (hour > 12) {
            hour -= 12;
            ampm = "PM";
        }
        if (hour === 0) {
            hour = 12;
            ampm = "AM";
        }

        hour = hour < 10 ? "0" + hour : hour;
        minutes = minutes < 10 ? "0" + minutes : minutes;

    clock.innerHTML = `${hour}:${minutes} ${ampm}`;

    setInterval(showTime, 1000)
}

showTime()