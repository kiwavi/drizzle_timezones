import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import { sql } from 'drizzle-orm';

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    createdat: timestamp('timestamp1').notNull().defaultNow(),
    createdatsql: timestamp('timestamp2')
	.notNull()
	.default(sql`now()`),
    createdatWithTimezone: timestamp('timestamp3',{ withTimezone: true,mode: 'string' },)
	.notNull()
	.default(sql`now()`),
});
