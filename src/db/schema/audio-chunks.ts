import { pgTable, text, uuid, timestamp, vector } from "drizzle-orm/pg-core";
import { rooms } from "./room.ts";
export const audioChunks = pgTable("audio_chunks", {
  id: uuid().primaryKey().defaultRandom(),
  roomId: uuid()
    .references(() => rooms.id)
    .notNull(),
  transcription: text().notNull(),
  embeddings: vector({ dimensions: 768 }).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});
