import { createTRPCRouter, publicProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
    createProject : publicProcedure.input().mutation(async ({ctx,input})=>{
        console.log("user Clicked ")
        return true
    })
})