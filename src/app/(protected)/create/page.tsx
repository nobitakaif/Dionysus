
"use client"
import { useForm } from "react-hook-form"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

type FormInput={
    repoUrl : string
    projectName : string
    githubToken ? : string
}

export default function Create(){
    const { register, handleSubmit, reset} = useForm<FormInput>()
    function onSubmit(data : FormInput){
        alert(data)
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
                <Button className="cursor-pointer" type="submit">Create project</Button>
            </form>
        </div>
    </div>
}