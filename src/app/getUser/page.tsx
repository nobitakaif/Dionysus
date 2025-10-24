
import { useUser } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { api } from "~/trpc/react";
import userId from "./userId";
import { getCommitHashes, octokit } from "~/lib/github";

async function commitHash (githubUrl : string) : Promise<any[]>{
        const [owner, repo ] = githubUrl.split('/').slice(-2)
        if(!owner || !repo){
            throw new Error("Invalid github URL ")
        }
        const { data } = await octokit.rest.repos.listCommits({
            owner : owner,
            repo : repo
        })
        const sortedCommit = data.sort((a : any, b:any,)=> new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime()) as any[]
        console.log("this is sorted commit ",JSON.stringify(sortedCommit))
        // return sortedCommit.slice(0, 10).map((commit : any)=>({
        //     commitHash : commit.sha as string,
        //     commitMessage : commit?.commit?.message ?? "",
        //     commitAuthorName : commit.commit.author.name ?? "",
        //     commitAuthorAvatar : commit.author.avatarUrl ?? "",
        //     commitDate : commit.commit.author.date ?? ""
        // }))
        return sortedCommit
    }

export default  async function(){
    // const user =  await currentUser()
    // const userId2 =  userId()
    const commit = await getCommitHashes("https://github.com/nobitakaif/excalidraw")
    console.log(userId)

    
    return <div>
        {/* {JSON.stringify(user?.emailAddresses[0]?.emailAddress)} */}
        {/* {JSON.stringify(userId2)} */}
        {JSON.stringify(commit)}
        {/* { commit.} */}
    </div>
}