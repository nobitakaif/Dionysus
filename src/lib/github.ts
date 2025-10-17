import { Octokit } from "octokit"
import { db } from "~/server/db"
import axios from "axios"
import { commitSummarise } from "./gemini"

export const octokit = new Octokit({
    auth : process.env.GITHUB_TOKEN
})

const githubUrl = "https://github.com/nobitakaif/Blockchain-web-3-learning"

type Response={
    commitHash  : string,
    commitAuthorName  : string,
    commitAuthorAvatar  : string,
    commitMessage : string,
    commitDate  : string,
}
// this function will give you  15 latest commit in your specific project 
export const getCommitHashes = async (githubUrl : string) : Promise<Response[]>=>{
    const [owner, repo ] = githubUrl.split('/').slice(-2)
    if(!owner || !repo){
        throw new Error("Invalid github URL ")
    }
    const { data } = await octokit.rest.repos.listCommits({
        owner : owner,
        repo : repo
    })
    const sortedCommit = data.sort((a : any, b:any,)=> new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime()) as any[]
    return sortedCommit.slice(0, 10).map((commit : any)=>({
        commitHash : commit.sha as string,
        commitMessage : commit?.commit?.message ?? "",
        commitAuthorName : commit.commit.author.name ?? "",
        commitAuthorAvatar : commit.author.avatarUrl ?? "",
        commitDate : commit.commit.author.date ?? ""
    }))
}


export const pollCommit = async(projectId : string) =>{
    console.log("inside pollcommit")
    const { project, githubUrl } = await fetchProjectGithubUrl(projectId)
    const commitHashes = await getCommitHashes(githubUrl)
    const unProcessedCommits = await filterUnprocessedCommits(projectId, commitHashes)
    const summaryResposnes = await Promise.allSettled(unProcessedCommits.map(commit =>{
        return summariseCommit(githubUrl,commit.commitHash)
    })) 
    const summarise = summaryResposnes.map((response)=>{
        if(response.status=== "fulfilled"){
            return response.value as string
        }
        return ""
    })

    const commit = await db.commits.createMany({
        data : summarise.map((summary, index)=>{
            console.log("proccessed index is " , index)
            return {
                projectId : projectId,
                commitHash : unProcessedCommits[index]!.commitHash,
                commitMessage : unProcessedCommits[index]!.commitMessage,
                commitAuthorName : unProcessedCommits[index]!.commitAuthorName,
                commitAuthorAvatar : unProcessedCommits[index]!.commitAuthorAvatar,
                commitDate : unProcessedCommits[index]!.commitDate,
                summary
            }
        })
    })

    return commit
    
}

export const summariseCommit = async (githubUrl : string, commitHash: string)=>{
    // get the diff, then pass to the ai
    const { data} = await axios.get(`${githubUrl}/commit/${commitHash}.diff`,{
        headers:{
            Accept : 'application/vnd.github.v3.diff'
        }
    })
    return await commitSummarise(data) || ""// passed diff 
}

export const fetchProjectGithubUrl = async( projectId : string ) => {
    const project = await db.project.findUnique({
        where:{
            id : projectId
        },
        select :{
            githubUrl : true
        }
    })

    if(!project?.githubUrl){
        throw new Error("Prject has now github url! ")
    }
    
    return { project , githubUrl : project?.githubUrl }
}

export const filterUnprocessedCommits = async(projecId : string, commitHashes : Response[])=>{
    const processedCommits = await db.commits.findMany({
        where : {
            projectId : projecId
        }
    })
    const unProcessedCommits = commitHashes.filter(( commit )=> !processedCommits.some((processedCommits)=>processedCommits.commitHash == commit.commitHash))

    return unProcessedCommits
}

// const getMessage = async (projecId : string, commitHashes : Response[])=>{
//     const processedCommits = await db.commits.findMany({
//         where : {
//             projectId : projecId
//         }
//     })
    
//     const unProcessedCommits = commitHashes.filter(( commit )=> !processedCommits.some((processedCommits)=>processedCommits.commitMessage == commit.commitMessage)

//     return unProcessedCommits
// }

// await pollCommit('614f365d-f0e5-4970-a359-c2878e7570f6').then(console.log)