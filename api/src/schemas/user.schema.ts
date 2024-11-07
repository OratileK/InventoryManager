import { pgTable, serial, varchar } from "drizzle-orm/pg-core";


const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 256 }),
  password: varchar("password", { length: 256 }),
});



export default usersTable;