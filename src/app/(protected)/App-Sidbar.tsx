"use client"

import { Bot, CreditCard, LayoutDashboard, Plus, Presentation } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { it } from "node:test"
import { Button } from "~/components/ui/button"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "~/components/ui/sidebar"
import { cn } from "~/lib/utils"


const items = [
    {
        title : "Dashboard",
        url : "/dashboard",
        icon : LayoutDashboard
    },
    {
        title : "Q&A",
        url : "/qa",
        icon : Bot
    },
    {
        title : "Metting",
        url : "/metting",
        icon : Presentation
    },
    {
        title : "Billing",
        url : "/billing",
        icon : CreditCard
    }

]

const project =[
    {
        name : "Project 1"
    },
    {
        name : "Project 1"
    },
    {
        name : "Project 1"
    },
    {
        name : "Project 1"
    },
]
export default function AppSidebar(){
     
    const pathname = usePathname()
    const { open } = useSidebar();
    
    return <Sidebar collapsible="icon" variant="floating" >
        <SidebarHeader>
            <div className="flex items-center gap-2">
                    {/* <Image src={} /> */}
                    { open && <div className="text-xl font-bold">
                        Dionysus
                    </div>
                        
                    }
            </div>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map(item =>{
                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url} className={cn({
                                            '!bg-primary !text-white' : pathname == item.url
                                        })}>
                                            <item.icon/>
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
                <SidebarGroupLabel>
                    Your Project
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {project.map(pro =>{
                            return (
                                <SidebarMenuItem key={pro.name}>
                                    <SidebarMenuButton asChild>
                                        <div>
                                            <div className={cn('rounded-sm border size-6 flex items-center justify-center text-sm text-primary',{
                                                'bg-primary text-white' : true
                                            })}>
                                                {pro.name[0]}
                                            </div>
                                            <span>{pro.name}</span>
                                        </div>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}
                        <div className="h-2"></div>
                        <SidebarMenuItem>
                            <Link href={"/create"}>
                                <Button variant={"outline"}  className="w-fit">
                                    <Plus/>
                                    Create Project
                                </Button>
                            </Link>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    </Sidebar>
}