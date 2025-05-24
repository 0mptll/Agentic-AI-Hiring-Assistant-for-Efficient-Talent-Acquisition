import { Outlet } from "react-router-dom"
import { CandidateSidebar } from "@/components/candidate-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

export default function CandidateLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <CandidateSidebar />
      <SidebarInset className="flex-1 w-full">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background w-full">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Candidate Portal</h1>
          </div>
        </header>
        <main className="flex-1 overflow-auto w-full">
          <div className="w-full max-w-none p-4">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
