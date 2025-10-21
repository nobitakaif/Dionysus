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
        const userId = await ctx.db.user.findFirst({
            where:{
                email : ctx.userId.email
            }
        })

        console.log("inside create project", userId)
        const project = await ctx.db.project.create({
            data:{
                githubUrl : input.githubUrl,
                name : input.name,
                userToProject : {
                    create : {
                        userId : userId?.id!
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
                        userId : ctx.userId.id
                    }
                },
                deletedAT : null // give the project which deletedAt has not be null
            }
        })
    }),
    getCommit : protectedProcedure.input(z.object({
        projecId : z.string()
    })).query( async ({ctx, input})=>{
        console.log(input.projecId)
        
        const response = await ctx.db.commits.findMany({
            where:{
                projectId : input.projecId
            }
        })
        // await ctx.db.commits.create({
        //     data :{
        //         commitAuthorAvatar : "",

        //     }
        // })
        return response
    }),
    getUserId : protectedProcedure.query(async ({ctx,input})=>{
        const userId =await ctx.db.user.findFirst({
            where : {
                email :ctx.userId.email
            }
        })
        console.log(JSON.stringify(userId))
        return 
    })  
    
})