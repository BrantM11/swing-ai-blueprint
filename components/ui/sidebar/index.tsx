
// Re-export the trigger component
import { PanelLeft } from "lucide-react"
import * as React from "react"
import { cn } from "../../../lib/utils"
import { Button } from "../button"
import { useSidebar } from "./sidebar-context"

export * from "./sidebar-components"
export * from "./sidebar-context"
export * from "./sidebar-menu"
export * from "./sidebar-provider"

export const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"
