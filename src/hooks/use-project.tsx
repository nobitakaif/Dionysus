import { api } from "~/trpc/react"
import { useLocalStorage } from "usehooks-ts"
export default function useProject (){
    const { data : projects } = api.project.getProject.useQuery()
    const [projectId , setProjectId ] = useLocalStorage('projectId',' ') // this hooks used when user selected the tab/button and refresh the page then still it catch the button/tab
    const project = projects?.find(pro => pro.id === projectId) 
    return {
        projects,
        project,
        setProjectId,
        projectId
    }
}