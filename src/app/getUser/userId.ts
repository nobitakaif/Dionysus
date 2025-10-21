"use client"
import { api } from "~/trpc/react";

export default function userId (){
    const userId = api.project.getUserId.useQuery()
    return userId
}