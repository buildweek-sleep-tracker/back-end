exports.seed = function(knex) {

  return knex("users").insert([
    {email: "a@a.a", password: "$2a$14$Udm6e21czqnze8VZEE/0Duo06fBAuCzqstjaUFojnJf0L/PMHqdl.", first_name: "aaa", last_name: "zzz"},
    {email: "b@b.b", password: "$2a$14$ItDFVlz7GgeLzc.hQqNsn.nwwsDcoVHhC7auUCFjAQs9/FVp7Qmny", first_name: "bbb", last_name: "yyy"},
    {email: "c@c.c", password: "$2a$14$SYsuZy0vErn7NDhXurk1M.0x6cVuqVssawzyZXUGMC2K7NNFrsyiq", first_name: "ccc", last_name: "xxx"},
    {email: "asdf", password: "$2a$14$5WuveZIOUiqu.DuY6FGwsOUrRYoHHEtUm/BbtXGBHPCkKrUUW9uPS", first_name: "asdf", last_name: "asdf"},
  ])
}
