exports.seed = function(knex) {

  return knex(table).insert([
    {email: "a@a.a", password: "", first_name: "aaa", last_name: "zzz"},
    {email: "b@b.b", password: "", first_name: "bbb", last_name: "yyy"},
    {email: "c@c.c", password: "", first_name: "ccc", last_name: "xxx"},
  ])
}