function generateSleepEntry(user_id) {

    const [time_bedtime, time_waketime] = generateBedtimeAndWaketime();
    // const [hours_slept, minutes_slept] = getHoursMinutesSlept(time_bedtime, time_waketime);
    // const total_minutes_slept = getTotalMinutesSlept(time_bedtime, time_waketime);

    // return { user_id, time_bedtime, time_waketime, hours_slept, minutes_slept, total_minutes_slept }
    return { user_id, time_bedtime, time_waketime};
}

function generateBedtimeAndWaketime() {

    let bedtime = new Date();

    // start bedtime at 9pm and wake time at 6am
    let baseBedtime = 21;
    let baseWaketime = 6;

    // add a random number of hours to bedtime and waketime
    let newBedtimeHours = baseBedtime + addHours(3) + addHours(3) + addHours(3);
    let newBedtimeMinutes = getRandom05Minutes() + addMinutes(5);

    let newWaketimeHours = baseWaketime + addHours(2);
    let newWaketimeMinutes = getRandom05Minutes() + addMinutes(5);

    // add leading zero to single-digit hours and minutes
    newBedtimeHours = addLeadingZero(newBedtimeHours);
    newBedtimeMinutes = addLeadingZero(newBedtimeMinutes);

    newWaketimeHours = addLeadingZero(newWaketimeHours);
    newWaketimeMinutes = addLeadingZero(newWaketimeMinutes);

    // update bedtime object with computed time
    bedtime.setHours(newBedtimeHours);
    bedtime.setMinutes(newBedtimeMinutes);
    bedtime.setSeconds(0);

    // make new object for waketime
    let waketime = new Date(bedtime);
    waketime.setHours(newWaketimeHours);
    waketime.setMinutes(newWaketimeMinutes);

    return [bedtime, waketime];

}

function addLeadingZero(n) {
    if (n < 10)
        { return "0" + n; }
    else
        { return n; }
}

// 1/3 chance of adding n hours to time
function addHours(n) {

    if (Math.floor(Math.random() * 3) === 1)
        { return Math.floor(Math.random() * n); }

    return 0;

}

// 1/3 chance of adding n minutes to time
function addMinutes(n) {

    if (Math.floor(Math.random() * 3) === 1)
        { return Math.floor(Math.random() * n); }

    return 0;

}

// generate random minute in 5-minute increments (:00 to :055)
function getRandom05Minutes() {
    return Math.floor(Math.random() * 12) * 5;
}

// returns the number of hours and minutes slept as an array
function getHoursMinutesSlept(time_bedtime, time_waketime) {

    const timeDifference = new Date(time_waketime - time_bedtime);

    return [timeDifference.getHours(), timeDifference.getMinutes()];
}

// returns the number of minutes slept as an integer
function getTotalMinutesSlept(time_bedtime, time_waketime) {

    const [hours, minutes] = getHoursMinutesSlept(time_bedtime, time_waketime);

    return 60 * hours + minutes;
}