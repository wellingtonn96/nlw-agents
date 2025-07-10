import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";
import z from "zod/v4";
import { eq } from "drizzle-orm";

export const createQuestionRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/rooms/:roomId/questions",
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
        body: z.object({
          question: z.string().min(1),
        }),
      },
    },
    async (request, reply) => {
      const { question } = request.body;
      const { roomId } = request.params;

      const roomExists = await db
        .select()
        .from(schema.rooms)
        .where(eq(schema.rooms.id, roomId));

      if (!roomExists) {
        throw new Error("Room not exists");
      }

      const result = await db
        .insert(schema.questions)
        .values({ question, roomId })
        .returning();

      const insertQuestion = result[0];

      if (!result[0]) {
        throw new Error("Failed to create new question.");
      }

      return reply.status(201).send({ questionId: insertQuestion.id });
    }
  );
};
