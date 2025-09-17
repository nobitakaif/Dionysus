import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
    createProject : protectedProcedure.input().mutation(async ({ctx,input})=>{ // 
        ctx.user.userId // get the userid
        console.log("user Clicked ")
        return true
    })
})