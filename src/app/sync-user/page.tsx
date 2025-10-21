import { auth, clerkClient, getAuth } from "@clerk/nextjs/server"
import { notFound, redirect } from "next/navigation"
import { toast } from "sonner"
import { db } from "~/server/db"

export default async function SyncUser(){
    // SSR
    const { userId } = await auth()
    console.log("rendering on server", userId)
    
    if(!userId){
        throw new Error("userId is not found")
    }
    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    if(!user.emailAddresses[0]?.emailAddress){
       notFound()
       
    }
    await db.user.upsert({
        where:{
            email : user.emailAddresses[0]?.emailAddress ?? ""
        },
        update:{
            imageURL : user.imageUrl,
            name : user.fullName!
        },
        create:{
            email : user.emailAddresses[0]?.emailAddress,
            name : user.fullName!
        }
    })
    return redirect('/dashboard')
}