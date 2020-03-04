const rating_average = "ROUND((rating_wakeup + rating_day + rating_bedtime) / 3.0, 2) AS rating_average";

const sleeptime_total_minutes = "(time_wakeup - time_bedtime) / 60000 AS sleeptime_total_minutes";
const sleeptime_hours = "(time_wakeup - time_bedtime) / 3600000 AS sleeptime_hours";
const sleeptime_extra_minutes = "((time_wakeup - time_bedtime) / 60000) - ((time_wakeup - time_bedtime) / 3600000) * 60 AS sleeptime_extra_minutes";

module.exports = {
    rating_average,
    sleeptime_total_minutes,
    sleeptime_hours,
    sleeptime_extra_minutes
}

