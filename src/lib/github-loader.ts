import { GithubRepoLoader} from "@langchain/community/document_loaders/web/github"

export const loadGithubbRepo =async (githubUrl: string, githubToken?: string, branch? : string)=>{
    const loader = new GithubRepoLoader(githubUrl,{
        accessToken : githubToken || '', // process.env.GITHUB_TOKEN
        branch : branch || 'master', // branch
        ignoreFiles : ['package-lock.json', 'yarn.lock','pnpm-lock.yaml', 'bun.lock', '.gitignore'], // ignore these file 
        recursive : true,
        unknown : 'warn', // like some binary files ( excuted code a.exe)
        maxConcurrency : 5
    })

    const docs = await loader.load()
    return docs
}

console.log(await loadGithubbRepo('https://github.com/nobitakaif/excalidraw'))