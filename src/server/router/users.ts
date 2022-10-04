import { createRouter } from "./context";
import { z } from "zod";

export const usersRouter = createRouter()
  .mutation("createUser", {
    input: z
      .object({
        name: z.string(),
        contact: z.string()
      }),
    async resolve({ input, ctx }) {
      console.log('>>> resolve', input);
      const newUser = await ctx.prisma.speedDateUser.create({
        data: input
      });
      return newUser;
    },
  })
  .query("findMatch", {
    input: z
      .object({
        userId: z.string(),
      }),
    async resolve({ input, ctx }) {
      const firstMatch = await ctx.prisma.speedDateUser.findFirst({
        where: {
          status: "waiting",
          NOT: {
            id: input.userId
          }
        }
      })
      console.log('>>> resolve', input);
      if (!firstMatch) return null;
      
      const room = await ctx.prisma.room.create({
        data: {
          firstUserId: input.userId,
          secondUserId: firstMatch.id
        }
      })
      return room; 
      // const newUser = await ctx.prisma.speedDateUser.create({
      //   data: input
      // });
      // return newUser;
    },
  })
  .query("checkMatch", {
    input: z
      .object({
        userId: z.string(),
      }),
    async resolve({ input, ctx }) {
      const room = await ctx.prisma.room.findFirst({
        where: {
          status: "running",
          secondUserId: input.userId
        }
      })
      return room;
    },
  })
