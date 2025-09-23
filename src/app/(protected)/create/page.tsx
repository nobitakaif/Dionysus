
"use client"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { api } from "~/trpc/react"

type FormInput={
    repoUrl : string
    projectName : string
    githubToken ? : string
}

export default function Create(){
    const { register, handleSubmit, reset} = useForm<FormInput>()
    const createProject = api.project.createProject.useMutation() // this mutation function call backend function 
    function onSubmit(data : FormInput){
        createProject.mutate({
            githubUrl : data.repoUrl,
            name : data.projectName,
            githubToken : data.githubToken
        },{
            onSuccess : ()=>{
                toast.success("project created successfully ")
                reset()
            },
            onError : ()=>{
                toast.error("Failed to create project")
            }
        })
        return true 
    }
    return <div className="h-full w-full flex items-center justify-center flex-col">
        <h1 className="text-2xl font-semibold">Create your project</h1>
        <p>Enter the url of your repository to link here</p>
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1 w-72 lg:mt-5">
                <Input {...register('projectName', {required : true})}
                placeholder="Project name"
                required/>
                <Input {...register('repoUrl', {required : true})}
                placeholder="Repo Url"
                required/>
                <Input {...register('githubToken')}
                placeholder="Github token for private repo (optional)"
                />
                <Button className="cursor-pointer" type="submit" disabled={createProject.isPending}>Create project</Button>
            </form>
        </div>
    </div>
}