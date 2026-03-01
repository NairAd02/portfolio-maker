import { ChatSidebar } from "./chat-sidebar";
import { ChatWindow } from "./chat-window";


export function ChatLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar — hidden on mobile */}
      <ChatSidebar className="hidden lg:flex" />

      {/* Main chat area */}
      <ChatWindow showMessages className="flex-1" />
    </div>
  )
}
