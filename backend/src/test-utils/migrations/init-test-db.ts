import { knex } from "knex";
exports.up = async function(db: knex.Knex<any, unknown[]>) {
  await db.schema
    .createTable("lead", (table) => {
      table.string("id"),
      table.string("name"),
      table.string("email"),
      table.string("mobile"),
      table.string("postcode")
    })
    .createTable("service", (table) => {
      table.string("id"),
      table.string("name")
    })
    .createTable("lead_service", (table) => {
      table.string("lead_id"),
      table.string("service_id")
    })
    .then(() => {
      console.log("created tables")
    });
  await db.insert([
    {id: 'abc', name: 'hello'},
    {id: 'abd', name: 'world'}
  ]).into("service").then(()=>{
    console.log("inserted dummy services")
  });
  
  
};

exports.down = async function(db: knex.Knex<any, unknown[]>) {
  await db.schema.dropTable("lead")
    .dropTable("service")
    .dropTable("lead_service")
    .then(() => {
    console.log("dropped tables")
  });
};