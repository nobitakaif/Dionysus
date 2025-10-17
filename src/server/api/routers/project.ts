import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { pollCommit } from "~/lib/github";

export const projectRouter = createTRPCRouter({
    createProject : protectedProcedure.input(
        z.object({
            name : z.string(),
            githubUrl : z.string(),
            githubToken : z.string().optional()
        })
    ).mutation(async ({ctx,input})=>{ // 
        const project = await ctx.db.project.create({
            data:{
                githubUrl : input.githubUrl,
                name : input.name,
                userToProject : {
                    create : {
                        userId :ctx.user.userId
                    }
                }
            }
        })
        await pollCommit(project.id)
        return project
    }),
    getProject : protectedProcedure.query(async({ctx,input})=>{ // get all the project of the user 
        return await ctx.db.project.findMany({
            where: {
                userToProject:{
                    some : {
                        userId : ctx.user.userId
                    }
                },
                deletedAT : null // give the project which deletedAt has not be null
            }
        })
    })

})