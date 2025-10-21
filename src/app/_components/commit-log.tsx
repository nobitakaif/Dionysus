"use client"
import useProject from "~/hooks/use-project";
import { api } from "~/trpc/react";

export default function CommitLog(){
    const { projectId } = useProject()
    const { data:commit  } = api.project.getCommit.useQuery({projecId: projectId})

    return (
        <pre>
            {
                JSON.stringify(commit, null , 2)
                
            }
            
        </pre>
    )
}