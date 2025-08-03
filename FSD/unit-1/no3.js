// Add two JSON objects having members like hours, minutes and seconds. After addition, if seconds goes beyond 60, then minutes should be incremented and if minutes go beyond 60, then hour should be incremented.

let time1 = { hour: 8, min: 50, sec: 35 };
let time2 = { hour: 2, min: 20, sec: 50 };

let totalSeconds =
    (time1.hour * 3600 + time1.min * 60 + time1.sec) +
    (time2.hour * 3600 + time2.min * 60 + time2.sec);

let hour = Math.floor(totalSeconds / 3600) % 24;
let min = Math.floor((totalSeconds % 3600) / 60);
let sec = totalSeconds % 60;

console.log(`Result: ${hour}h ${min}m ${sec}s`);