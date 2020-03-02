const sleepDataHelpers = require("../utils/sleepDataHelpers");

exports.seed = function(knex) {

  return knex("users").insert(generateSeedSleepEntries());

}

function generateSeedSleepEntries() {

  let sleepEntries = [];

  // number of entries to generate for the seed data (4 users).
  // index 0 in the array is ignored since SQL numbering starts at 1.
  let entriesToGeneratePerUser = [0, 5, 12, 30, 40];

  for (let user_id = 1; user_id < 4; user_id++)
    {
      let entriesToGenerate = entriesToGeneratePerUser[user_id];

      for (let entry_number = 0; entry_number < entriesToGenerate; entry_number++)
      {
          sleepEntries.push(sleepDataHelpers.generateSleepEntry(user_id, entry_number));
      }
    }
  
  return sleepEntries;
  
}