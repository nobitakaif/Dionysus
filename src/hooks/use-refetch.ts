import { useQueryClient } from "@tanstack/react-query";

export default function useRefetch(){
    const querClient = useQueryClient()
    return async ()=>{
        await querClient.refetchQueries({
            type : "active"
        })
    }
}