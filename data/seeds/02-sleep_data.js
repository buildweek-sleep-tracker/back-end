const sleepDataHelpers = require("../utils/sleepDataHelpers");

exports.seed = function(knex) {

  return knex("sleep_data").insert(generateSeedSleepEntries());

}

function generateSeedSleepEntries() {

  // let currentDate = new Date("2020-03-01T00:00:00.090Z");
  let currentDate = "2020-03-01T00:00:00.090Z";
  let sleepEntries = [];

  // number of entries to generate for the seed data (4 users).
  // index 0 in the array is ignored since SQL numbering starts at 1.
  let entriesToGeneratePerUser = [0, 5, 12, 30, 40];

  for (let user_id = 1; user_id < 4; user_id++)
    {
      let entriesToGenerate = entriesToGeneratePerUser[user_id];

      for (let daysBeforeCurrentDate = entriesToGenerate; daysBeforeCurrentDate > 0; daysBeforeCurrentDate--)
      {
          sleepEntries.push(sleepDataHelpers.generateSleepEntry(user_id, daysBeforeCurrentDate, new Date(currentDate), 0));
      }
    }
  
  return sleepEntries;
  
}