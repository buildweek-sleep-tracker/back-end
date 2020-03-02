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

// generate a rating guess based on the number of minutes slept
// for generating seed data use only
function generateRatingGuess(minutes_slept) {

    let rating = null;

    // 6 hours or fewer: lowest score
    if (minutes_slept <= 360)
        { rating = 1; }
    // 7 hours or fewer
    else if (minutes_slept <= 420)
        { rating = 2; }
    // 8 hours or fewer
    else if (minutes_slept <= 480)
        { rating = 3; }
    else
        { rating = 4; }

    // randomize ratings: small chance of any rating being upgraded or downgraded
    if (generateOneInNChance(5))
        {
            if (generateOneInNChance(2))
                { rating += 1; }
            else
                { rating -= 1; }
        }

    // change any ratings of "0" to "1" and any ratings of "5" to "4"
    if (rating === 0)
        { rating = 1;}
    else if (rating === 5)
        { rating = 4; }
    
    // small chance of a "2" rating being upgraded or downgraded
    if (rating === 2 && generateOneInNChance(10))
        { rating = 3; }
    else if (rating === 2 && generateOneInNChance(10))
        { rating = 4; }

    // small chance of a "4" rating being downgraded
    else if (rating === 4 && generateOneInNChance(10))
        { rating = 1; }
    else if (rating === 4 && generateOneInNChance(10))
        { rating = 2; }
    
    return rating;
}

// returns true 1/n of the time
function generateOneInNChance(n)
    {
        let randomNumber = Math.floor(Math.random() * n);
        return randomNumber === 0;
    }