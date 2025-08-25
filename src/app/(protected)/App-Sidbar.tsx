"use client"

import { Bot, CreditCard, LayoutDashboard, Presentation } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { it } from "node:test"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar"
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

export default function AppSidebar(){
     
    const pathname = usePathname()
    
    return <Sidebar collapsible="icon" variant="floating" >
        <SidebarHeader>
            Logo😭
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
        </SidebarContent>
    </Sidebar>
}