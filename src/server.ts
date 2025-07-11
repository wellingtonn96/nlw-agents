import { fastify } from "fastify";
import { fastifyMultipart } from "@fastify/multipart";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { fastifyCors } from "@fastify/cors";
import { env } from "./env.ts";
import { getRoomsRote } from "./http/routes/get-rooms.ts";
import { createRoomRoute } from "./http/routes/create-room.ts";
import { getRoomQuestions } from "./http/routes/get-room-questions.ts";
import { createQuestionRoute } from "./http/routes/create-question.ts";
import { uploadAudioRoute } from "./http/routes/upload-audio.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "http://localhost:5173",
});

app.register(fastifyMultipart);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/health", () => {
  return "OK";
});

app.register(getRoomsRote);
app.register(createRoomRoute);
app.register(getRoomQuestions);
app.register(createQuestionRoute);
app.register(uploadAudioRoute);

app.listen({ port: env.PORT }).then(() => {
  console.log(`http server running ${process.env.PORT}`);
});
