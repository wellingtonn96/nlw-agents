import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { rooms } from "./room.ts";
export const questions = pgTable("questions", {
  id: uuid().primaryKey().defaultRandom(),
  roomId: uuid()
    .references(() => rooms.id)
    .notNull(),
  question: text().notNull(),
  answer: text(),
  createdAt: timestamp().defaultNow().notNull(),
});
