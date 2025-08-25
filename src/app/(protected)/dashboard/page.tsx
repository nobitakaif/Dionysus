"use client"
import { useUser } from "@clerk/nextjs"


export default function Page(){

    const {user} = useUser()
    return <div>
        {user?.fullName}
    </div>
}