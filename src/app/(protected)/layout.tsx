import { UserButton } from "@clerk/nextjs";
import { SidebarProvider } from "~/components/ui/sidebar";
import AppSidebar from "./App-Sidbar";

export default function SidebarLayout({children}:{children:React.ReactNode}){
    return <SidebarProvider>
        <AppSidebar/>
        <main className="w-full m-2">
            <div className="flex items-center gap-2 border-sidebar-border bg-sidebar border shadow rounded-lg px-2 py-2">
                {/* <SearchBar/> */}
                <div className="ml-auto"></div>
                <UserButton/>
            </div>
            <div className="h-4"></div>
                {/* main content */}
            <div className="border-sidebar-border bg-sidebar border shadow rounded-lg overflow-y-scroll h-[calc(100vh-6rem)] p-4">
                {children}
            </div>

        </main>
    </SidebarProvider>
}