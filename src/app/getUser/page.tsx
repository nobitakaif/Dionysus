
import { useUser } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { api } from "~/trpc/react";
import userId from "./userId";

export default  async function(){
    const user =  await currentUser()
    const userId2 =  userId()
    console.log(userId)
    return <div>
        {JSON.stringify(user?.emailAddresses[0]?.emailAddress)}
        {JSON.stringify(userId2)}
    </div>
}