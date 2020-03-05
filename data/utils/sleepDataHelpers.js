module.exports = {
    generateSleepEntry,
    generateBedtimeAndWaketime,
    addLeadingZero,
    addHours,
    addMinutes,
    getRandom05Minutes,
    getHoursMinutesSlept,
    getTotalMinutesSlept,
    generateRatingGuess,
    generateRatingGuess,
    generateAllThreeRatings,
    generateOneInNChance
}

function generateSleepEntry(user_id, daysBeforeCurrentDate, currentDate, addComputedValues) {

    const [time_bedtime, time_wakeup] = generateBedtimeAndWaketime(daysBeforeCurrentDate, currentDate);
    const total_minutes_slept = getTotalMinutesSlept(time_bedtime, time_wakeup);

    const [rating_wakeup, rating_day, rating_bedtime] = generateAllThreeRatings(total_minutes_slept);

    const log_date = time_wakeup;

    // determine whether to add rating_average, sleeptime_hours, sleeptime_extra_minutes, and sleeptime_total_minutes
    // these four are NOT added when generating seed data
    // these four are added when generating data via the /generate endpoint.
    if (addComputedValues)
        {
            // use floor() instead of round() to be consistent with SQL's rounding down
            let rating_average = Math.floor((rating_wakeup + rating_day + rating_bedtime) / 3 * 100) / 100;

            let sleeptime_hours = Math.floor(total_minutes_slept / 60);
            let sleeptime_extra_minutes = total_minutes_slept - sleeptime_hours * 60;
            let sleeptime_total_minutes = total_minutes_slept;

            return { user_id, log_date, time_bedtime, time_wakeup, rating_wakeup, rating_day, rating_bedtime, rating_average, sleeptime_hours, sleeptime_extra_minutes, sleeptime_total_minutes};
        }

    return { user_id, log_date, time_bedtime, time_wakeup, rating_wakeup, rating_day, rating_bedtime};
}

function generateBedtimeAndWaketime(daysBeforeCurrentDate, currentDate) {

    let bedtime = new Date(currentDate);
    bedtime.setDate(bedtime.getDate() - daysBeforeCurrentDate - 1);

    // start bedtime at 9pm and wake time at 6am
    let baseBedtime = 21;
    let baseWaketime = 6;

    // add a random number of hours to bedtime and waketime
    let newBedtimeHours = baseBedtime + addHours(5) + addHours(4);
    let newBedtimeMinutes = getRandom05Minutes() + addMinutes(5);

    let newWaketimeHours = baseWaketime + addHours(3);
    let newWaketimeMinutes = getRandom05Minutes() + addMinutes(5);

    // update bedtime object with computed time
    bedtime.setHours(newBedtimeHours);
    bedtime.setMinutes(newBedtimeMinutes);
    bedtime.setSeconds(0);

    // make new object for waketime
    let waketime = new Date(currentDate);
    waketime.setDate(waketime.getDate() - daysBeforeCurrentDate);
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

function generateAllThreeRatings(total_minutes_slept) {

    let rating_waketime = generateRatingGuess(total_minutes_slept);
    let rating_day = rating_waketime;
    let rating_bedtime = rating_waketime;

    // randomize ratings: mood might get better or worse throughout the day
    if (generateOneInNChance(5))
    {
        if (generateOneInNChance(2))
            { rating_day += 1; }
        else
            { rating_day -= 1; }
    }

    // randomize ratings: mood might get better or worse by the end of the day
    if (generateOneInNChance(5))
    {
        if (generateOneInNChance(2))
            { rating_bedtime += 1; }
        else
            { rating_bedtime -= 1; }
    }

    // change any ratings of "0" to "1" and any ratings of "5" to "4"
    if (rating_day === 0)
        { rating_day = 1;}
    else if (rating_day === 5)
        { rating_day = 4; }

    if (rating_bedtime === 0)
        { rating_bedtime = 1;}
    else if (rating_bedtime === 5)
        { rating_bedtime = 4; }

    return [rating_waketime, rating_day, rating_bedtime];
}

// returns true 1/n of the time
function generateOneInNChance(n)
    {
        let randomNumber = Math.floor(Math.random() * n);
        return randomNumber === 0;
    }
